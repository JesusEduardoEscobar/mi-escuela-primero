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

app.get('api/mostrarperfil', (req,res) => {
  const connection = conectar()
  const consulta = `
    SELECT * FROM usuario WHERE id ?
  ` 
  connection.query(consulta, )
})

app.get('/api/mostrarperfiles', (req,res) => {
  const connection = conectar()
  const consulta = `
    SELECT * FROM usuario
  `  
  connection.query(consulta, )
})
}
