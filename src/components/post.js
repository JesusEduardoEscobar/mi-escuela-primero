"use client"

import { useState, useRef } from "react"
import { Heart, MessageCircle, Share2, MoreVertical, Trash } from "lucide-react"

export default function Post({ post, user, onDelete }) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1)
      setLiked(false)
    } else {
      setLikes(likes + 1)
      setLiked(true)
    }
  }

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
      onDelete(post.id)
    }
    setShowDropdown(false)
  }

  // Cerrar el dropdown cuando se hace clic fuera de él
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false)
    }
  }

  // Agregar/eliminar event listener para cerrar el dropdown
  useState(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showDropdown])

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-start">
        <div className="flex items-center space-x-3">
          <img
            src={user.profilePic || "/placeholder.svg"}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-xs text-gray-500">{post.date}</p>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShowDropdown(!showDropdown)} className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <button
                onClick={handleDelete}
                className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash size={16} className="mr-2" />
                Eliminar publicación
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-2">
        {post.content && <p className="mb-3">{post.content}</p>}

        {post.media &&
          (post.mediaType === "image" ? (
            <img
              src={post.media || "/placeholder.svg"}
              alt="Contenido de la publicación"
              className="w-full rounded-md"
            />
          ) : (
            <video src={post.media} controls className="w-full rounded-md" />
          ))}
      </div>

      <div className="px-4 py-2 border-t flex justify-between">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-gray-100 ${liked ? "text-red-500" : ""}`}
        >
          <Heart size={18} className={liked ? "fill-current" : ""} />
          <span>{likes > 0 ? likes : ""} Me gusta</span>
        </button>

        <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-gray-100">
          <MessageCircle size={18} />
          <span>Comentar</span>
        </button>

        <button className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-gray-100">
          <Share2 size={18} />
          <span>Compartir</span>
        </button>
      </div>
    </div>
  )
}

