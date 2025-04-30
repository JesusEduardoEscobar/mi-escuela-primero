"use client"

import { useState, useRef } from "react"
import { ImageIcon, X, Send } from "lucide-react"

export default function CrearPost({ onCreatePost, onClose, solicitudAtendida = null, convenios = [] }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [incluirSolicitud, setIncluirSolicitud] = useState(solicitudAtendida ? true : false)
  const [selectedConvenio, setSelectedConvenio] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMedia(file)
      setMediaPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim() && !media) {
      alert("Debes escribir algo o agregar una imagen/video")
      return
    }

    if (!selectedConvenio) {
      alert("Por favor, selecciona un convenio relacionado con esta publicación")
      return
    }

    setIsSubmitting(true)
    setError("")

    try {
      // Crear FormData para enviar datos y archivos
      const formData = new FormData()
      formData.append("content", content)
      formData.append("convenioId", selectedConvenio)

      // Añadir solicitud si está incluida
      if (incluirSolicitud && solicitudAtendida) {
        formData.append("solicitudId", solicitudAtendida.id)
      }

      // Añadir archivo si existe
      if (media) {
        formData.append("media", media)
      }

      // Enviar al servidor
      const response = await fetch("/api/crear-post", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la publicación")
      }

      // Notificar éxito
      if (typeof onCreatePost === "function") {
        onCreatePost({
          id: data.postId,
          content,
          mediaUrl: data.mediaUrl,
          solicitudAtendida: incluirSolicitud ? solicitudAtendida : null,
          convenioId: selectedConvenio,
        })
      }

      // Limpiar el formulario
      setContent("")
      setMedia(null)
      setMediaPreview(null)
      setSelectedConvenio("")

      // Cerrar el modal
      if (typeof onClose === "function") {
        onClose()
      }
    } catch (err) {
      console.error("Error al crear publicación:", err)
      setError(err.message || "No se pudo crear la publicación")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Crear publicación</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
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

          {/* Selección de convenio */}
          <div className="mb-4">
            <label htmlFor="convenio" className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar convenio: <span className="text-red-500">*</span>
            </label>
            <select
              id="convenio"
              value={selectedConvenio}
              onChange={(e) => setSelectedConvenio(e.target.value)}
              className="w-full border rounded-md py-2 px-3"
              disabled={isSubmitting}
            >
              <option value="">-- Selecciona un convenio --</option>
              {convenios.map((convenio) => (
                <option key={convenio.id} value={convenio.id}>
                  {convenio.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Solicitud atendida */}
          {solicitudAtendida && (
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={incluirSolicitud}
                  onChange={(e) => setIncluirSolicitud(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Incluir solicitud atendida</span>
              </label>
            </div>
          )}

          {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

          <div className="flex justify-between items-center">
            <div>
              <input
                type="file"
                accept="image/*,video/*,application/pdf,.doc,.docx"
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
                <span>Adjuntar archivo</span>
              </button>
            </div>

            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Publicando..."
              ) : (
                <>
                  <Send size={20} />
                  <span>Publicar</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
