import { conectar } from "./BaseDeDatos.js"
import express from "express"
import cors from "cors"
import multer from "multer"
import path from "path"
import fs from "fs"
import { subirArchivoADrive } from "./ConecDrive.js"
import bcrypt from 'bcrypt'

const app = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())

const saltRounds = 10;
// Crear el hash de la contraseña
const hashedPassword = await bcrypt.hash(password, saltRounds);


// Configure multer to store files on disk temporarily
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// Create uploads directory if it doesn't exist
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads")
}

const upload = multer({ storage })

app.post(
  "/api/registrar",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "documentValid", maxCount: 1 },
    { name: "incomeProof", maxCount: 1 },
  ]),
  async (req, res) => {
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

async function registrarEscuela(req, res, connection) {
  // Fix parameter names to match frontend
  const {
    email,
    hashedPassword,
    phoneNumber, // Changed from telefono
    institutionName, // Changed from nombreInstitucion
    street, // Changed from calle
    neighborhood, // Changed from colonia
    cct,
    studentCount,
    directorName, // Changed from nombreDirector
    zipCode, // Changed from cp
  } = req.body

  let linkDriveArchivo = null
  let linkDriveFoto = null

  // Fix file field names to match frontend
  if (req.files?.documentValid?.[0]) {
    const file = req.files.documentValid[0]
    linkDriveArchivo = await subirArchivoADrive(
      file.originalname,
      file.mimetype,
      file.path,
      "1i2aBwM8ptSGrHNAxqP6R3ySmUQsnd--7",
    )
    fs.unlinkSync(file.path)
  }

  if (req.files?.profileImage?.[0]) {
    // Changed from photoProfile
    const foto = req.files.profileImage[0]
    linkDriveFoto = await subirArchivoADrive(
      foto.originalname,
      foto.mimetype,
      foto.path,
      "1d4z20p9-UT86S-hoT-2xNxa40DAzLMXK",
    )
    fs.unlinkSync(foto.path)
  }

  const nivelEducativo = obtenerNivelDesdeCCT(cct)

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 3, 0)
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
    hashedPassword,
    phoneNumber, // Changed from telefono
    representativeName, // Changed from nombre
    personType, // Changed from personaFisica
    companyName, // Changed from institucion
    street, // Changed from calle
    neighborhood, // Changed from colonia
    zipCode, // Changed from cp
  } = req.body

  // Fix file field name to match frontend
  let linkDriveArchivo = null
  let linkDriveFoto = null
   if (req.files?.incomeProof?.[0]) {
    const file = req.files.incomeProof[0]
    linkDriveArchivo = await subirArchivoADrive(
      file.originalname,
      file.mimetype,
      file.path,
      "1esKNSQ1N_B_a89p4ulptXkLQvuVJuJb3",
    )
    fs.unlinkSync(file.path)
  }

  if (req.files?.profileImage?.[0]) {
    // Changed from photoProfile
    const foto = req.files.profileImage[0]
    linkDriveFoto = await subirArchivoADrive(
      foto.originalname,
      foto.mimetype,
      foto.path,
      "1g2XNiM5DZf4nr_ZhZohcS4HVhAmFDeqm",
    )
    fs.unlinkSync(foto.path)
  }

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 2, 0)
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
        sector, // Added sector field
        personaFisica,
        institucion,
        documentoLink,
        street,
        neighborhood,
        zipCode,
        fotoLink,
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
    name, // Changed from nombre
    email,
    hashedPassword, // Changed from contrasena
    verificationCode, // Changed from token
  } = req.body

  const queryUsuario = `
        INSERT INTO usuario (nombre, email, contrasena, telefono, tipoUsuario, estado) VALUES (?, ?, ?, ?, 3, 1)
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

app.listen(1984, () => {
  console.log("Servidor iniciado en el puerto 1984")
})
