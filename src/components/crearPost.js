"use client"

import { useState, useRef } from "react"
import { ImageIcon, Video, X, Send } from "lucide-react"

export default function CreatePost({ onCreatePost }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const fileType = file.type.split("/")[0]
    if (fileType !== "image" && fileType !== "video") {
      alert("Solo se permiten imágenes y videos")
      return
    }

    setMediaType(fileType)
    setMedia(file)

    // Crear URL para previsualización
    const previewUrl = URL.createObjectURL(file)
    setMediaPreview(previewUrl)
  }

  const removeMedia = () => {
    setMedia(null)
    setMediaType(null)
    setMediaPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!content.trim() && !media) {
      alert("Debes escribir algo o agregar una imagen/video")
      return
    }

    // En un caso real, aquí subirías el archivo a un servidor
    // y obtendrías la URL del archivo subido
    const newPost = {
      content,
      media: mediaPreview, // En producción, esto sería la URL del servidor
      mediaType,
    }

    onCreatePost(newPost)

    // Limpiar el formulario
    setContent("")
    removeMedia()
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="¿Qué estás pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4 min-h-[100px]"
        />

        {mediaPreview && (
          <div className="relative mb-4">
            <button
              type="button"
              onClick={removeMedia}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1"
              aria-label="Eliminar media"
            >
              <X size={16} />
            </button>

            {mediaType === "image" ? (
              <img
                src={mediaPreview || "/placeholder.svg"}
                alt="Vista previa"
                className="w-full max-h-80 object-contain rounded-md"
              />
            ) : (
              <video src={mediaPreview} controls className="w-full max-h-80 object-contain rounded-md" />
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
              ref={fileInputRef}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              <ImageIcon size={18} />
              <span>Foto</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Video size={18} />
              <span>Video</span>
            </button>
          </div>

          <button
            type="submit"
            className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Send size={18} />
            <span>Publicar</span>
          </button>
        </div>
      </form>
    </div>
  )
}

