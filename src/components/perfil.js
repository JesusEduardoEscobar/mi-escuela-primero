"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CrearPost from "./crearPost"
import EditarPerfil from "./editarPerfil"
import Solicitudes from "./solicitudes"
import { Settings, Grid, Bookmark, UserPlus, HelpCircle } from "lucide-react"
import { currentUser, getPostsByUser } from "../data"

export default function Perfil() {
  const [user, setUser] = useState(currentUser)
  const [posts, setPosts] = useState([])
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const router = useRouter()

  useEffect(() => {
    // Cargar posts del usuario actual
    const userPosts = getPostsByUser(user.id)
    setPosts(userPosts)
  }, [user.id])

  const handleCreatePost = (newPost) => {
    console.log("Nueva publicación:", newPost)

    // Crear un nuevo post con ID y fecha
    const postWithDetails = {
      id: Date.now(),
      ...newPost,
      date: new Date().toISOString(),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        image: user.image,
      },
      likes: 0,
      comments: [],
    }

    // Actualizar el estado con el nuevo post
    setPosts((prevPosts) => [postWithDetails, ...prevPosts])

    // Cerrar el modal
    setShowCreatePost(false)
  }

  // Función para guardar los cambios del perfil
  const handleSaveProfile = (updatedUser) => {
    console.log("Perfil actualizado:", updatedUser)

    // Actualizar el estado del usuario
    setUser(updatedUser)

    // En un caso real, aquí enviarías los datos al servidor

    // Cerrar el modal
    setShowEditProfile(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Cabecera del perfil */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        {/* Foto de perfil */}
        <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white shadow-md">
          <img src={user.image || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
        </div>

        {/* Información del perfil */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-xl font-semibold">{user.username}</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditProfile(true)}
                className="px-4 py-1.5 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors"
              >
                Editar perfil
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-50 transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="flex gap-6 mb-4 justify-center md:justify-start">
            <div className="text-center md:text-left">
              <span className="font-semibold">{posts.length}</span> publicaciones
            </div>
            <div className="text-center md:text-left">
              <span className="font-semibold">{user.followers}</span> seguidores
            </div>
            <div className="text-center md:text-left">
              <span className="font-semibold">{user.following}</span> seguidos
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="whitespace-pre-wrap">{user.bio}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t">
        <div className="flex justify-center flex-wrap">
          <button
            className={`px-4 py-3 flex items-center gap-2 ${activeTab === "posts" ? "border-t border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("posts")}
          >
            <Grid size={16} />
            <span>Publicaciones</span>
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 ${activeTab === "solicitudes" ? "border-t border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("solicitudes")}
          >
            <HelpCircle size={16} />
            <span>Solicitudes</span>
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 ${activeTab === "saved" ? "border-t border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark size={16} />
            <span>Guardados</span>
          </button>
          <button
            className={`px-4 py-3 flex items-center gap-2 ${activeTab === "tagged" ? "border-t border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("tagged")}
          >
            <UserPlus size={16} />
            <span>Etiquetados</span>
          </button>
        </div>
      </div>

      {/* Botón para abrir el modal */}
      <div className="fixed bottom-20 right-6">
        {activeTab === "posts" ? (
          <button
            onClick={() => setShowCreatePost(true)}
            className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            +
          </button>
        ) : null}
      </div>

      {/* Contenido según la pestaña activa */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-1 mt-4">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square cursor-pointer">
              <img src={post.image || "/placeholder.svg"} alt={post.caption} className="w-full h-full object-cover" />
            </div>
          ))}
          {posts.length === 0 && (
            <div className="col-span-3 py-12 text-center text-gray-500">No hay publicaciones aún</div>
          )}
        </div>
      )}

      {/* Pestaña de solicitudes */}
      {activeTab === "solicitudes" && (
        <div className="mt-4">
          <Solicitudes userId={user.id} userType={user.type || "regular"} />
        </div>
      )}

      {/* Modal de crear publicación */}
      {showCreatePost && <CrearPost onCreatePost={handleCreatePost} onClose={() => setShowCreatePost(false)} />}

      {/* Modal de editar perfil */}
      {showEditProfile && (
        <EditarPerfil user={user} onSave={handleSaveProfile} onClose={() => setShowEditProfile(false)} />
      )}
    </div>
  )
}

