"use client"

import TransitionPage from '@/components/transition-page'
import { useState } from "react"
import { Heart, MoreHorizontal } from "lucide-react"
import { publicaciones, usuariosAliados, usuariosEscuelas } from "@/data/dataUsuarios"
import Link from 'next/link'

// Función para transformar los datos
const transformPosts = (publicaciones) => {
  return publicaciones.map((pub) => {
    // Busca el usuario en las listas de aliados y escuelas
    const user = [...usuariosAliados, ...usuariosEscuelas].find((u) => u.id === pub.usuarioId);

    return {
      id: pub.id,
      usuarioId: pub.usuarioId,
      image: pub.imagenes[0], // Usa la primera imagen de la lista
      caption: pub.descripcion, // Usa la descripción como caption
      likes: pub.likes,
      user: {
        name: user?.nombre || "Usuario Desconocido", // Nombre del usuario
        image: user?.imagen || "/placeholder.svg", // Imagen de perfil del usuario
        tipo: user?.tipo || "escuela", // Tipo de usuario (aliado o escuela)
      },
    };
  });
};

// Componente Post
function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <Link href={`/admin/perfil/${post.usuarioId}`} className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post.user?.image || "/placeholder.svg"}
                alt={post.user?.name || "Usuario"}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-semibold text-sm">{post.user?.name || "Usuario"}</h2>
            <p className="text-xs text-gray-500">{post.user.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
          </div>
        </Link>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Imagen del post */}
      <div>
        <img 
          src={post.image || "/placeholder.svg"} 
          alt="Post" 
          className="w-full aspect-square object-cover" 
        />
      </div>

      {/* Acciones */}
      <div className="flex justify-between p-5 pb-3">
        <div className="flex gap-5">
          <button onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-red-500" : ""}>
            <Heart className="w-7 h-7" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Likes, caption y comentarios */}
      <div className="px-5 pb-3">
        <p className="font-semibold text-base">{post.likes ? post.likes.toLocaleString() : "0"} Me gusta</p>
        <p className="text-base my-1">
          <span className="font-semibold">{post.user?.name || "Usuario"}</span> {post.caption}
        </p>
      </div>
    </div>
  );
}

export default function page() {
  const posts = transformPosts(publicaciones)
  return (
    <div className='pb-20'>
      <TransitionPage />
      <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
