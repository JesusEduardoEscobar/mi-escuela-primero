import express from 'express'
import cors from 'cors'
import { setEnviarDatos } from './EnviarDatos.js'
import { setValidarSesion } from './ValidarSesion.js'
import { setUsuariosAdmin } from './Usuarios-Admin.js'
import { setLlamarUsuarios } from './Llamar-usuarios.js'
import { setMatches } from './Matches.js'

const app = express()

app.use(express.json());

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,               
    })
  )

setEnviarDatos(app);
setValidarSesion(app);
setUsuariosAdmin(app);
setLlamarUsuarios(app);
setMatches(app);

app.listen(1984, () => {
    console.log("Archivos ejecutados correctamente")
});