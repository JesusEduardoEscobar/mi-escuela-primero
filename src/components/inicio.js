"use client";

import { useState, useEffect } from "react";
import { Heart, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getDirectLink } from "@/utils/Links";

// Componente Post
function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="font-semibold text-sm">{post.user.name}</h2>
            <p className="text-xs text-gray-500">Evidencia de colaboración</p>
          </div>
        </div>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Imagen del post */}
      <div>
        <img
          src={
            getDirectLink(post.image)?.directLinkImage ||
            "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ"
          } //t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg"}
          alt="Post"
          className="w-full aspect-square object-cover"
        />
      </div>

      {/* Acciones */}
      <div className="flex justify-between p-5 pb-3">
        <div className="flex gap-5">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart
              className="w-7 h-7"
              fill={isLiked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Descripción */}
      <div className="px-5 pb-3">
        <p className="text-base my-1">
          <span className="font-semibold">{post.user.name}</span> {post.caption}
        </p>
      </div>
    </div>
  );
}

export default function PaginaPrincipal() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1984/api/verEvidencias")
      .then((res) => res.json())
      .then((data) => {
        const transformed = data.evidencias.map((ev) => ({
          id: ev.id,
          image: ev.foto,
          caption: ev.descripcion,
          user: {
            name: `${ev.nombre_aliado} 🤝 ${ev.institucion_escuela}`,
            image: "/placeholder.svg", // ← Opcional: si tienes imagen del aliado, ponla aquí
          },
        }));
        setPosts(transformed);
      })
      .catch((error) => {
        console.error("❌ Error al cargar evidencias:", error);
      });
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
