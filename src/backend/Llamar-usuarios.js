import express from 'express'
import { conectar, conectar, conectar } from './BaseDeDatos'

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json())

app.get('/api/publicaciones', (req, res) => {
  const conectar = conectar()
  const solicitud = `
    SELECT * FROM evidenciaproyecto
  `
  const [filas] = conectar.query(solicitud)
  res.json(filas)
})

app.post('/api/agregarpublicacion', (req, res) => {
  const conectar = conectar()
  const solicitud = `
    SELECT * FROM evidenciaproyecto
  `
  conectar.query(solicitud)
})