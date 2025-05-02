import axios from "axios";
import { getUserRole } from "../utils/UtilidadesAuth";

async function fetchRealDataUsuarios() {
  const userRole = getUserRole();

  if (!userRole) {
    console.error("No se pudo obtener el rol del usuario.");
    return [];
  }

  const { tipoUsuario, id } = userRole;

  try {
    const response = await axios.get("http://localhost:1984/api/infoUsuario", {
      params: { tipoUsuario, id },
      withCredentials: true,
    });

    const data = response.data;

    const usuario = {
      id: data.id,
      nombre: data.nombre,
      tipo: data.tipo,
      correo: data.correo,
      imagen: data.imagen,
      descripcion: data.descripcion || "",
      ubicacion: data.ubicacion,
      necesidades: data.necesidades || [],
      apoyos: data.apoyos || [],
      solicitudes: data.solicitudes || data.ofertas || [],
      matches: data.matches || [],
    };

    return [usuario];
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    return [];
  }
}

export const realDataUsuarios = await fetchRealDataUsuarios();
export default { usuarios: realDataUsuarios };
