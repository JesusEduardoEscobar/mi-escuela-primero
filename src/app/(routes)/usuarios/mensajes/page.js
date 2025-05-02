"use client";
import { useEffect, useState, useContext } from 'react';
//import { UserContext } from '@/context/UserContext';
import Link from 'next/link';
import axios from 'axios';

export default function ListaDeChats() {
  const idUsuario = 6;
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:1984/mis-chats/${idUsuario}`)
      .then(res => setChats(res.data))
      .catch(err => console.error('Error cargando chats:', err));
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
              <Link href={`mensajes/${chat.idChat}`}>
                Chat con <b>{chat.nombreOtroUsuario}</b>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
