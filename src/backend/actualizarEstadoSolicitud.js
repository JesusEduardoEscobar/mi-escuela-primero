import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function actualizarEstado(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.post("/api/actualizarEstadoSolicitud", async (req, res) => {
    const { id, tabla, estado } = req.body;

    console.log("BODY recibido:", req.body);

    if (
      typeof id !== "number" ||
      typeof tabla !== "number" ||
      typeof estado !== "number"
    ) {
      return res.status(400).json({
        error: "Faltan o son incorrectos los parámetros: id, tabla, estado",
      });
    }

    console.log("API CALL - actualizarEstadoSolicitud 🚀");
    console.log("PARAMS:", { id, tabla, estado });

    let tablaNombre = null;

    if (tabla == 1) {
      tablaNombre = "perfilnecesidad";
    } else if (tabla == 2) {
      tablaNombre = "perfiloferta";
    } else {
      return res.status(400).json({
        error: "Valor inválido para tabla: debe ser 1 (oferta) o 2 (necesidad)",
      });
    }

    const connection = conectar();

    const query = `
      UPDATE ${tablaNombre}
      SET estado = ?
      WHERE id = ?
    `;

    connection.query(query, [estado, id], (err, result) => {
      connection.end();

      if (err) {
        console.error("❌ Error al actualizar estado:", err);
        return res
          .status(500)
          .json({ error: "Error al actualizar el estado de la solicitud" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No se encontró la solicitud con ese ID" });
      }

      console.log(
        `✅ Estado actualizado correctamente en ${tablaNombre} con ID ${id} => Nuevo estado: ${estado}`
      );
      res.status(200).json({ message: "Estado actualizado correctamente" });
    });
  });
}
