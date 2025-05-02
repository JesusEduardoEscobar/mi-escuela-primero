"use client"

import { useEffect, useState } from "react";
import { Heart, MoreHorizontal } from "lucide-react";
import Link from "next/link";

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5">
        <Link href={`/usuarios/perfil/${post.usuarioId}`} className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src={post.user?.imagen || "/placeholder.svg"}
                alt={post.user?.nombre || "Usuario"}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-semibold text-sm">{post.user?.nombre || "Usuario"}</h2>
            <p className="text-xs text-gray-500">{post.user.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
          </div>
        </Link>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      <div>
        <img 
          src={post.imagenes[0] || "/placeholder.svg"} 
          alt="Post" 
          className="w-full aspect-square object-cover" 
        />
      </div>

      <div className="flex justify-between p-5 pb-3">
        <div className="flex gap-5">
          <button onClick={() => setIsLiked(!isLiked)} className={isLiked ? "text-red-500" : ""}>
            <Heart className="w-7 h-7" fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="px-5 pb-3">
        <p className="font-semibold text-base">{post.likes.toLocaleString()} Me gusta</p>
        <p className="text-base my-1">
          <span className="font-semibold">{post.user?.nombre}</span> {post.descripcion}
        </p>
      </div>
    </div>
  );
}

export default function PaginaPrincipal() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1984/api/publicaciones")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error cargando publicaciones:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}