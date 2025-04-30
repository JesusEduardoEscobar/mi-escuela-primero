/* 
Guardar el token del usuario para poder consultarlo despues
*/

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || "Clave_secreta";

export const getUserRole = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return {
      tipoUsuario: decoded.tipoUsuario,
      id: decoded.id
    };
  } catch (error) {
    console.error("Error verificando el token:", error);
    return null;
  }
};
