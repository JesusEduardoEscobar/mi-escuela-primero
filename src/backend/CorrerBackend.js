import express from 'express'
import cors from 'cors'
import { setEnviarDatos } from './EnviarDatos.js'
import { setValidarSesion } from './ValidarSesion.js'
import { setUsuariosAdmin } from './Usuarios-Admin.js'
import { setLlamarUsuario } from './Llamar-usuarios.js'
import { setPerfil } from './Pefil.js'
import { setupRoutes } from './Solicitudes.js'
import { setMatches } from './Matches.js'
import mensajes from './Mensajeria.js'

const app = express()
setupRoutes(app)
setPerfil(app)
setEnviarDatos(app)
setValidarSesion(app)
setUsuariosAdmin(app)
setLlamarUsuario(app)
mensajes(app)

app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,               
    })
  )
app.listen(1984, () => {
    console.log("Archivos ejecutados correctamente en el puerto 1984")
    console.log("http://localhost:1984")
})
