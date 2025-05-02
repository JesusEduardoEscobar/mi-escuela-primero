"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getUserRole } from '@/utils/UtilidadesAuth';
import axios from 'axios';

export default function ChatPage() {
  const { idChat } = useParams();
  const [idUsuario, setIdUsuario] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  useEffect(() => {
    const userInfo = getUserRole();
    if (userInfo && userInfo.id) {
      setIdUsuario(userInfo.id);
    } else {
      console.error("No se pudo obtener el ID del usuario desde el token.");
    }
  }, []);

  useEffect(() => {
    if (!idChat) return;

    const cargarMensajes = () => {
      axios.get(`http://localhost:1984/mensajes/${idChat}`)
        .then(res => setMensajes(res.data))
        .catch(err => {
          console.error("Error al cargar mensajes:", err);
        });
    };

    cargarMensajes();
    const interval = setInterval(cargarMensajes, 3000);
    return () => clearInterval(interval);
  }, [idChat]);

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !idUsuario) return;

    try {
      await axios.post('http://localhost:1984/enviarMensaje', {
        idChat,
        mensaje: nuevoMensaje,
        enviadoPor: idUsuario
      });
      setNuevoMensaje('');
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 125px)', // ← ajusta esta parte según el alto real de la barra inferior
      maxWidth: 600,
      margin: '0 auto',
      padding: 20,
    }}>
      <h2 style={{ fontSize: 24, marginBottom: 10 }}>Chat</h2>
    
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#fefefe',
        marginBottom: 15,
      }}>
        {mensajes.length === 0 ? (
          <p style={{ color: '#888' }}>No hay mensajes aún.</p>
        ) : (
          mensajes.map((msg, i) => {
            const esPropio = Number(msg.enviadoPor) === Number(idUsuario);
            return (
              <div key={i} style={{
                backgroundColor: esPropio ? '#DCF8C6' : '#f1f1f1',
                padding: 10,
                borderRadius: 10,
                marginBottom: 8,
                alignSelf: esPropio ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                wordWrap: 'break-word',
                textAlign: esPropio ? 'right' : 'left'
              }}>
                <p style={{ margin: 0 }}>
                  <strong>{msg.nombreUsuario}</strong>: {msg.mensaje}
                </p>
              </div>
            );
          })
        )}
      </div>
    
      <div style={{ display: 'flex', gap: 10 }}>
        <input
          value={nuevoMensaje}
          onChange={e => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: 8,
            border: '1px solid #ccc',
            fontSize: 16
          }}
        />
        <button
          onClick={enviarMensaje}
          style={{
            padding: '10px 20px',
            borderRadius: 8,
            backgroundColor: '#0070f3',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
      </div>
    </div>
    
  );  
}
