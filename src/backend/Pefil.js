import express from "express";
import { conectar } from "./BaseDeDatos.js";
import cors from "cors";

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

  app.get("/api/admin/usuarios-strikes", (req, res) => {
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
      e.calle AS calleEscuela,
      e.colonia AS coloniaEscuela,
      e.nombreInstitucion,
      e.foto AS fotoEscuela,
      -- Campos de aliado
      a.institucion,
      a.calle AS calleAliado,
      a.colonia AS coloniaAliado,
      a.foto AS fotoAliado,
      a.sector
    FROM usuario u
    LEFT JOIN escuela e ON u.id = e.id_Usuario
    LEFT JOIN aliado a ON u.id = a.id_Usuario
    WHERE u.estado = 1 AND u.tipoUsuario IN (1, 2) AND u.id NOT IN (2, 3, 6);
  `;

  connection.query(consulta, (err, results) => {
    if (err) {
      connection.end();
      console.error("Error executing query:", err);
      return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }

    // Filtrar usuarios con 3 strikes
    const usuariosCon3Strikes = results.filter(user => user.strikes === 3);

    if (usuariosCon3Strikes.length === 0) {
      connection.end();
      return res.status(200).json(results); // No hay usuarios con 3 strikes
    }

    // Obtener los IDs de los usuarios a eliminar
    const idsAEliminar = usuariosCon3Strikes.map(user => user.id);

    // Eliminar usuarios con 3 strikes
    const deleteQuery = `DELETE FROM usuario WHERE id IN (?)`;

    connection.query(deleteQuery, [idsAEliminar], (deleteErr, deleteResult) => {
      connection.end();

      if (deleteErr) {
        console.error("Error eliminando usuarios:", deleteErr);
        return res.status(500).json({ message: "Error eliminando usuarios con 3 strikes" });
      }

      // Filtrar resultados para no incluir a los eliminados
      const usuariosRestantes = results.filter(user => user.strikes < 3);

      return res.status(200).json({
        message: `Se eliminaron ${idsAEliminar.length} usuario(s) con 3 strikes`,
        eliminados: idsAEliminar,
        usuarios: usuariosRestantes
      });
    });
  });
});

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
  }
}
}