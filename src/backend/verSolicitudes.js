import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function todasSolicitudes(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.get("/api/todasSolicitudes", async (req, res) => {
    const connection = conectar();
    let estadoTexto = (valor) =>
      ["en revisión", "pendiente", "en proceso", "terminada"][valor] ||
      "desconocido";

    const queryEscuelas = `
      SELECT 
        pn.id,
        pn.fecha,
        ta.categoriaApoyo AS tipoApoyo,
        pn.estado,
        pn.descripcion,
        e.id_Usuario AS id_Dueño,
        u.nombre AS nombre,
        e.nombreInstitucion AS institucion,
        u.telefono AS numeroTelefono,
        e.foto AS Usuario_Imagen
      FROM perfilnecesidad pn
      JOIN tipoapoyo ta ON pn.id_Apoyo = ta.id
      JOIN escuela e ON pn.id_Escuela = e.id_Usuario
      JOIN usuario u ON e.id_Usuario = u.id
    `;

    const queryAliados = `
      SELECT 
        po.id,
        po.fecha,
        ta.categoriaApoyo AS tipoApoyo,
        po.estado,
        po.descripcion,
        a.id_Usuario AS id_Dueño,
        u.nombre AS nombre,
        a.institucion AS institucion,
        u.telefono AS numeroTelefono,
        a.foto AS Usuario_Imagen
      FROM perfiloferta po
      JOIN tipoapoyo ta ON po.id_Apoyo = ta.id
      JOIN aliado a ON po.id_Aliado = a.id_Usuario
      JOIN usuario u ON a.id_Usuario = u.id
    `;

    connection.query(queryEscuelas, (err1, resultsEscuelas) => {
      if (err1) {
        connection.end();
        console.error("Error en perfilnecesidad:", err1);
        return res
          .status(500)
          .json({ error: "Error al obtener solicitudes de escuelas" });
      }

      connection.query(queryAliados, (err2, resultsAliados) => {
        connection.end();
        if (err2) {
          console.error("Error en perfiloferta:", err2);
          return res
            .status(500)
            .json({ error: "Error al obtener solicitudes de aliados" });
        }

        const escuelas = resultsEscuelas.map((row) => ({
          TABLE: 1,
          id: row.id,
          fecha: row.fecha,
          tipoApoyo: row.tipoApoyo,
          estado: estadoTexto(row.estado),
          descripcion: row.descripcion,
          id_Dueño: row.id_Dueño,
          nombre: row.nombre,
          institucion: row.institucion,
          numeroTelefono: row.numeroTelefono,
          Usuario_Imagen: row.Usuario_Imagen,
        }));

        const aliados = resultsAliados.map((row) => ({
          TABLE: 2,
          id: row.id,
          fecha: row.fecha,
          tipoApoyo: row.tipoApoyo,
          estado: estadoTexto(row.estado),
          descripcion: row.descripcion,
          id_Dueño: row.id_Dueño,
          nombre: row.nombre,
          institucion: row.institucion,
          numeroTelefono: row.numeroTelefono,
          Usuario_Imagen: row.Usuario_Imagen,
        }));

        res.json({ escuelas, aliados });
      });
    });
  });
}
