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

    app.get("/api/admin/usuarios-aprobados", (req, res) => {
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
        connection.end();
        if (err) {
          console.error("Error executing query:", err);
          return res.status(500).json({ message: "Internal Server Error", error:  err.message });
        }
        res.status(200).json(results);
      });
    });

 app.get("/api/perfil/:id", async (req, res) => {
  const userId = req.params.id;
  const connection = conectar();
  
  console.log(`Iniciando consulta para usuario ID: ${userId}`);

  try {
    // 1. Consulta básica del usuario
    const [usuario] = await new Promise((resolve, reject) => {
      connection.query(
        'SELECT id, nombre, email, telefono, tipoUsuario FROM usuario WHERE id = ?', 
        [userId],
        (err, results) => {
          if (err) {
            console.error('Error en consulta básica:', err);
            return reject(new Error('Error al obtener datos básicos'));
          }
          resolve(results);
        }
      );
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // 2. Datos específicos según tipo
    let datosEspecificos = {};
    if (usuario.tipoUsuario === 1) { // Escuela
      const [escuela] = await new Promise((resolve, reject) => {
        connection.query(
          'SELECT nombreInstitucion, calle, colonia, cct, nivelEducativo, foto FROM escuela WHERE id_Usuario = ?',
          [userId],
          (err, results) => {
            if (err) return reject(new Error('Error al obtener datos de escuela'));
            resolve(results);
          }
        );
      });
      datosEspecificos = escuela || {};
    } else if (usuario.tipoUsuario === 2) { // Aliado
      const [aliado] = await new Promise((resolve, reject) => {
        connection.query(
          'SELECT institucion, calle, colonia, sector, foto FROM aliado WHERE id_Usuario = ?',
          [userId],
          (err, results) => {
            if (err) return reject(new Error('Error al obtener datos de aliado'));
            resolve(results);
          }
        );
      });
      datosEspecificos = aliado || {};
    }

    // 3. Publicaciones (manejo de errores mejorado)
    let publicaciones = [];
    try {
      const [pubs] = await new Promise((resolve, reject) => {
        const query = usuario.tipoUsuario === 1 ?
          `SELECT id, descripcion, fecha, foto FROM evidenciaProyecto 
           WHERE id_Convenio IN (SELECT id FROM convenio WHERE Escuela_Usuario_id = ?)` :
          `SELECT id, descripcion, fecha, foto FROM evidenciaProyecto 
           WHERE id_Convenio IN (SELECT id FROM convenio WHERE Aliado_Usuario_id = ?)`;
        
        connection.query(query, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      publicaciones = pubs || [];
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      // Continuamos sin publicaciones en lugar de fallar completamente
    }

    // 4. Matches (convenios activos)
    let matches = [];
    try {
      const [matchData] = await new Promise((resolve, reject) => {
        const query = usuario.tipoUsuario === 1 ?
          `SELECT c.id, a.institucion AS nombre, a.foto 
           FROM convenio c
           JOIN aliado a ON c.Aliado_Usuario_id = a.id_Usuario
           WHERE c.Escuela_Usuario_id = ?` :
          `SELECT c.id, e.nombreInstitucion AS nombre, e.foto 
           FROM convenio c
           JOIN escuela e ON c.Escuela_Usuario_id = e.id_Usuario
           WHERE c.Aliado_Usuario_id = ?`;
        
        connection.query(query, [userId], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
      matches = matchData;
    } catch (error) {
      console.error('Error al obtener matches:', error);
    }

    // 5. Relaciones (solicitudes o apoyos)
    let relaciones = [];
    try {
      if (usuario.tipoUsuario === 1) {
        const [solicitudes] = await new Promise((resolve, reject) => {
          connection.query(
            'SELECT id, titulo, descripcion, estado FROM perfilnecesidad WHERE escuela_id = ?',
            [userId],
            (err, results) => {
              if (err) return reject(err);
              resolve(results);
            }
          );
        });
        relaciones = solicitudes || [];
      } else {
        const [apoyos] = await new Promise((resolve, reject) => {
          connection.query(
            `SELECT e.id, e.nombreInstitucion, e.foto 
             FROM perfiloferta a
             JOIN escuela e ON a.escuela_id = e.id_Usuario
             WHERE a.aliado_id = ?`,
            [userId],
            (err, results) => {
              if (err) return reject(err);
              resolve(results);
            }
          );
        });
        relaciones = apoyos || [];
      }
    } catch (error) {
      console.error('Error al obtener relaciones:', error);
    }

    // 6. Construir respuesta
    const respuesta = {
      usuario: {
        ...usuario,
        tipo: usuario.tipoUsuario === 1 ? 'escuela' : 'aliado',
        ...datosEspecificos,
        imagen: datosEspecificos.foto,
        publicaciones,
        matches,
        relaciones
      }
    };

    res.json(respuesta);

  } catch (error) {
    console.error('Error general:', error.message);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      detalle: error.message
    });
  } finally {
    if (connection && connection.end) {
      connection.end();
    }
  }
});

}