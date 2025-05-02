"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { getUserRole } from '@/utils/UtilidadesAuth';

export default function ListaDeChats() {
  const [chats, setChats] = useState([]);
  const [idUsuario, setIdUsuario] = useState(null);

  useEffect(() => {
    const user = getUserRole();
    console.log("🔍 Usuario decodificado desde el token:", user); // <-- Aquí
    if (user && user.id) {
      setIdUsuario(user.id);
      console.log("ID de usuario:", user.id); // <-- Aquí
    } else {
      console.error("No se pudo obtener el ID del usuario desde el token");
    }
  }, []);
  

  useEffect(() => {
    if (idUsuario !== null) {
      axios.get(`http://localhost:1984/mis-chats/${idUsuario}`)
        .then(res => setChats(res.data))
        .catch(err => console.error('Error cargando chats:', err));
    }
  }, [idUsuario]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Mis conversaciones</h2>
      {chats.length === 0 ? (
        <p>No tienes chats activos.</p>
      ) : (
        <ul>
          {chats.map(chat => (
            <li key={chat.idChat}>
              <Link href={`misMensajes/${chat.idChat}`}>
                Chat con <b>{chat.nombreOtroUsuario}</b>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
