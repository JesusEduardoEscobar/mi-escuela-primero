"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ChatPage() {
  const { idChat } = useParams(); // ← en App Router usamos useParams()
  const idUsuario = 6; // ← reemplaza por el id real si ya tienes login
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [ultimoTimestamp, setUltimoTimestamp] = useState('2000-01-01 00:00:00');

  useEffect(() => {
    if (!idChat) return;
  
    const cargarMensajes = () => {
      axios.get(`http://localhost:1984/mensajes/${idChat}`)
        .then(res => {
          setMensajes(res.data);
        })
        .catch(err => {
          console.error("Error al cargar mensajes:", err);
        });
    };
  
    cargarMensajes(); // primera carga
  
    const interval = setInterval(cargarMensajes, 3000); // actualiza cada 3 segundos
  
    return () => clearInterval(interval);
  }, [idChat]);
  

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim()) return;

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
    <div style={{ padding: 20 }}>
      <h2>Chat</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {mensajes.map((msg, i) => (
          <p key={i}><b>{msg.nombreUsuario}:</b> {msg.mensaje}</p>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={nuevoMensaje}
          onChange={e => setNuevoMensaje(e.target.value)}
          placeholder="Escribe un mensaje"
          style={{ width: '80%', marginRight: 10 }}
        />
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </div>
  );
}
