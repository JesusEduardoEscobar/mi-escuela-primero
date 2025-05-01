<<<<<<< Updated upstream
import jwt from 'jsonwebtoken';

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwt.decode(token);
      return decoded.tipoUsuario;
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  }
  return null;
};
=======
// src/utils/UtilidadesAuth.js
import jwt from "jsonwebtoken";

export const getUserRole = () => {
  console.log("PRUEBA 👀👀👀 - getUserRole() ejecutado");

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
>>>>>>> Stashed changes
