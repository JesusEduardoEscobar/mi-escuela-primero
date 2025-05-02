import { conectar } from './BaseDeDatos.js';

export default function mensajes(app) {
  const db = conectar();

  app.post('/crearChat', (req, res) => {
    const { idUsuario1, idUsuario2 } = req.body;
    const u1 = parseInt(idUsuario1, 10), u2 = parseInt(idUsuario2, 10);

    const checkExist = `
      SELECT idChat FROM chats
      WHERE (idUsuario1 = ? AND idUsuario2 = ?)
         OR (idUsuario1 = ? AND idUsuario2 = ?)
    `;
    db.query(checkExist, [u1, u2, u2, u1], (err, existing) => {
      if (err) return res.status(500).send(err);
      if (existing.length > 0) {
        return res.status(400).send('Ya existe una conversación entre estos usuarios');
      }

      db.query(`SELECT id, tipoUsuario FROM usuario WHERE id IN (?, ?)`, [u1, u2], (err, users) => {
        if (err) return res.status(500).send(err);

        const admins = users.filter(u => u.tipoUsuario === 3);
        if (admins.length === 2) {
          return res.status(400).send('No se permite una conversación entre administradores');
        }

        const admin = users.find(u => u.tipoUsuario === 3);
        const normal = users.find(u => u.tipoUsuario !== 3);

        if (admin && normal) {
          const checkUserAdmin = `
            SELECT c.idChat FROM chats c
            JOIN usuario uA ON (c.idUsuario1 = uA.id OR c.idUsuario2 = uA.id)
            WHERE (c.idUsuario1 = ? OR c.idUsuario2 = ?)
              AND uA.tipoUsuario = 3
          `;
          db.query(checkUserAdmin, [normal.id, normal.id], (err, rows) => {
            if (err) return res.status(500).send(err);
            if (rows.length > 0) return res.status(400).send('El usuario ya tiene un chat con un administrador');
            return createChat(u1, u2, res);
          });
        } else {
          return createChat(u1, u2, res);
        }
      });
    });
  });

  function createChat(u1, u2, res) {
    db.query('INSERT INTO chats (idUsuario1, idUsuario2) VALUES (?, ?)', [u1, u2], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ idChat: result.insertId });
    });
  }

  app.get('/mis-chats/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    db.query(`
      SELECT 
        c.idChat, 
        u.id AS idOtroUsuario,
        u.nombre AS nombreOtroUsuario
      FROM chats c
      JOIN usuario u ON 
        (u.id = c.idUsuario1 AND c.idUsuario2 = ?) 
        OR 
        (u.id = c.idUsuario2 AND c.idUsuario1 = ?)
      WHERE c.idUsuario1 = ? OR c.idUsuario2 = ?
    `, [idUsuario, idUsuario, idUsuario, idUsuario], (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  });

  app.post('/enviarMensaje', (req, res) => {
    const { idChat, mensaje, enviadoPor } = req.body;
    db.query(
      'INSERT INTO mensajes (idChat, mensaje, enviadoPor) VALUES (?, ?, ?)',
      [idChat, mensaje, enviadoPor],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.send('Mensaje enviado');
      }
    );
  });

  app.get('/mensajes/:idChat', (req, res) => {
    const { idChat } = req.params;
    db.query(`
      SELECT mensajes.mensaje, mensajes.timeStamp, usuario.nombre AS nombreUsuario
      FROM mensajes
      JOIN usuario ON mensajes.enviadoPor = usuario.id
      WHERE mensajes.idChat = ?
      ORDER BY mensajes.timeStamp ASC
    `, [idChat], (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  });

  app.get('/admin/mensajes', (req, res) => {
    const { id1, id2, nombre1, nombre2 } = req.query;

    const userFilter = id1 && id2
      ? '(idUsuario1 = ? AND idUsuario2 = ?) OR (idUsuario1 = ? AND idUsuario2 = ?)'
      : '(u1.nombre = ? AND u2.nombre = ?) OR (u1.nombre = ? AND u2.nombre = ?)';

    const values = id1 && id2
      ? [id1, id2, id2, id1]
      : [nombre1, nombre2, nombre2, nombre1];

    db.query(`
      SELECT m.mensaje, m.timeStamp, u.nombre AS nombreUsuario
      FROM chats c
      JOIN mensajes m ON c.idChat = m.idChat
      JOIN usuario u ON m.enviadoPor = u.id
      JOIN usuario u1 ON c.idUsuario1 = u1.id
      JOIN usuario u2 ON c.idUsuario2 = u2.id
      WHERE ${userFilter}
      ORDER BY m.timeStamp ASC
    `, values, (err, results) => {
      if (err) return res.status(500).send(err);
      res.send(results);
    });
  });
}
