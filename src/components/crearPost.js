"use client"

import { useState, useRef } from "react"
import { ImageIcon, X, Send, HelpCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CrearPost({ onCreatePost, onClose, solicitudAtendida = null, convenios = [] }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [incluirSolicitud, setIncluirSolicitud] = useState(solicitudAtendida ? true : false)
  const [selectedConvenio, setSelectedConvenio] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showInstructions, setShowInstructions] = useState(false)

  const router = useRouter()

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

  // Modal de instrucciones
  const InstructionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Info className="mr-2 text-blue-500" size={24} />
            Cómo crear una publicación
          </h3>
          <button
            onClick={() => setShowInstructions(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Cerrar instrucciones"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-medium text-lg">1. Escribe tu contenido</h4>
            <p className="text-gray-600">Escribe el texto de tu publicación en el área de texto principal.</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-medium text-lg">2. Adjunta archivos (opcional)</h4>
            <p className="text-gray-600">
              Puedes adjuntar imágenes, te recomendamos que sean de alta calidad y se pudean ver bien las apotaciones que tuvo tu convenio.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-medium text-lg">3. Selecciona un convenio</h4>
            <p className="text-gray-600">
              Es obligatorio seleccionar un convenio relacionado con tu publicación del menú desplegable.
            </p>
          </div>

          {solicitudAtendida && (
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h4 className="font-medium text-lg">4. Incluir solicitud atendida (opcional)</h4>
              <p className="text-gray-600">
                Puedes marcar la casilla para incluir la solicitud atendida en tu publicación.
              </p>
            </div>
          )}

          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-medium text-lg">{solicitudAtendida ? "5" : "4"}. Publicar</h4>
            <p className="text-gray-600">Haz clic en el botón "Publicar" para compartir tu contenido.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowInstructions(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        // Solo cierra si se hace clic en el fondo, no en el contenido
        if (e.target === e.currentTarget && typeof onClose === "function") {
          onClose()
        }
      }}
    >
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Crear publicación</h2>
            <button
              onClick={() => setShowInstructions(true)}
              className="ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition-colors"
              aria-label="Ver instrucciones"
              title="Ver instrucciones"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation() // Evita la propagación del evento
              router.push("/usuarios/usuarios/paginaPrincipal")
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Cerrar"
          >
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
                accept="image/*"
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation() // Evita la propagación del evento
                  router.push("/usuarios/paginaPrincipal")
                  }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
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
          </div>
        </form>
      </div>

      {/* Modal de instrucciones */}
      {showInstructions && <InstructionsModal />}
    </div>
  )
}
