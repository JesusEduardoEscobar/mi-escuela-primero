
import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function eliminarSolicitud(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.delete("/api/eliminarSolicitud", (req, res) => {
    const { id, tabla } = req.body;

    if (!id || !tabla) {
      return res.status(400).json({ error: "Faltan parámetros: id o tabla" });
    }

    let tablaNombre = "";
    if (tabla == 1) {
      tablaNombre = "perfilnecesidad";
    } else if (tabla == 2) {
      tablaNombre = "perfiloferta";
    } else {
      return res.status(400).json({ error: "Tabla no válida" });
    }

    const connection = conectar();
    const query = `DELETE FROM \${tablaNombre} WHERE id = ?`;

    connection.query(query, [id], (err, result) => {
      connection.end();

      if (err) {
        console.error("Error al eliminar solicitud:", err);
        return res.status(500).json({ error: "Error al eliminar la solicitud" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Solicitud no encontrada" });
      }

      res.status(200).json({ message: "Solicitud eliminada correctamente" });
    });
  });
}
