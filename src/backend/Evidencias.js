// src/backend/verEvidencias.js
import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function verEvidencias(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.get("/api/verEvidencias", async (req, res) => {
    const connection = conectar();

    const query = `
      SELECT
        ep.*,
        ua.nombre AS nombre_aliado,
        es.nombreInstitucion AS institucion_escuela
      FROM evidenciaproyecto AS ep
      JOIN convenio      AS c  ON ep.id_Convenio       = c.id
      JOIN aliado        AS al ON c.Aliado_Usuario_id  = al.id_Usuario
      JOIN usuario       AS ua ON al.id_Usuario        = ua.id
      JOIN escuela       AS es ON c.Escuela_Usuario_id = es.id_Usuario;
    `;

    connection.query(query, (err, results) => {
      connection.end();

      if (err) {
        console.error("❌ Error al obtener evidencias:", err);
        return res.status(500).json({ error: "PEEEJ Error al obtener evidencias" });
      }

      const evidencias = results.map((row) => ({
        id: row.id,
        id_Convenio: row.id_Convenio,
        fecha: row.fecha,
        descripcion: row.descripcion,
        foto: row.foto,
        nombre_aliado: row.nombre_aliado,
        institucion_escuela: row.institucion_escuela,
      }));

      res.json({ evidencias });
    });
  });
}
