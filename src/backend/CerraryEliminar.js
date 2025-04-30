export const logout = async (router) => { // 👈 Exportarla
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  try {
    await fetch('http://localhost:1984/api/logout', {mode: 'no-cors'}, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
};

// src/backend/EliminarCuenta.js

export const eliminarCuenta = async (router) => {
  const email = localStorage.getItem('email');

  try {
    const response = await fetch('http://localhost:1984/api/eliminarCuenta', {mode: 'no-cors'},
      {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      console.log('Cuenta eliminada correctamente');

      localStorage.removeItem('token');
      localStorage.removeItem('email');
      router.push('/')
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
