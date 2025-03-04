"use client"

import { useState } from "react"
import { MoreHorizontal, Heart, MessageCircle, Send } from "lucide-react"

export default function PostMensaje({ post }) {
  const [isOpen, setIsOpen] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <div className="border rounded-lg bg-white shadow-sm mb-4 overflow-hidden">
      {/* Post header with user info */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.user.image || "/placeholder.svg"}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Post content/image */}
      {post.image && (
        <div className="aspect-square">
          <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Post text */}
      {post.text && (
        <div className="p-4">
          <p className="text-gray-800">{post.text}</p>
        </div>
      )}

      {/* Post actions */}
      <div className="flex items-center p-3 border-t">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 p-2 rounded-full ${liked ? "text-pink-600" : "text-gray-600"} hover:bg-gray-100`}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
          <span>{post.likes || 0}</span>
        </button>
        <button className="flex items-center gap-1 p-2 rounded-full text-gray-600 hover:bg-gray-100 ml-2">
          <MessageCircle size={20} />
          <span>{post.comments || 0}</span>
        </button>
        <button className="flex items-center gap-1 p-2 rounded-full text-gray-600 hover:bg-gray-100 ml-2">
          <Send size={20} />
        </button>
      </div>
    </div>
  )
}

