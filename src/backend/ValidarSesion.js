import mysql from 'mysql'
import express from 'express'
import cors from 'cors'
import {conectar} from './BaseDeDatos.js'
import jwt from 'jsonwebtoken'

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
      "SELECT email, contrasena, tipoUsuario, estado, sesionActiva FROM usuario WHERE email = ?",
      [email],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Error en el servidor" })

        if (results.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" })
        }

        const user = results[0]

        if (user.contrasena !== password) { // ⚠️ Usa bcrypt aquí en producción
          return res.status(401).json({ message: "La contraseña o correo son incorrectos" })
        }

        if (user.email !== email) { // ⚠️ Usa bcrypt aquí en producción
          return res.status(401).json({ message: "La contraseña o correo son incorrectos" })
        }

        if(user.estado !== 1 ) {
          return res.sendStatus(403).json({ message: "La cuenta a un no ha sido aceptada" })
        }

        if (!user.sesionActiva) {
          return res.status(403).json({ message: "Usuario aún no ha sido aceptado" })
        }

        const token = jwt.sign(
          {
            email: user.email,
            tipoUsuario: user.tipoUsuario,
          },
          SECRET_KEY,
          { expiresIn: '1h' }
        )
        
        connection.query(
          "UPDATE usuario SET sesionActiva = 1 WHERE email = ?",[email],(updateErr, updateResult) =>{
            connection.end()
            if(updateErr) return res.status(500).json({ message: "Error actualizando la sesion activa" })
            res.status(200).json({
              message: "Login exitoso",
              userType: user.userType,
              email: user.email,
              token: "TOKEN_SIMULADO",
            })
          }
        )
      }
    )
  } catch (error) {
    res.status(500).json({ message: "Error interno", error });
  }
  
});