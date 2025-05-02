import { getUserRole } from "../utils/UtilidadesAuth";

export const logout = async (router) => {
  const { id: usuarioId } = getUserRole() || {};
  const token = localStorage.getItem('token');

  try {
    await fetch('http://localhost:1984/api/logout', {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id: usuarioId }),
    });

    localStorage.removeItem('token');

    router.push('/');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
};

export const eliminarCuenta = async (router) => {
  const { id: usuarioId } = getUserRole() || {};

  try {
    const response = await fetch('http://localhost:1984/api/eliminarCuenta', {

      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: usuarioId }),

    });

    if (response.ok) {
      console.log('Cuenta eliminada correctamente');
      localStorage.removeItem('token');
      router.push('/');

      return true;
    } else {
      console.error('Error al eliminar la cuenta');
      return false;
    }
  } catch (error) {
    console.error('Error eliminando la cuenta:', error);
    return false;
  }
};
