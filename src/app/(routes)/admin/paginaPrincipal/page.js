"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { getDirectLink } from "@/utils/Links";

// Componente Post (existing)
function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <Link href={`/admin/perfil/${post.usuarioId}`} className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-semibold text-sm">{post.user?.name || "Usuario"}</h2>
              <p className="text-xs text-gray-500">{post.user.tipo}</p>
            </div>
          </div>
        </Link>
        <button className="p-1">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Imagen del post */}
      <div>
        <img 
          src={getDirectLink(post.image)?.directLinkImage || "/placeholder.svg"} 
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
        <p className="text-sm text-gray-500">{new Date(post.fecha).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default function Inicio() {
  const [evidenciaPosts, setEvidenciaPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transform evidencias to post format
  const transformEvidenciasToPosts = (evidencias) => {
    return evidencias.map((evidencia) => ({
      id: evidencia.id,
      usuarioId: evidencia.id_Convenio, // Using convenio ID for linking
      image: evidencia.foto,
      caption: evidencia.descripcion,
      likes: 0, // Default since evidencias don't have likes yet
      fecha: evidencia.fecha,
      user: {
        name: `${evidencia.nombre_aliado} & ${evidencia.institucion_escuela}`,
        image: "/placeholder.svg", // Default image
        tipo: "Evidencia de colaboración",
      },
    }));
  };

  // Fetch evidencias when component mounts
  useEffect(() => {
    const fetchEvidencias = async () => {
      try {
        const response = await fetch('http://localhost:1984/api/verEvidencias');
        
        if (!response.ok) {
          throw new Error('Error al cargar evidencias');
        }
        
        const data = await response.json();
        const transformedPosts = transformEvidenciasToPosts(data.evidencias);
        setEvidenciaPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching evidencias:', err);
        setError('No se pudieron cargar las evidencias');
      } finally {
        setLoading(false);
      }
    };

    fetchEvidencias();
  }, []);

  if (loading) return <div className="flex justify-center p-8"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Evidencias de colaboración</h1>
      
      {evidenciaPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {evidenciaPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center p-6 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No hay evidencias disponibles</p>
        </div>
      )}
    </div>
  );
}