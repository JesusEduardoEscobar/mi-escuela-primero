import express from 'express'
import { conectar } from './BaseDeDatos.js'
import cors from 'cors'

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

app.use(express.json())

export const setMatches = (app) => {
//OBTENER TODOS LOS USUARIOS
app.get('/api/usuarios', (req, res) => {
    const connection = conectar();
  
    connection.query('SELECT * FROM usuario', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error al obtener usuarios' });
      }
      res.json(results);
    });
});


//MANDAR SOLICITUD PARA HACER CONVENIO CON ALGUIEN, SE MARCA COMO PENDIENTE
app.post('/api/convenios', (req, res) => {
    const { usuario_id, match_id, tipoUsuario } = req.body;
  
    if (!usuario_id || !match_id || !tipoUsuario) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }
  
    // Evitar que un admin cree convenios
    if (tipoUsuario === 3) {
      return res.status(403).json({ message: "Los administradores no pueden crear convenios" });
    }
  
    const Aliado_Usuario_id = tipoUsuario === 2 ? usuario_id : match_id;
    const Escuela_Usuario_id = tipoUsuario === 1 ? usuario_id : match_id;
  
    const connection = conectar();
  
    // Verificar si ya existe un convenio
    const checkQuery = `
      SELECT * FROM convenio 
      WHERE Aliado_Usuario_id = ? AND Escuela_Usuario_id = ?
    `;
  
    connection.query(checkQuery, [Aliado_Usuario_id, Escuela_Usuario_id], (checkError, checkResult) => {
      if (checkError) {
        return res.status(500).json({ message: "Error al verificar duplicados" });
      }
  
      if (checkResult.length > 0) {
        return res.status(409).json({ message: "El convenio ya existe" });
      }
  
      // Insertar nuevo convenio
      const insertQuery = `
        INSERT INTO convenio (Aliado_Usuario_id, Escuela_Usuario_id, estadoProgreso)
        VALUES (?, ?, 0)
      `;
  
      connection.query(insertQuery, [Aliado_Usuario_id, Escuela_Usuario_id], (insertError, result) => {
        if (insertError) {
          return res.status(500).json({ message: "Error al crear el convenio" });
        }
  
        res.json({ message: "Convenio creado", id: result.insertId });
      });
    });
});
  

//ACEPTA O RECHAZA EL CONVENIO  
app.put('/api/convenios/:id/estado', (req, res) => {
    const { id } = req.params;
    const { estadoProgreso, usuarioId } = req.body;
  
    if (![1, 2].includes(estadoProgreso)) {
      return res.status(400).json({ message: "Estado inválido (1 = aceptar, 2 = rechazar)" });
    }
  
    const connection = conectar();
  
    const selectQuery = `SELECT Escuela_Usuario_id, Aliado_Usuario_id FROM convenio WHERE id = ?`;
  
    connection.query(selectQuery, [id], (error, results) => {
      if (error) return res.status(500).json({ message: "Error al verificar el convenio" });
  
      if (results.length === 0) {
        return res.status(404).json({ message: "Convenio no encontrado" });
      }
  
      const { Escuela_Usuario_id, Aliado_Usuario_id } = results[0];
  
      const esReceptor = (usuarioId === Escuela_Usuario_id || usuarioId === Aliado_Usuario_id);
      if (!esReceptor) {
        return res.status(403).json({ message: "No autorizado para modificar este convenio" });
      }
  
      const updateQuery = `UPDATE convenio SET estadoProgreso = ? WHERE id = ?`;
  
      connection.query(updateQuery, [estadoProgreso, id], (error) => {
        if (error) return res.status(500).json({ message: "Error al actualizar el estado" });
  
        // SOLO crear el chat si fue aceptado (estadoProgreso = 1)
        if (estadoProgreso === 1) {
          const u1 = Escuela_Usuario_id;
          const u2 = Aliado_Usuario_id;
  
          if (u1 === u2) return res.status(400).json({ message: 'No se puede crear un chat consigo mismo' });
  
          const checkExist = `
            SELECT idChat FROM chats
            WHERE (idUsuario1 = ? AND idUsuario2 = ?)
               OR (idUsuario1 = ? AND idUsuario2 = ?)
          `;
          connection.query(checkExist, [u1, u2, u2, u1], (err, existing) => {
            if (err) return res.status(500).json({ message: "Error al verificar chat existente" });
            if (existing.length > 0) {
              return res.json({ message: "Estado actualizado. Ya existía un chat entre los usuarios." });
            }
  
            // Verifica si hay 2 admins o si hay un usuario que ya tiene chat con admin
            connection.query(`SELECT id, tipoUsuario FROM usuario WHERE id IN (?, ?)`, [u1, u2], (err, users) => {
              if (err) return res.status(500).json({ message: "Error al obtener tipo de usuarios" });
  
              const admins = users.filter(u => u.tipoUsuario === 3);
              if (admins.length === 2) {
                return res.json({ message: "Estado actualizado. No se permite un chat entre dos admins." });
              }
  
              const admin = users.find(u => u.tipoUsuario === 3);
              const normal = users.find(u => u.tipoUsuario !== 3);
  
              if (admin && normal) {
                const checkUserAdmin = `
                  SELECT c.idChat FROM chats c
                  JOIN usuario u1 ON c.idUsuario1 = u1.id
                  JOIN usuario u2 ON c.idUsuario2 = u2.id
                  WHERE (c.idUsuario1 = ? OR c.idUsuario2 = ?)
                    AND ((u1.tipoUsuario = 3 AND u1.id != ?) OR (u2.tipoUsuario = 3 AND u2.id != ?))
                `;
                connection.query(checkUserAdmin, [normal.id, normal.id, admin.id, admin.id], (err, rows) => {
                  if (err) return res.status(500).json({ message: "Error al verificar chats previos con admin" });
                  if (rows.length > 0) {
                    return res.json({ message: "Estado actualizado. El usuario ya tiene un chat con un administrador diferente." });
                  }
              
                  // Crear el chat finalmente
                  createChat(connection, u1, u2, res, true);
                });
              } else {
                createChat(connection, u1, u2, res, true);
              }
            });
          });
        } else {
          res.json({ message: "Estado del convenio actualizado correctamente" });
        }
      });
    });
  });
  
  // Función auxiliar para crear el chat
  function createChat(db, u1, u2, res, mostrarMensajeFinal = false) {
    db.query('INSERT INTO chats (idUsuario1, idUsuario2) VALUES (?, ?)', [u1, u2], (err, result) => {
      if (err) return res.status(500).json({ message: "Error al crear chat" });
      if (mostrarMensajeFinal) {
        res.json({ message: "Estado del convenio actualizado y chat creado", idChat: result.insertId });
      }
    });
  }
  

//MUESTRA MATCHES POTENCIALES (aún no aprobados)
app.get('/api/matches-potenciales/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const connection = conectar();
  
    const tipoQuery = 'SELECT tipoUsuario FROM usuario WHERE id = ?';
    connection.query(tipoQuery, [usuarioId], (err, tipoResults) => {
      if (err || tipoResults.length === 0) {
        return res.status(500).json({ error: 'Error obteniendo tipoUsuario' });
      }
  
      const tipoUsuario = tipoResults[0].tipoUsuario;
  
      // Obtenemos los id_Apoyo del usuario actual
      const apoyoQuery = tipoUsuario === 1
        ? `SELECT id_Apoyo FROM perfilnecesidad WHERE id_Escuela = ?`
        : `SELECT id_Apoyo FROM perfiloferta WHERE id_Aliado = ?`;
  
      connection.query(apoyoQuery, [usuarioId], (err, apoyoResults) => {
        if (err) return res.status(500).json({ error: 'Error obteniendo perfil del usuario' });
  
        const idsApoyoUsuario = apoyoResults.map(r => r.id_Apoyo);
        if (idsApoyoUsuario.length === 0) {
          return res.json([]); // No tiene perfil, no devolvemos matches
        }
  
        let query = '';
        if (tipoUsuario === 1) {
          // Escuela busca aliados
          query = `
            SELECT u.id, u.nombre, u.tipoUsuario, a.foto, a.calle, a.colonia, a.cp,
                   GROUP_CONCAT(DISTINCT ta.categoriaApoyo) AS apoyos,
                   COUNT(DISTINCT ta.id) AS coincidencias
            FROM usuario u
            JOIN aliado a ON u.id = a.id_Usuario
            JOIN perfiloferta po ON po.id_Aliado = a.id_Usuario
            JOIN tipoapoyo ta ON ta.id = po.id_Apoyo
            WHERE u.id != ?
              AND u.tipoUsuario = 2
              AND po.id_Apoyo IN (?)
              AND u.id NOT IN (
                SELECT CASE
                  WHEN c.Aliado_Usuario_id = ? THEN c.Aliado_Usuario_id
                  ELSE c.Escuela_Usuario_id
                END
                FROM convenio c
                WHERE (c.Escuela_Usuario_id = ? OR c.Aliado_Usuario_id = ?)
                  AND c.estadoProgreso = 1
              )
            GROUP BY u.id, u.nombre, u.tipoUsuario, a.foto, a.calle, a.colonia, a.cp
            ORDER BY coincidencias DESC
          `;
        } else {
          // Aliado busca escuelas
          query = `
            SELECT u.id, u.nombre, u.tipoUsuario, e.foto, e.calle, e.colonia, e.cp,
                   GROUP_CONCAT(DISTINCT ta.categoriaApoyo) AS apoyos,
                   COUNT(DISTINCT ta.id) AS coincidencias
            FROM usuario u
            JOIN escuela e ON u.id = e.id_Usuario
            JOIN perfilnecesidad pn ON pn.id_Escuela = e.id_Usuario
            JOIN tipoapoyo ta ON ta.id = pn.id_Apoyo
            WHERE u.id != ?
              AND u.tipoUsuario = 1
              AND pn.id_Apoyo IN (?)
              AND u.id NOT IN (
                SELECT CASE
                  WHEN c.Aliado_Usuario_id = ? THEN c.Aliado_Usuario_id
                  ELSE c.Escuela_Usuario_id
                END
                FROM convenio c
                WHERE (c.Escuela_Usuario_id = ? OR c.Aliado_Usuario_id = ?)
                  AND c.estadoProgreso = 1
              )
            GROUP BY u.id, u.nombre, u.tipoUsuario, e.foto, e.calle, e.colonia, e.cp
            ORDER BY coincidencias DESC
          `;
        }
  
        const params = [usuarioId, idsApoyoUsuario, usuarioId, usuarioId, usuarioId];
        connection.query(query, params, (err, results) => {
          if (err) return res.status(500).json({ error: 'Error obteniendo matches potenciales' });
  
          const formatted = results.map((r) => ({
            usuario: {
              id: r.id,
              nombre: r.nombre,
              tipoUsuario: r.tipoUsuario,
              foto: r.foto,
              calle: r.calle,
              colonia: r.colonia,
              cp: r.cp
            },
            apoyos: r.apoyos ? r.apoyos.split(',') : []
          }));
  
          res.json(formatted);
        });
      });
    });
  });
  

//VER SOLICITUDES DE MATCHES (EN ESTADO 0/PENDIENTES DE APROBAR) NO EXTRAE IMAGENES PARA MOSTRAR TODAVIA!
app.get('/api/solicitudes/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const connection = conectar();
  
    const query = `
      SELECT c.*, u.nombre, u.tipoUsuario FROM convenio c
      JOIN usuario u ON (u.id = IF(c.Escuela_Usuario_id = ?, c.Aliado_Usuario_id, c.Escuela_Usuario_id))
      WHERE (c.Escuela_Usuario_id = ? OR c.Aliado_Usuario_id = ?)
      AND c.estadoProgreso = 0
      AND (c.Escuela_Usuario_id != ? AND c.Aliado_Usuario_id = ? OR c.Aliado_Usuario_id != ? AND c.Escuela_Usuario_id = ?)
    `;
  
    connection.query(query, [idUsuario, idUsuario, idUsuario, idUsuario, idUsuario, idUsuario, idUsuario], (err, results) => {
      if (err) return res.status(500).json({ message: "Error al obtener solicitudes" });
      res.json(results);
    });
});

// VER TODOS LOS MATCHES (pendientes y aprobados)
app.get('/api/convenios/usuario/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const connection = conectar();
  
    const query = `
      SELECT u.id, u.nombre, u.tipoUsuario, u.email, u.telefono,
             c.id AS convenioId, c.estadoProgreso,
             COALESCE(e.foto, a.foto) AS imagen
      FROM convenio c
      JOIN usuario u ON (
        (u.id = c.Aliado_Usuario_id AND c.Escuela_Usuario_id = ?) OR
        (u.id = c.Escuela_Usuario_id AND c.Aliado_Usuario_id = ?)
      )
      LEFT JOIN escuela e ON u.tipoUsuario = 1 AND u.id = e.id_Usuario
      LEFT JOIN aliado a ON u.tipoUsuario = 2 AND u.id = a.id_Usuario
      WHERE (c.Aliado_Usuario_id = ? OR c.Escuela_Usuario_id = ?)
    `;
  
    connection.query(query, [usuarioId, usuarioId, usuarioId, usuarioId], (err, results) => {
      if (err) return res.status(500).json({ message: 'Error al obtener matches' });
  
      const formatted = results.map(r => ({
        convenioId: r.convenioId,
        estadoProgreso: r.estadoProgreso,
        usuario: {
          id: r.id,
          nombre: r.nombre,
          tipoUsuario: r.tipoUsuario,
          email: r.email,
          telefono: r.telefono,
          imagen: r.imagen || null
        }
      }));
  
      res.json(formatted);
    });
});
}
  
  
