  import express from 'express';
  import multer from 'multer'
  import { conectar } from './BaseDeDatos.js';
  import { subirArchivoADrive } from './ConecDrive.js';
  import cors from 'cors';

  const upload = multer({ storage: multer.memoryStorage() });

  export function setEvidencias(app) {
    app.use(express.json());
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

    // Endpoint: Crear evidencia
    app.post('/crear-evidencia', upload.single('foto'), async (req, res) => {
      const connection = conectar();
      const { convenioId, descripcion, usuarioId } = req.body;
      console.log("Datos recibidos en el backend:", req.body); // 🔥 Verifica qué datos llegan
  console.log("Archivo recibido:", req.file);

      try {
        let driveUrl = null
        if (req.file) {
          driveUrl = await subirArchivoADrive(
            req.file.originalname,
            req.file.mimetype,
            req.file.buffer,
            '1GMDOIlROBwVtldg2p_ARvRxuAltD7V_H'
          );
        }
        if (!req.file) {
          return res.status(400).json({ error: "No se recibió ningún archivo. Asegúrate de que 'foto' está en el formulario." });
        }

        const [result] = await connection.queryAsync(
          `INSERT INTO evidenciaProyecto (descripcion, foto, id_Convenio, fecha) VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
          [descripcion, driveUrl, convenioId]
        );

        res.status(201).json({
          id: result.insertId,
          mensaje: 'Evidencia creada exitosamente',
          imagen: driveUrl,
        });
      } catch (error) {
        console.error('Error al crear evidencia:', error);
        res.status(500).json({ error: 'Error al crear evidencia' });
      } finally {
        connection.end();
      }
    });

    // Nuevo endpoint: Obtener convenios por usuario
    app.get('/convenios-usuario/:usuarioId', async (req, res) => {
      const usuarioId = req.params.usuarioId;
      console.log('ID de usuario:', usuarioId);
      const connection = conectar();

      try {
        // Consulta para convenios donde el usuario es escuela o aliado
        const [rows] = await connection.queryAsync(
          `SELECT
            c.id,
            c.estadoProgreso AS convenioEstado,
            u1.id AS escuelaId, 
            u1.nombre AS escuelaNombre, 
            e.nombreInstitucion AS escuelaInstitucion,
            e.foto AS escuelaFoto,
            u2.id AS aliadoId, 
            u2.nombre AS aliadoNombre, 
            a.institucion AS aliadoInstitucion,
            a.foto AS aliadoFoto,
            c.Escuela_Usuario_id, 
            c.Aliado_Usuario_id
            FROM convenio c
            JOIN usuario u1 ON u1.id = c.Escuela_Usuario_id
            LEFT JOIN escuela e ON e.id_Usuario = u1.id
            JOIN usuario u2 ON u2.id = c.Aliado_Usuario_id
            LEFT JOIN aliado a ON a.id_Usuario = u2.id
            WHERE (c.Escuela_Usuario_id = ? OR c.Aliado_Usuario_id = ?)
            LIMIT 0, 1000`,
          [usuarioId, usuarioId]
        );

        console.log('Convenios encontrados:', rows);

        if (rows.length === 0) {
          return res.status(404).json({ 
            error: 'No se encontraron convenios para este usuario',
            sugerencia: 'Verifica que el usuario esté correctamente asociado como escuela o aliado en algún convenio'
          });
        }
        res.json(rows);
      } catch (error) {
        console.error('Error al obtener convenios:', error);
        res.status(500).json({ 
          error: 'Error al obtener convenios',
          detalle: error.message 
        });
      } finally {
        connection.end();
      }
    });

    // Endpoint existente modificado para obtener detalles de un convenio específico
    app.get('/usuarios-convenio/:convenioId', async (req, res) => {
      const convenioId = req.params.convenioId;
      const connection = conectar();

      try {
          const [rows] = await connection.queryAsync(
            `SELECT
              c.id,
              c.nombre AS convenioNombre,
              c.estado AS convenioEstado,
              u1.id AS escuelaId, 
              u1.nombre AS escuelaNombre, 
              e.nombreInstitucion AS escuelaInstitucion,
              e.foto AS escuelaFoto,
              u2.id AS aliadoId, 
              u2.nombre AS aliadoNombre, 
              a.institucion AS aliadoInstitucion,
              a.foto AS aliadoFoto,
              c.Escuela_Usuario_id, 
              c.Aliado_Usuario_id,
              c.creador_id
            FROM convenio c
            JOIN usuario u1 ON u1.id = c.Escuela_Usuario_id
            LEFT JOIN escuela e ON e.id_Usuario = u1.id
            JOIN usuario u2 ON u2.id = c.Aliado_Usuario_id
            LEFT JOIN aliado a ON a.id_Usuario = u2.id
            WHERE c.id = ?`,
            [convenioId]
          );

        if (rows.length === 0) {
          return res.status(404).json({ 
            error: 'Convenio no encontrado',
            sugerencia: 'Verifica que el ID del convenio sea correcto'
          });
        }

        const convenio = rows[0];
        
        res.json({
          id: convenio.id,
          nombre: convenio.convenioNombre,
          estado: convenio.convenioEstado,
          escuela: {
            id: convenio.escuelaId,
            nombre: convenio.escuelaNombre,
            institucion: convenio.escuelaInstitucion,
            imagen: convenio.escuelaFoto,
          },
          aliado: {
            id: convenio.aliadoId,
            nombre: convenio.aliadoNombre,
            institucion: convenio.aliadoInstitucion,
            imagen: convenio.aliadoFoto,
          },
          creadorId: convenio.creador_id,
          esCreador: convenio.creador_id === convenio.escuelaId ? 'escuela' : 'aliado'
        });
      } catch (error) {
        console.error('Error al obtener usuarios del convenio:', error);
        res.status(500).json({ 
          error: 'Error al obtener información del convenio',
          detalle: error.message 
        });
      } finally {
        connection.end();
      }
    });

  }
