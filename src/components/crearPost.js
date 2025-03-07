"use client"

import { useState, useRef } from "react"
import { ImageIcon, X, Send } from "lucide-react"

export default function CrearPost({ onCreatePost, onClose }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
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

    setMedia(file)
    const previewUrl = URL.createObjectURL(file)
    setMediaPreview(previewUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!content.trim() && !media) {
      alert("Debes escribir algo o agregar una imagen/video")
      return
    }

    // Crear el objeto de nueva publicación
    const newPost = {
      content,
      media: mediaPreview,
      mediaType: media?.type?.startsWith("image/") ? "image" : "video",
    }

    // SOLUCIÓN: Verificar que onCreatePost existe y es una función
    if (typeof onCreatePost === "function") {
      onCreatePost(newPost)

      // Limpiar el formulario
      setContent("")
      setMedia(null)
      setMediaPreview(null)

      // Cerrar el modal si existe la función onClose
      if (typeof onClose === "function") {
        onClose()
      }
    } else {
      console.error("Error: onCreatePost no es una función o no está definida")
      alert("No se pudo crear la publicación. Por favor, intenta de nuevo.")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Crear publicación</h2>
          {typeof onClose === "function" ? (
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          ) : (
            <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué estás pensando?"
            className="w-full border rounded-lg p-3 mb-4 min-h-[100px] resize-none"
          />

          {mediaPreview && (
            <div className="relative mb-4">
              <img src={mediaPreview || "/placeholder.svg"} alt="Vista previa" className="w-full rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setMedia(null)
                  setMediaPreview(null)
                }}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
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
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <ImageIcon size={20} />
                <span>Foto/Video</span>
              </button>
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Send size={20} />
              <span>Publicar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

