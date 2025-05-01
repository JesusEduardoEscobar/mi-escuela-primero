import express from "express";
import { conectar } from "./BaseDeDatos.js";
import cors from "cors";
import { NextResponse } from "next/server.js";
import { subirArchivoADrive } from "./ConecDrive.js";

export function setPerfil(app) {
  app.use(express.json());
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  // app.options("*", cors()); // 👉 responde a preflight requests

  app.post("/api/logout", async (req, res) => {
    const { id } = req.body;
    try {
      const connection = conectar();
      connection.query(
        "UPDATE usuario SET sesionActiva = 0 WHERE id = ?",
        [id],
        (err) => {
          connection.end();
          if (err)
            return res.status(500).json({ message: "Error cerrando sesión" });
          return res
            .status(200)
            .json({ message: "Sesión cerrada exitosamente" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Error interno", error });
    }
  });

  app.delete("/api/eliminarCuenta", async (req, res) => {
    const { id } = req.body;
    try {
      const connection = conectar();
      connection.query("DELETE FROM usuario WHERE id = ?", [id], (err) => {
        connection.end();
        if (err)
          return res
            .status(500)
            .json({ message: "Error eliminando la cuenta" });
        return res
          .status(200)
          .json({ message: "Cuenta eliminada exitosamente" });
      });
    } catch (error) {
      res.status(500).json({ message: "Error interno", error });
    }
  });
}

export async function POST(request) {
  try {
    // Obtener los datos del formulario
    const formData = await request.formData();

    // Extraer los campos básicos
    const userId = formData.get("userId");
    const nombre = formData.get("nombre");
    const correo = formData.get("correo");

    // Obtener el archivo de imagen si existe
    const imagenFile = formData.get("imagen");

    // Validar datos básicos
    if (!userId || !nombre || !correo) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Objeto para almacenar los datos actualizados
    const datosActualizados = {
      nombre,
      correo,
    };

    // Procesar la imagen si se proporcionó una nueva
    if (imagenFile && imagenFile.size > 0) {
      try {
        // Usar la función existente para subir la imagen a Drive
        const imagenUrl = await subirArchivoADrive(imagenFile);

        // Añadir la URL de la imagen a los datos actualizados
        datosActualizados.imagen = imagenUrl;
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        return NextResponse.json(
          { error: "Error al procesar la imagen" },
          { status: 500 }
        );
      }
    }

    // Aquí iría la lógica para actualizar los datos en tu base de datos
    // Por ejemplo, usando un ORM como Prisma o una conexión directa a la base de datos

    // Ejemplo con Prisma (comentado):
    /*
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: parseInt(userId) },
      data: datosActualizados
    })
    */

    const usuarioActualizado = await actualizarUsuarioEnBaseDeDatos(
      userId,
      datosActualizados
    );
    return NextResponse.json({
      success: true,
      message: "Perfil actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}

// Función simulada para actualizar el usuario en la base de datos
// Reemplaza esto con tu implementación real
async function actualizarUsuarioEnBaseDeDatos(userId, datos) {
  // Aquí iría tu código para actualizar el usuario en la base de datos
  console.log(`Actualizando usuario ${userId} con datos:`, datos);

  // Simulamos una respuesta exitosa
  return {
    id: userId,
    ...datos,
    updatedAt: new Date().toISOString(),
  };
}
