import { conectar } from "./BaseDeDatos.js"
import express from "express"
import cors from "cors"
import multer from "multer"
import fs from "fs"
import { subirArchivoADrive } from "./ConecDrive.js"
import bcrypt from 'bcrypt'

async function registrarEscuela(req, res, connection) {
  // Fix parameter names to match frontend
  const {
    email,
    password,
    phoneNumber, // Changed from telefono
    institutionName, // Changed from nombreInstitucion
    street, // Changed from calle
    neighborhood, // Changed from colonia
    cct,
    studentCount,
    directorName, // Changed from nombreDirector
    zipCode, // Changed from cp
  } = req.body

  // Crear el hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  let linkDriveArchivo = null
  let linkDriveFoto = null

  // Fix file field names to match frontend
  if (req.files?.documentValid?.[0]) {
    const file = req.files.documentValid[0]
    linkDriveArchivo = await subirArchivoADrive(
      file.originalname,
      file.mimetype,
      file.buffer,
      "1i2aBwM8ptSGrHNAxqP6R3ySmUQsnd--7",
    )
  }

  if (req.files?.profileImage?.[0]) {
    // Changed from photoProfile
    const foto = req.files.profileImage[0]
    linkDriveFoto = await subirArchivoADrive(
      foto.originalname,
      foto.mimetype,
      foto.buffer,
      "1d4z20p9-UT86S-hoT-2xNxa40DAzLMXK",
    )
  }

  const nivelEducativo = obtenerNivelDesdeCCT(cct)

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, constrasenia, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 3, 0)
    `

  connection.query(queryUsuario, [directorName, email, hashedPassword, phoneNumber], (err, resultado) => {
    if (err) {
      console.error("Error en query usuario:", err)
      return res.status(500).json({ error: "Error creando usuario" })
    }

    const idUsuario = resultado.insertId
    const queryEscuela = `
            INSERT INTO escuela (id_Usuario, nivelEducativo, cct, numeroEstudiantes, documentoVerificacion, calle, colonia, cp, nombreInstitucion, foto) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `

    // Fix parameter order and names
    connection.query(
      queryEscuela,
      [
        idUsuario,
        nivelEducativo,
        cct,
        studentCount,
        linkDriveArchivo,
        street,
        neighborhood,
        zipCode,
        institutionName,
        linkDriveFoto,
      ],
      (err2) => {
        connection.end()
        if (err2) {
          console.error("Error en query escuela:", err2)
          return res.status(500).json({ error: "Error creando escuela" })
        }
        res.status(201).json({ message: "Escuela registrada correctamente" })
      },
    )
  })
}

async function registrarAliado(req, res, connection) {
  // Fix parameter names to match frontend
  const {
    email,
    sector,
    password,
    phoneNumber, // Changed from telefono
    representativeName, // Changed from nombre
    personType, // Changed from personaFisica
    companyName, // Changed from institucion
    street, // Changed from calle
    neighborhood, // Changed from colonia
    zipCode, // Changed from cp
  } = req.body

  const hashedPassword = await bcrypt.hash(password, saltRounds)
  // Fix file field name to match frontend
  let linkDriveArchivo = null
  let linkDriveFoto = null
   if (req.files?.incomeProof?.[0]) {
    const file = req.files.incomeProof[0]
    linkDriveArchivo = await subirArchivoADrive(
      file.originalname,
      file.mimetype,
      file.buffer,
      "1esKNSQ1N_B_a89p4ulptXkLQvuVJuJb3",
    )
  }

  if (req.files?.profileImage?.[0]) {
    // Changed from photoProfile
    const foto = req.files.profileImage[0]
    linkDriveFoto = await subirArchivoADrive(
      foto.originalname,
      foto.mimetype,
      foto.buffer,
      "1g2XNiM5DZf4nr_ZhZohcS4HVhAmFDeqm",
    )
  }

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, constrasenia, telefono, tipoUsuario, estado, sesionActiva) VALUES (?, ?, ?, ?, 2, 0, 0)
    `

  connection.query(queryUsuario, [representativeName, email, hashedPassword, phoneNumber], (err, resultado) => {
    if (err) {
      console.error("Error en query usuario:", err)
      return res.status(500).json({ error: "Error creando usuario" })
    }

    const idUsuario = resultado.insertId
    const personaFisica = personType === "fisica" ? 1 : 0
    const institucion = companyName || ""

    const queryAliado = `
        INSERT INTO aliado (id_Usuario, sector, personaFisica, institucion, documentoVerificacion, calle, colonia, cp, foto) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    connection.query(
      queryAliado,
      [
        idUsuario,
        sector,
        personaFisica,
        institucion,
        linkDriveArchivo,
        street,
        neighborhood,
        zipCode,
        linkDriveFoto,
      ],
      (err2) => {
        connection.end()
        if (err2) {
          console.error("Error en query aliado:", err2)
          return res.status(500).json({ error: "Error creando aliado" })
        }
        res.status(201).json({ message: "Aliado registrado correctamente" })
      },
    )
  })
}

async function registrarAdministrador(req, res, connection) {
  // Fix parameter names to match frontend
  const {
    email,
    name,
    password, // Changed from contrasena
    verificationCode, // Changed from token
  } = req.body
  
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, constrasenia, tipoUsuario, estado) VALUES (?, ?, ?, 3, 1)
    `

  connection.query(queryUsuario, [name, email, hashedPassword, ""], (err, resultado) => {
    if (err) {
      console.error("Error en query usuario:", err)
      return res.status(500).json({ error: "Error creando usuario" })
    }

    const idUsuario = resultado.insertId

    const queryAdmin = `
            INSERT INTO administrador (id_Usuario, token) VALUES (?, ?)
        `

    connection.query(queryAdmin, [idUsuario, verificationCode], (err2) => {
      connection.end()
      if (err2) {
        console.error("Error en query administrador:", err2)
        return res.status(500).json({ error: "Error creando administrador" })
      }
      res.status(201).json({ message: "Administrador registrado correctamente" })
    })
  })
}

// Detectar nivel educativo desde CCT
function obtenerNivelDesdeCCT(cct) {
  const tipo = cct.substring(2, 5).toUpperCase()
  switch (tipo) {
    case "DPK":
      return "Preescolar"
    case "DPR":
      return "Primaria"
    case "DPS":
      return "Secundaria"
    case "DCE":
      return "Bachillerato"
    default:
      return "Otro"
  }
}

const saltRounds = 10;

export function setEnviarDatos(app) {
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)

// Configure multer to store files on disk temporarily
const storage = multer.memoryStorage()
const upload = multer({ storage })

app.post("/api/registrar", 
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "documentValid", maxCount: 1 },
    { name: "incomeProof", maxCount: 1 },
  ]),
  // upload.any(),
  async (req, res) => {
    console.log("Recibida solicitud de registro:", req.body.userType);
    console.log("recibido de form-data:", req.body);
    const connection = conectar()
    const userType = req.body.userType
    try {
      switch (userType) {
        case "escuela":
          return await registrarEscuela(req, res, connection)
        case "administrador":
          return await registrarAdministrador(req, res, connection)
        case "aliado":
          return await registrarAliado(req, res, connection)
        default:
          return res.status(400).json({ error: "Tipo de usuario no válido" })
      }
    } catch (err) {
      console.error("Error en el registro: ", err)
      return res.status(500).json({ error: "Error interno del servidor" })
    }
  },
)

app.post("/api/crear-post", upload.single("media"), async (req, res) => {
  try {
    const { content, convenioId, solicitudId } = req.body
    const conectar = conectar()
    // Validar datos básicos
    if (!convenioId) {
      return res.status(400).json({ message: "El convenio es obligatorio" })
    }

    // Procesar archivo si existe usando la función existente
    let mediaUrl = null
    if (req.file) {
      mediaUrl = await subirArchivoADrive(req.file.buffer)
    }

    // Aquí iría tu lógica para guardar en la base de datos
    // Por ejemplo:
    // const result = await db.query("INSERT INTO publicaciones...", [content, convenioId, solicitudId, mediaUrl])

    const result = await connection.query(
      "INSERT INTO publicaciones (content, convenioId, solicitudId, mediaUrl) VALUES (?, ?, ?, ?)",
      [content, convenioId, solicitudId, mediaUrl]
    )
    if (result.affectedRows === 0) {
      return res.status(500).json({ message: "Error al crear la publicación" })
    }
    // Simulamos una respuesta exitosa
    res.status(201).json({
      message: "Publicación creada correctamente",
      postId: Date.now(), // Simulado
      mediaUrl,
    })
  } catch (error) {
    console.error("Error:", error)
    res.status(500).json({ message: "Error al crear la publicación" })
  }
})
}