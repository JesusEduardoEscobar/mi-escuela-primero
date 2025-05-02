import express from 'express'
import { setEnviarDatos } from './EnviarDatos.js'
import { setValidarSesion } from './ValidarSesion.js'
import { setUsuariosAdmin } from './Usuarios-Admin.js'
import { setLlamarUsuario } from './Llamar-usuarios.js'
import { setPerfil } from './Pefil.js'
import { setupRoutes } from './Solicitudes.js'

const app = express()
setupRoutes(app)
setPerfil(app)
setEnviarDatos(app)
setValidarSesion(app)
setUsuariosAdmin(app)
setLlamarUsuario(app)

app.listen(1984, () => {
    console.log("Archivos ejecutados correctamente en el puerto 1984")
    console.log("http://localhost:1984")
})