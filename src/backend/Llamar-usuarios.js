import express from 'express'
import { conectar } from './BaseDeDatos.js'
import { connection } from 'next/server.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

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

app.get('api/mostrarperfil', (req,res) => {
  const conectar = conectar()
  const consulta = `
    SELECT * FROM usuario WHERE id ?
  ` 
  conectar.query(consulta, )
})

app.get('/api/mostrarperfiles', (req,res) => {
  const conectar = conectar()
  const consulta = `
    SELECT * FROM usuario
  `  
  conectar.query(consulta, )
})