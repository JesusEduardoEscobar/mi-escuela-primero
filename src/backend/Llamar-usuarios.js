import express from 'express'
import { conectar } from './BaseDeDatos.js'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json())
export const setLlamarUsuarios = (app) => {
app.get('/api/publicaciones/:idConvenio', (req, res) => {
  const { idConvenio } = req.params;
  const conectar = conectar()
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

app.post('/api/agregarpublicacion', (req, res) => {
  const { descripcion, fecha, id_convenio, foto } = req.body;

  // Validar que todos los campos necesarios estén presentes
  if (!descripcion || !fecha || !id_convenio) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  const connection = conectar();

  // Verificar el número de publicaciones existentes para el convenio
  const checkQuery = `SELECT COUNT(*) AS count FROM evidenciaproyecto WHERE id_Convenio = ?`;

  connection.query(checkQuery, [id_convenio], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Error al verificar el número de publicaciones" });
    }

    const publicacionesCount = results[0].count;

    if (publicacionesCount >= 2) {
      return res.status(403).json({ message: "No se permiten más de dos publicaciones por convenio" });
    }

    // Verificar el estado del convenio
    const convenioQuery = `SELECT estadoProgreso FROM convenio WHERE id = ?`;

    connection.query(convenioQuery, [id_convenio], (convenioError, convenioResults) => {
      if (convenioError || convenioResults.length === 0) {
        return res.status(404).json({ message: "Convenio no encontrado o error al verificar el estado" });
      }

      const estadoProgreso = convenioResults[0].estadoProgreso;

      if (estadoProgreso !== 'activo' && estadoProgreso !== 'finalizado') {
        return res.status(403).json({ message: "El convenio no está activo ni finalizado" });
      }

      // Insertar la nueva publicación
      const insertQuery = `
        INSERT INTO evidenciaproyecto (descripcion, fecha, id_Convenio, foto)
        VALUES (?, ?, ?, ?)
      `;

      connection.query(insertQuery, [descripcion, fecha, id_convenio, foto], (insertError, insertResult) => {
        if (insertError) {
          return res.status(500).json({ message: "Error al agregar la publicación" });
        }
        res.status(201).json({ message: "Publicación agregada exitosamente", id: insertResult.insertId });
      });
    });
  });
});
}
