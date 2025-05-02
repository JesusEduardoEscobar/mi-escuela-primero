"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ChatDetailPage() {
  const { id } = useParams(); // Obtener el id de la URL
  const [messages, setMessages] = useState([]);
  const [chatInfo, setChatInfo] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Cargar los mensajes del chat con el id correspondiente
    axios
      .get(`http://localhost:1984/mensajes/${id}`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));

    // Cargar información adicional sobre el chat (opcional, por ejemplo, nombres de los usuarios)
    axios
      .get(`http://localhost:1984/mensajes/${id}`)
      .then((res) => setChatInfo(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const goBack = () => {
    router.back(); // Volver a la página anterior
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex items-center p-4 border-b bg-white">
        <button
          className="p-2 mr-2 rounded-full hover:bg-gray-100"
          onClick={goBack}
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="ml-3">
          <h2 className="font-medium">Conversación #{id}</h2>
          <p className="text-sm text-gray-500">
            {chatInfo.nombreUsuario1} 🗨️ {chatInfo.nombreUsuario2}
          </p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.nombreUsuario === chatInfo.nombreUsuario1
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`py-2 px-4 rounded-lg max-w-xs ${
                  message.nombreUsuario === chatInfo.nombreUsuario1
                    ? "bg-blue-500 text-white"
                    : "bg-white border"
                }`}
              >
                <p className="font-medium">{message.nombreUsuario}</p>
                <p>{message.mensaje}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
