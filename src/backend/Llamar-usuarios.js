import express from 'express'
import { conectar } from './BaseDeDatos.js'
import cors from 'cors'

export function setLlamarUsuario(app) {
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json())
export const setLlamarUsuario = (app) => {
app.get('/api/publicaciones/:idConvenio', (req, res) => {
  const { idConvenio } = req.params;
  const connection = conectar()
  const solicitud = `
    SELECT * FROM evidenciaproyecto WHERE idConvenio?
  `
  connection.query(query, [idConvenio], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error en el servidor" });
    }
    res.json(results)
  })
})

app.get("/api/admin/usuarios-aprobados", (req, res) => {
  const connection = conectar();
  const consulta = `
    SELECT
      u.*,
      CASE
        WHEN u.tipoUsuario = 1 THEN 'escuela'
        WHEN u.tipoUsuario = 2 THEN 'aliado'
        ELSE 'otro'
      END AS tipo,
      -- Campos de escuela
      e.nivelEducativo,
      e.cct,
      e.numeroEstudiantes,
      e.documentoVerificacion AS docEscuela,
      e.calle AS calleEscuela,
      e.colonia AS coloniaEscuela,
      e.nombreInstitucion,
      e.foto AS fotoEscuela,
      -- Campos de aliado
      a.institucion,
      a.documentoVerificacion AS docAliado,
      a.calle AS calleAliado,
      a.colonia AS coloniaAliado,
      a.foto AS fotoAliado
    FROM usuario u
    LEFT JOIN escuela e ON u.id = e.id_Usuario
    LEFT JOIN aliado a ON u.id = a.id_Usuario
    WHERE u.estado = 1;
  `;

  connection.query(consulta, (err, results) => {
    connection.end();
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
    res.status(200).json(results);
  });
});

<<<<<<< HEAD
}
=======
app.get('/api/mostrarperfiles', (req,res) => {
  const connection = conectar()
  const consulta = `
    SELECT * FROM usuario
  `  
  connection.query(consulta, )
})
}
>>>>>>> 73868f21c9a6c8e5b9c1f510e4c9cca96cab3e99
