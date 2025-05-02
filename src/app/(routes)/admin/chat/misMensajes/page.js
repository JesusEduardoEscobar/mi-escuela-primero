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
    if (user && user.id) {
      setIdUsuario(user.id);
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
    <div style={{
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      height: 'calc(100vh - 125px)', // ← deja espacio para la barra inferior
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{ fontSize: '28px', marginBottom: '15px' }}>Mis conversaciones</h2>

      {chats.length === 0 ? (
        <p style={{ color: '#666' }}>No tienes chats activos.</p>
      ) : (
        <div style={{
          flex: 1,
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '10px',
          padding: '10px',
          backgroundColor: '#fff',
        }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {chats.map(chat => (
              <li
                key={chat.idChat}
                style={{
                  marginBottom: '10px',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  padding: '12px',
                  backgroundColor: '#f9f9f9',
                  transition: 'background-color 0.2s',
                }}
              >
                <Link
                  href={`misMensajes/${chat.idChat}`}
                  style={{
                    textDecoration: 'none',
                    color: '#333',
                    fontWeight: '500',
                    display: 'block',
                  }}
                >
                  💬 Chat con <b>{chat.nombreOtroUsuario}</b>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
