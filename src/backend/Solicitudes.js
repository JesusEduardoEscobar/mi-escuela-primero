import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function setupRoutes(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  // --- EXISTENTE: Crear solicitud (perfilnecesidad) ---
  app.post("/api/crearSolicitud", async (req, res) => {
    console.log("JSON recibido /crearSolicitud:", req.body);

    const connection = conectar();
    const {
      descripcion,
      documentacion,
      prioridad,
      fecha,
      id_Escuela,
      id_Apoyo,
    } = req.body;

    const query = `
      INSERT INTO perfilnecesidad (id_Escuela, id_Apoyo, prioridad, descripcion, documentacion, fecha)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        id_Escuela,
        id_Apoyo,
        prioridad || "MEDIA",
        descripcion,
        documentacion || "Document",
        fecha || new Date(),
      ],
      (err) => {
        connection.end();
        if (err) {
          console.error("Error al insertar perfilnecesidad:", err);
          return res.status(500).json({ error: "Error al crear la solicitud" });
        }
        res.status(201).json({ message: "Solicitud creada correctamente" });
      }
    );
  });

  // --- NUEVO: Crear oferta (perfiloferta) ---
  app.post("/api/crearOferta", async (req, res) => {
    console.log("JSON recibido /crearOferta:", req.body);

    const connection = conectar();
    const { descripcion, fecha, id_Apoyo, id_Aliado } = req.body;

    const query = `
      INSERT INTO perfiloferta (id_Apoyo, id_Aliado, descripcion, fecha)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      query,
      [id_Apoyo, id_Aliado, descripcion, fecha || new Date()],
      (err) => {
        connection.end();
        if (err) {
          console.error("Error al insertar perfiloferta:", err);
          return res.status(500).json({ error: "Error al crear la oferta" });
        }
        res.status(201).json({ message: "Oferta creada correctamente" });
      }
    );
  });
}
