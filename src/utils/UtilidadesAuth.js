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
