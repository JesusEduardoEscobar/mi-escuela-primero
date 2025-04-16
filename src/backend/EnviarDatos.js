import { conectar } from './BaseDeDatos.js'
// const { conectar } = require('./BaseDeDatos.js');
import express from "express"
import cors from 'cors'
import multer from "multer"
import path from "path"
import fs from "fs"
import { connect } from 'http2'

const app = express()
app.use(cors())
app.use(express.json())
const upload = multer({ storage })

app.post('/api/registrar', upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'documentValid', maxCount: 1 },
    { name: 'incomeProof', maxCount: 1 }
]),async (req, res) => {
    const connection = conectar()
    const userType = req.body.userType;
    try {
        switch (userType) {
            case 'escuela':
                return await registrarEscuela(req, res, connection)
            case 'administrador':
                return await registrarAdministrador(req, res, connection)
            case 'aliado':
                return await registrarAliado(req, res, connection)
        }
    } catch (err) {
        console.error('Error en el registro: '. err)
        return res.status(500).json({ error: 'Error interno del servidor'})
    }
})

async function registrarEscuela(req, res, connection) {
    const {
        email, password, institutionName, street, neighboardhood, betweenStreet1, betweemStreet2, observations, cct, directorName, zipCode
    } = req.body
    let linkDrive = null
    if(req.files?.documentValid?.[0]){
        const file = req.files.documentValid[0]
        linkDrive = await subirArchivoADrive(file.originalname, file.mimetype, file.path, "El id del folder")
        fs.unlinkSync(file.path)
    }
    const nivelEducativo = obtenerNivelDesdeCCT(cct)
    const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 1, 1)
    `
    
    connection.query(queryUsuario, [nombre, email, contrasena, telefono], (err, res) => {
        if (err) return res.status(500).json({ error: 'Error creando usuario' });

        const idUsuario = resultado.insertId;
        const queryEscuela = `
            INSERT INTO escuela (id_Usuario, nivelEducativo, cct, numeroEstudiantes, documentoVerificacion, calle, colonia, cp) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
        connection.query(queryEscuela, [idUsuario, nivel, cct, numeroEstudiantes, linkDrive, calle, colonia, cp], () => {
            connection.end();
            if (err2) return res.status(500).json({ error: 'Error creando escuela' });
            res.status(201).json({ message: 'Escuela registrada correctamente' });
        })
    })
}

async function registrarAliado(req, res, connection) {
    const {
        nombre, email, contrasena, telefono, personaFisica, institucion, calle, colonia, cp
    } = req.body;

    const documento = req.files?.incomeProof?.[0];
    const linkDrive = documento ? await subirArchivoADrive(documento.originalname, documento.mimetype, documento.path, 'TU_FOLDER_ID') : null;
    if (documento) fs.unlinkSync(documento.path);

    const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 'aliado', 1)
    `;
    connection.query(queryUsuario, [nombre, email, contrasena, telefono], (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error creando usuario' })

    const idUsuario = resultado.insertId

    const queryAliado = `
        INSERT INTO aliado (id_Usuario, personaFisica, institucion, documentoVerificacion, calle, colonia, cp) VALUES (?, ?, ?, ?, ?, ?, ?)
    `
    connection.query(queryAliado, [idUsuario, personaFisica, institucion, linkDrive, calle, colonia, cp], (err2) => {
            connection.end()
            if (err2) return res.status(500).json({ error: 'Error creando aliado' })
            res.status(201).json({ message: 'Aliado registrado correctamente' })
        })
    })
}

async function registrarAdministrador(req, res, connection) {
    const { nombre, email, contrasena, telefono, token } = req.body

    const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 'administrador', 1)
    `
    connection.query(queryUsuario, [nombre, email, contrasena, telefono], (err, resultado) => {
        if (err) return res.status(500).json({ error: 'Error creando usuario' })

        const idUsuario = resultado.insertId

        const queryAdmin = `
        INSERT INTO administrador (id_Usuario, token) VALUES (?, ?)
        `
        connection.query(queryAdmin, [idUsuario, token], (err2) => {
            connection.end()
            if (err2) return res.status(500).json({ error: 'Error creando administrador' })
            res.status(201).json({ message: 'Administrador registrado correctamente' })
        })
    })
}

// Detectar nivel educativo desde CCT
function obtenerNivelDesdeCCT(cct) {
  const tipo = cct.substring(2, 5).toUpperCase()
  switch (tipo) {
    case 'DPK': return 'Preescolar'
    case 'DPR': return 'Primaria'
    case 'DPS': return 'Secundaria'
    case 'DCE': return 'Bachillerato'
    default: return 'Otro'
  }
}

app.listen(1984, () => {
    console.log("Este es una prueba para poder empezar con el backend de mi proyecto")
})