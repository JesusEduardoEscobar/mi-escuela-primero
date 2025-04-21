import mysql from 'mysql'
import express from 'express'
import cors from 'cors'
import {conectar} from './BaseDeDatos'

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const connection = conectar() 
    connection.query(
      "SELECT email, contrasena, tipoUsuario, estado FROM users WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Error en el servidor" })

        if (results.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const user = results[0]

        if (user.contrasena !== password) { // ⚠️ Usa bcrypt aquí en producción
          return res.status(401).json({ message: "Credenciales incorrectas" })
        }

        if (user.email !== email) { // ⚠️ Usa bcrypt aquí en producción
          return res.status(401).json({ message: "Credenciales incorrectas" })
        }

        if (!user.estado) {
          return res.status(403).json({ message: "Usuario aún no ha sido aceptado" })
        }

        res.status(200).json({
          message: "Login exitoso",
          userType: user.userType,
          email: user.email,
          token: "TOKEN_SIMULADO",
        })
      }
    )
    connection.end()
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
  
});

app.listen(1984, () => {
  console.log("Servidor iniciado en el puerto 1984")
})