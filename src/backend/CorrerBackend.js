import express from "express";
import cors from "cors";
import { setEnviarDatos } from "./EnviarDatos.js";
import { setValidarSesion } from "./ValidarSesion.js";
import { setUsuariosAdmin } from "./Usuarios-Admin.js";
import { setLlamarUsuario } from "./Llamar-usuarios.js";
import { setPerfil } from "./Pefil.js"; // Fix typo
import { setupRoutes } from "./Solicitudes.js";
import { setMatches } from "./Matches.js";
import mensajes from "./Mensajeria.js";
import { infoUsers } from "./infoUsuario.js";
import { actualizarEstado } from "./actualizarEstadoSolicitud.js";
import { todasSolicitudes } from "./verSolicitudes.js";
import { eliminarSolicitud } from "./EliminarSolicitud.js";
import { verEvidencias } from "./Evidencias.js";
const app = express();
const PORT = 1984;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes setup
setupRoutes(app);
setPerfil(app);
setEnviarDatos(app);
setValidarSesion(app);
setUsuariosAdmin(app);
setLlamarUsuario(app);
setMatches(app);
mensajes(app);
infoUsers(app);
actualizarEstado(app);
todasSolicitudes(app);
verEvidencias(app);
eliminarSolicitud(app);

// Start server
app.listen(PORT, () => {
  console.log(`Archivos ejecutados correctamente en el puerto ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
