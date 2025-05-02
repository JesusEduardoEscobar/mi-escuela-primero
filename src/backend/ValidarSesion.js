// src/backend/ValidarSesion.js
import express from "express";
import cors from "cors";
import { conectar } from "./BaseDeDatos.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Asegúrate de instalar bcrypt: npm install bcrypt

export function setValidarSesion(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const SECRET_KEY = process.env.SECRET_KEY || "Clave_secreta";

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Recibida solicitud de login:", req.body);

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    try {
      const connection = conectar();
      if (!connection) {
        console.error("Error: No se pudo conectar a la base de datos.");
        return res
          .status(500)
          .json({ message: "Error de conexión a la base de datos" });
      }

      connection.query(
        "SELECT id, email, constrasenia, tipoUsuario, estado, sesionActiva FROM usuario WHERE email = ?",
        [email],
        async (err, results) => {
          if (err) {
            console.error("Error en la consulta:", err);
            connection.end();
            return res.status(500).json({ message: "Error en el servidor" });
          }

          if (results.length === 0) {
            connection.end();
            return res.status(404).json({ message: "Usuario no encontrado" });
          }

          const user = results[0];

          // Verificar contraseña con bcrypt
          if (!password || !user.constrasenia) {
            console.error(
              "Error: datos insuficientes para comparar contraseñas."
            );
            connection.end();
            return res
              .status(500)
              .json({ message: "Error en la validación de credenciales" });
          }
          // const hashedPassword = await bcrypt.hash(password, 10);
          // console.log(hashedPassword);
          const passwordMatch = await bcrypt.compare(
            password,
            user.constrasenia
          );
          console.log("Contraseña comparada:", passwordMatch);
          if (!passwordMatch) {
            connection.end();
            return res
              .status(401)
              .json({ message: "Credenciales incorrectas (contra)" });
          }

          if (user.estado !== 1) {
            connection.end();
            return res
              .status(403)
              .json({ message: "La cuenta aún no ha sido aceptada" });
          }

          if (user.sesionActiva === 1) {
            connection.end();
            return res
              .status(403)
              .json({ message: "La sesión de usuario ya está activada" });
          }

          // Generar token JWT
          const token = jwt.sign(
            {
              email: user.email,
              tipoUsuario: user.tipoUsuario,
              idUsuario: user.id,
            },
            SECRET_KEY,
            { expiresIn: "2h" }
          );

          // Actualizar sesión activa
          connection.query(
            "UPDATE usuario SET sesionActiva = 1 WHERE email = ?",
            [email],
            (updateErr) => {
              if (updateErr) {
                console.error("Error al actualizar sesión:", updateErr);
                connection.end();
                return res
                  .status(500)
                  .json({ message: "Error actualizando la sesión activa" });
              }

              connection.end();

              return res.status(200).json({
                message: "Login exitoso",
                token,
                user: {
                  email: user.email,
                  tipoUsuario: user.tipoUsuario,
                  idUsuario: user.id,
                },
              });
            }
          );
        }
      );
    } catch (error) {
      console.error("Error en el try principal:", error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  });
}
