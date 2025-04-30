import express from 'express'
import './EnviarDatos.js'
import './ValidarSesion.js'
import './Usuarios-Admin.js'
import './Llamar-usuarios.js'
import './Pefil.js'
import { setupRoutes } from './Solicitudes.js'

const app = express()
setupRoutes(app)

app.listen(1984, () => {
    console.log("Archivos ejecutados correctamente")
})