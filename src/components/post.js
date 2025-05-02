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
              src={post.user?.image || '/placeholder.svg'}
              alt={post.user?.name || 'Usuario'}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-semibold text-sm">{post.user?.name || 'Usuario'}</span>
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
      </div>
    </div>
  )
}