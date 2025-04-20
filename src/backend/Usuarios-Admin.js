import mysql from 'mysql'
import cors from 'cors'
import express, { json } from 'express'
import { conectar } from "./BaseDeDatos.js"

const app = express()

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

app.get("/api/usuarioAmin", (res,req) => {
    const conectar = conectar()
})