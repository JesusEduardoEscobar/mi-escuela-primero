import express from "express";
import { conectar } from "./BaseDeDatos.js";
import cors from "cors";

export function setPerfil(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // app.options("*", cors()); // 👉 responde a preflight requests

  app.post("/api/logout", async (req, res) => {
    const { id } = req.body;
    try {
      const connection = conectar();
      connection.query(
        "UPDATE usuario SET sesionActiva = 0 WHERE id = ?",
        [id], 
        (err) => {
          connection.end();
          if (err)
            return res.status(500).json({ message: "Error cerrando sesión" });
          return res
            .status(200)
            .json({ message: "Sesión cerrada exitosamente" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Error interno", error });
    }
  });

  app.delete("/api/eliminarCuenta", async (req, res) => {
    const { id } = req.body;
    try {
      const connection = conectar();
      connection.query("DELETE FROM usuario WHERE id = ?", [id], (err) => {
        connection.end();
        if (err)
          return res
            .status(500)
            .json({ message: "Error eliminando la cuenta" });
        return res
          .status(200)
          .json({ message: "Cuenta eliminada exitosamente" });
      });
    } catch (error) {
      res.status(500).json({ message: "Error interno", error });
    }
  });
}