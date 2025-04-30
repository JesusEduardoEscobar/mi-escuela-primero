import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export default function setupRoutes(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.post("/api/crearSolicitud", async (req, res) => {
    console.log("JSON recibido:", req.body);

    const connection = conectar();
    const {
      descripcion,
      documentacion,
      prioridad,
      fecha,
      id_Escuela = null,
      id_Apoyo = null,
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
      (err, result) => {
        connection.end();
        if (err) {
          console.error("Error al insertar solicitud:", err);
          return res.status(500).json({ error: "Error al crear la solicitud" });
        }
        res.status(201).json({ message: "Solicitud creada correctamente" });
      }
    );
  });
}
