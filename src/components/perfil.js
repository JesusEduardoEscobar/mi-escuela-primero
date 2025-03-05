"use client"

import { useState, useEffect } from "react"
import Head from "next/head"
import { Settings, LogOut } from "lucide-react"
import CrearPost from "../components/crearPost"
import Post from "../components/post"
import AjustesDelPerfil from "../components/ajustesDelPerfil"

export default function Profile() {
  const [user, setUser] = useState({
    name: "Escuela Benito Juar",
    username: "@usuario",
    bio: "Esta es mi biografía personal",
    profilePic: "/placeholder.svg?height=100&width=100",
    coverPic: "/placeholder.svg?height=300&width=800",
  })

  const [posts, setPosts] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  // Simular carga de publicaciones
  useEffect(() => {
    // Aquí normalmente cargarías las publicaciones desde una API
    setPosts([
      {
        id: 1,
        content: "Mi primera publicación",
        media: "/placeholder.svg?height=400&width=600",
        mediaType: "image",
        date: "Hace 2 horas",
      },
      {
        id: 2,
        content: "Miren este video increíble",
        media: "https://example.com/video.mp4", // URL de ejemplo
        mediaType: "video",
        date: "Hace 1 día",
      },
    ])
  }, [])

  const handleCrearPost = (newPost) => {
    // Agregar un ID único y fecha
    const post = {
      ...newPost,
      id: Date.now(),
      date: "Justo ahora",
    }
    setPosts([post, ...posts])
  }

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId))
  }

  const updateUserProfile = (updatedUser) => {
    setUser({ ...user, ...updatedUser })
    setShowSettings(false)
  }

  return (
    <>
      <Head>
        <title>{user.name} - Perfil</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Barra de navegación */}
        <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">SocialApp</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Configuración"
            >
              <Settings size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100" aria-label="Cerrar sesión">
              <LogOut size={20} />
            </button>
          </div>
        </nav>

        {/* Portada y foto de perfil */}
        <div className="relative">
          <div className="h-48 md:h-64 w-full bg-gray-200 overflow-hidden">
            <img src={user.coverPic || "/placeholder.svg"} alt="Portada" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-16 left-4 md:left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
              <img src={user.profilePic || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Información del perfil */}
        <div className="mt-20 px-4 md:px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
            </div>
            <button
              onClick={() => setShowSettings(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Editar perfil
            </button>
          </div>

          {/* Crear publicación */}
          <div className="mt-8">
            <CrearPost onCrearPost={handleCrearPost} />
          </div>

          {/* Lista de publicaciones */}
          <div className="mt-8 space-y-6">
            {posts.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg shadow">
                <p className="text-gray-500">No hay publicaciones aún</p>
              </div>
            ) : (
              posts.map((post) => <Post key={post.id} post={post} user={user} onDelete={handleDeletePost} />)
            )}
          </div>
        </div>
      </div>

      {/* Modal de configuración */}
      {showSettings && (
        <AjustesDelPerfil
         user={user} onSave={updateUserProfile} onClose={() => setShowSettings(false)} />
      )}
    </>
  )
}

