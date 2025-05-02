import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import express from "express";

export function infoUsers(app) {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use(express.json());

  app.get("/api/infoUsuario", async (req, res) => {
    const { tipoUsuario, id } = req.query;

    if (!tipoUsuario || !id) {
      return res
        .status(400)
        .json({ error: "Faltan parámetros: tipoUsuario o id" });
    }

    console.log("API CALL - infoUsuario", tipoUsuario);

    const connection = conectar();
    const tipo = tipoUsuario;

    if (tipo == 1) {
      console.log("API CALL - ESCUELA🅱️");
      // ESCUELA
      const queryEscuela = `
        SELECT u.id, u.nombre, u.email AS correo, e.foto AS imagen,
               CONCAT(e.calle, ', ', e.colonia, ', CP ', e.cp) AS ubicacion
        FROM usuario u
        JOIN escuela e ON u.id = e.id_Usuario
        WHERE u.id = ?
      `;

      console.log("QUERY - 🤬ID:", id);

      connection.query(queryEscuela, [id], (err, results) => {
        if (err || results.length === 0) {
          connection.end();
          return res.status(404).json({ error: "Escuela no encontrada" });
        }

        const perfil = results[0];
        perfil.tipo = "escuela";

        const solicitudesQuery = `
          SELECT 
            pn.id, 
            tp.categoriaApoyo, 
            pn.id_Apoyo, 
            pn.estado,
            pn.descripcion
          FROM perfilnecesidad pn
          JOIN tipoapoyo tp ON pn.id_Apoyo = tp.id
          WHERE pn.id_Escuela = ?
        `;

        connection.query(solicitudesQuery, [id], (err2, solicitudes) => {
          connection.end();
          if (err2) {
            return res
              .status(500)
              .json({ error: "Error al obtener solicitudes" });
          }

          perfil.solicitudes = solicitudes.map((s) => ({
            TABLE: 1,
            id: s.id,
            idApoyo: s.id_Apoyo,
            tipoApoyo: s.categoriaApoyo,
            estado: estadoTexto(s.estado),
            descripcion: s.descripcion || "Descripción no disponible",
          }));

          perfil.necesidades = perfil.solicitudes.map((s) => s.tipoApoyo);
          res.json(perfil);
        });
      });
    } else if (tipo == 2) {
      console.log("API CALL - ALIADO🅱️");
      // ALIADO
      const queryAliado = `
        SELECT u.id, u.nombre, u.email AS correo, a.foto AS imagen,
               CONCAT(a.calle, ', ', a.colonia, ', CP ', a.cp) AS ubicacion
        FROM usuario u
        JOIN aliado a ON u.id = a.id_Usuario
        WHERE u.id = ?
      `;

      console.log("QUERY - 🤬ID:", id);

      connection.query(queryAliado, [id], (err, results) => {
        if (err || results.length === 0) {
          connection.end();
          return res.status(404).json({ error: "Aliado no encontrado" });
        }

        const perfil = results[0];
        perfil.tipo = "aliado";

        const solicitudesQuery = `
          SELECT 
            po.id, 
            tp.categoriaApoyo, 
            po.id_Apoyo, 
            po.estado,
            po.descripcion
          FROM perfiloferta po
          JOIN tipoapoyo tp ON po.id_Apoyo = tp.id
          WHERE po.id_Aliado = ?
        `;

        connection.query(solicitudesQuery, [id], (err2, solicitudes) => {
          connection.end();
          if (err2) {
            return res
              .status(500)
              .json({ error: "Error al obtener solicitudes" });
          }

          perfil.solicitudes = solicitudes.map((s) => ({
            TABLE: 2,
            id: s.id,
            idApoyo: s.id_Apoyo,
            tipoApoyo: s.categoriaApoyo,
            estado: estadoTexto(s.estado),
            descripcion: s.descripcion || "Descripción no disponible",
          }));

          perfil.apoyos = perfil.solicitudes.map((o) => o.tipoApoyo);
          res.json(perfil);
        });
      });
    } else {
      connection.end();
      return res.status(400).json({ error: "tipoUsuario inválido" });
    }
  });

  function estadoTexto(valor) {
    const estados = ["en revisión", "pendiente", "en proceso", "terminada"];
    return estados[valor] || "desconocido";
  }
}
