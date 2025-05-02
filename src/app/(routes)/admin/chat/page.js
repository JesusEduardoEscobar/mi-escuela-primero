// src/pages/admin/page.js
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Search } from "lucide-react";
import { getUserRole } from "@/utils/UtilidadesAuth";



export default function ChatPage() {
  const [chats, setChats] = useState([]); // Estado para los chats
  const [search, setSearch] = useState(""); // Estado para la búsqueda
  const [usuarios, setUsuarios] = useState([]); // Estado para los usuarios
  const [selectedUser, setSelectedUser] = useState(""); // Estado para el usuario seleccionado
  const [adminId, setAdminId] = useState(null);
const [userSearch, setUserSearch] = useState("");
  const router = useRouter();

  // Cargar las conversaciones entre los usuarios y los usuarios
  useEffect(() => {
    axios
      .get("http://localhost:1984/admin/todos-los-chats")
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));

    // Obtener los usuarios disponibles para crear un chat
    axios
      .get("http://localhost:1984/usuarios") // Asegúrate de tener esta ruta en tu backend
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filtrar los chats según la búsqueda
  const filtered = chats.filter((chat) => {
    const nombre1 = chat.nombreUsuario1?.toLowerCase() || "";
    const nombre2 = chat.nombreUsuario2?.toLowerCase() || "";
    return nombre1.includes(search.toLowerCase()) || nombre2.includes(search.toLowerCase());
  });
  

  // Función para redirigir al chat específico
  const handleChatClick = (chatId) => {
    router.push(`/admin/chat/${chatId}`);
  };

  // Función para crear un chat
  useEffect(() => {
    const info = getUserRole();
    if (info?.id) setAdminId(info.id);
  }, []);
  
  // Filtrar usuarios (excluyendo al propio admin)
  const usuariosFiltrados = usuarios
    .filter(user => user.nombre.toLowerCase().includes(userSearch.toLowerCase()))
    .filter(user => user.id !== adminId)
    ;
  
  const handleCreateChat = () => {
    if (!selectedUser || !adminId) {
      alert("Selecciona un usuario.");
      return;
    }
  
    
    axios
    .post('http://localhost:1984/crearChat', { idUsuario1: adminId, idUsuario2: selectedUser })
    .then((res) => {
      if (!res.data || !res.data.idChat) {
        alert('Error inesperado: respuesta inválida del servidor');
        return;
      }
  
      alert("Chat creado con éxito");
  
      const usuarioActual = getUserRole(); // admin
      const otroUsuario = usuarios.find((u) => u.id === parseInt(selectedUser, 10));
  
      const nuevoChat = {
        idChat: res.data.idChat,
        idUsuario1: usuarioActual.id,
        idUsuario2: otroUsuario.id,
        nombreUsuario1: usuarioActual.nombre,
        nombreUsuario2: otroUsuario.nombre,
      };
  
      setChats((prevChats) => [...prevChats, nuevoChat]);
    })
    .catch((error) => {
      const mensaje =
        error.response?.data && typeof error.response.data === 'string'
          ? error.response.data
          : 'Ocurrió un error al crear el chat';
      alert(mensaje);
    });  }

  return (
    <div className="space-y-6 pb-20">
      {adminId && (
  <button
    onClick={() => router.push(`/admin/mis-conversaciones/${adminId}`)}
    className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-md"
  >
    Mis conversaciones
  </button>
)}
      <h1 className="text-2xl font-bold">Conversaciones de Usuarios</h1>

      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualizar estado de búsqueda
        />
      </div>

      {/* Lista de conversaciones entre usuarios */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Chats entre usuarios</h2>
        </div>
        <div className="max-h-96 overflow-y-auto divide-y"> {/* 5x80px aprox */}
  {filtered.map((chat) => (
    <div
      key={chat.idChat}
      className="p-4 border-b cursor-pointer hover:bg-gray-50"
      onClick={() => handleChatClick(chat.idChat)}
    >
      <p className="font-medium">Conversación #{chat.idChat}</p>
      <p>{chat.nombreUsuario1} 🗨️ {chat.nombreUsuario2}</p>
    </div>
  ))}
</div>
        
      </div>

      {/* Formulario para crear un chat */}
      <div className="mt-6">
  <h2 className="font-medium mb-2">Crear un chat con un usuario</h2>

  {/* Input de búsqueda */}
  <input
    type="text"
    className="border rounded-lg p-2 w-full mb-2"
    placeholder="Buscar usuario..."
    value={userSearch}
    onChange={(e) => setUserSearch(e.target.value)}
  />

  {/* Lista de usuarios con scroll */}
  <div className="border rounded-md max-h-60 overflow-y-auto divide-y shadow-sm scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    {usuariosFiltrados.map((user) => (
      <div
        key={user.id}
        onClick={() => setSelectedUser(user.id)}
        className={`p-2 cursor-pointer hover:bg-blue-100 ${
          selectedUser === user.id ? "bg-blue-200 font-semibold" : ""
        }`}
      >
        {user.nombre}
      </div>
    ))}
  </div>

  {/* Botón de acción */}
  <button
    onClick={handleCreateChat}
    className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
  >
    Crear Chat
  </button>
</div>

    </div>
  );
}
