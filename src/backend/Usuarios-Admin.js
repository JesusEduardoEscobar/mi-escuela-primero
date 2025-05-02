import cors from "cors";
import express from "express";
import { conectar } from "./BaseDeDatos.js";

export function setUsuariosAdmin(app) {
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

// Ruta para obtener las solicitudes
app.get("/api/admin/solicitudes", (req, res) => {
  const connection = conectar();
  const consulta = `
    SELECT
      u.*,
      e.nivelEducativo,
      e.cct,
      e.numeroEstudiantes,
      e.documentoVerificacion AS docEscuela,
      e.calle AS calleEscuela,
      e.colonia AS coloniaEscuela,
      e.nombreInstitucion,
      e.foto AS fotoEscuela,
      a.institucion,
      a.documentoVerificacion AS docAliado,
      a.calle AS calleAliado,
      a.colonia AS coloniaAliado,
      a.foto AS fotoAliado
    FROM usuario u
    LEFT JOIN escuela e ON u.id = e.id_Usuario
    LEFT JOIN aliado a ON u.id = a.id_Usuario
    WHERE u.estado = 0;
  `;
    connection.query(consulta, (err, results) => {
      connection.end();
      if (err) {
        console.error("Error executing query:", err);
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }
      res.status(200).json(results);
    });
  });

  // Ruta para aprobar las solicitudes
  app.put("/api/admin/solicitudes/aprobar/:id", (req, res) => {
    const connection = conectar();
    const { id } = req.params;

    connection.query(
      "UPDATE users SET estado = 1 WHERE id = ?",
      [id],
      (err, result) => {
        connection.end();
        if (err)
          return res
            .status(500)
            .json({ message: "Error al aprobar solicitud" });

        res.status(200).json({ message: "Usuario aprobado correctamente" });
      }
    );
  });

  // Ruta para rechazar/eliminar una solicitud
  app.delete("/api/admin/solicitudes/rechazar/:id", (req, res) => {
    const connection = conectar();
    const { id } = req.params;

    connection.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
      connection.end();
      if (err)
        return res.status(500).json({ message: "Error al rechazar solicitud" });

      res.status(200).json({ message: "Usuario rechazado correctamente" });
    });
  });

  app.get("/api/usuarios/aliado", (res, req) => {
    const conectar = conectar();
    const consulta =
      "SELECT * FROM usuairos WHERE tipoUsuario = 2 AND estado = 1";
    conectar.query(consulta, (err, res) => {
      conectar.end();
      if (err)
        return res.status(500).json({ message: "Error al obtener aliados" });
    });
  });

app.get("/api/usuarios/escuelas", (res, req) => {
  const conectar = conectar()
  const consulta = "SELECT * FROM usuairos WHERE tipoUsuario = 1 AND estado = 1"
  conectar.query(consulta, (err, res) => {
    conectar.end()
    if(err) return res.status(500).json({ message: "Error al obtener aliados" })
  })
})
  app.get("/api/usuarios/escuelas", (res, req) => {
    const conectar = conectar();
    const consulta =
      "SELECT * FROM usuairos WHERE tipoUsuario = 1 AND estado = 1";
    conectar.query(consulta, (err, res) => {
      conectar.end();
      if (err)
        return res.status(500).json({ message: "Error al obtener aliados" });
    });
  });
}
