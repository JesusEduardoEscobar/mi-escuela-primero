"use client"

import { useState } from "react"
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"

export default function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [comment, setComment] = useState("")

  return (
    <div className="border rounded-lg bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={post.user.image}
              alt={post.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm">{post.user.name}</span>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5" />
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

      {/* Acciones y comentarios */}
      <div className="p-4 space-y-3">
        {/* Botones de acción */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-2 rounded-full hover:bg-gray-100 ${isLiked ? "text-red-500" : ""}`}
            >
              <Heart className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full hover:bg-gray-100 ${isSaved ? "text-black" : ""}`}
          >
            <Bookmark className="w-6 h-6" fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Cantidad de likes y descripción */}
        <div className="space-y-1">
          <p className="font-semibold text-sm">{post.likes.toLocaleString()} Me gusta</p>
          <p className="text-sm">
            <span className="font-semibold">{post.user.name}</span> {post.caption}
          </p>
          {post.comments.map((comment, i) => (
            <p key={i} className="text-sm text-gray-500">
              <span className="font-semibold text-black">{comment.user}</span> {comment.text}
            </p>
          ))}
        </div>

        {/* Input para comentar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Agrega un comentario..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => {
              if (comment.trim()) {
                // Aquí puedes manejar el envío del comentario
                setComment("")
              }
            }}
            className="text-blue-500 font-semibold hover:text-blue-600"
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
  )
}