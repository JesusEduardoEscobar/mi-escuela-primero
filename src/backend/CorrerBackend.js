import express from 'express'
import './EnviarDatos.js'
import './ValidarSesion.js'
import './Usuarios-Admin.js'

const app = express()

app.listen(1984, () => {
    console.log("Archivos ejecutados correctamente")
})