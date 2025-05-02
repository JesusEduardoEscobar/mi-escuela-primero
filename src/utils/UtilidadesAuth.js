// src/utils/UtilidadesAuth.js
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "Clave_secreta";

export const getUserRole = () => {

  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    // decode sin verificar para que funcione en el navegador
    const decoded = jwt.decode(token);
    return {
      tipoUsuario: decoded.tipoUsuario,
      id: decoded.idUsuario,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
