"use client"

import { useState, useRef } from "react"
import { ImageIcon, X, Send, HelpCircle, FileCheck, FileText } from "lucide-react"

export default function CrearPost({ onCreatePost, onClose, solicitudAtendida = null, convenios = [] }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null)
  const [mediaPreview, setMediaPreview] = useState(null)
  const fileInputRef = useRef(null)
  const [showInstructions, setShowInstructions] = useState(false)
  const [incluirSolicitud, setIncluirSolicitud] = useState(solicitudAtendida ? true : false)
  const [selectedConvenio, setSelectedConvenio] = useState("")

  // Asegurarnos de que siempre haya algunos convenios de ejemplo si no se proporcionan
  const conveniosDisponibles =
    convenios.length > 0
      ? convenios
      : [
          {
            id: "conv1",
            nombre: "Convenio de colaboración con Editorial XYZ",
            descripcion: "Convenio para la donación de material educativo",
            fecha: "2025-01-15",
          },
          {
            id: "conv2",
            nombre: "Programa de apoyo escolar ABC",
            descripcion: "Programa de apoyo a escuelas de bajos recursos",
            fecha: "2025-02-20",
          },
          {
            id: "conv3",
            nombre: "Alianza estratégica con Fundación Educativa",
            descripcion: "Alianza para mejorar la infraestructura escolar",
            fecha: "2025-03-10",
          },
        ]

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

    // Validar si se requiere seleccionar un convenio
    if (!selectedConvenio) {
      alert("Por favor, selecciona un convenio relacionado con esta publicación")
      return
    }

    // Crear el objeto de nueva publicación
    const newPost = {
      content,
      media: mediaPreview,
      mediaType: media?.type?.startsWith("image/") ? "image" : "video",
      // Incluir información de la solicitud atendida si está activada
      solicitudAtendida: incluirSolicitud ? solicitudAtendida : null,
      // Incluir el convenio seleccionado
      convenio: selectedConvenio || null,
    }

    // Verificar que onCreatePost existe y es una función
    if (typeof onCreatePost === "function") {
      onCreatePost(newPost)

      // Limpiar el formulario
      setContent("")
      setMedia(null)
      setMediaPreview(null)
      setSelectedConvenio("")

      // Cerrar el modal si existe la función onClose
      if (typeof onClose === "function") {
        onClose()
      }
    } else {
      console.error("Error: onCreatePost no es una función o no está definida")
      alert("No se pudo crear la publicación. Por favor, intenta de nuevo.")
    }
  }

  const InstructionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Instrucciones para crear una publicación</h2>
            <button onClick={() => setShowInstructions(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>
          <div className="prose max-w-none">
            <h3>¿Cómo crear una publicación efectiva?</h3>

            <h4>1. Redacta un contenido claro</h4>
            <p>Escribe de manera clara y concisa lo que deseas comunicar. Recuerda que una buena publicación:</p>
            <ul>
              <li>Tiene un propósito definido (informar, agradecer, solicitar, etc.)</li>
              <li>Utiliza un lenguaje apropiado y respetuoso</li>
              <li>Incluye toda la información relevante</li>
            </ul>

            <h4>2. Agrega elementos visuales</h4>
            <p>Las publicaciones con imágenes o videos tienen mayor visibilidad y engagement:</p>
            <ul>
              <li>Haz clic en el botón "Foto/Video" para subir una imagen o video</li>
              <li>Asegúrate de que el contenido visual sea apropiado y relevante</li>
              <li>Puedes eliminar la imagen seleccionada haciendo clic en la X</li>
            </ul>

            <h4>3. Selecciona un convenio</h4>
            <p>Es importante asociar tu publicación con el convenio correspondiente:</p>
            <ul>
              <li>Selecciona el convenio relacionado con esta publicación del menú desplegable</li>
              <li>Esto ayuda a organizar y categorizar las publicaciones</li>
              <li>Facilita el seguimiento de actividades por convenio</li>
            </ul>

            <h4>4. Incluir evidencia de solicitud atendida</h4>
            <p>Si estás creando una publicación como evidencia de una solicitud atendida:</p>
            <ul>
              <li>Activa la casilla "Incluir solicitud atendida"</li>
              <li>La información de la solicitud se adjuntará automáticamente</li>
              <li>Esto ayuda a mantener un registro de las acciones completadas</li>
            </ul>

            <h4>5. Revisa antes de publicar</h4>
            <p>Antes de hacer clic en "Publicar", verifica:</p>
            <ul>
              <li>Que el contenido esté bien redactado y sin errores</li>
              <li>Que la imagen o video se vea correctamente</li>
              <li>Que hayas seleccionado el convenio correcto</li>
              <li>Que toda la información necesaria esté incluida</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  // Componente para mostrar la información de la solicitud atendida
  const SolicitudAtendidaPreview = () => {
    if (!solicitudAtendida || !incluirSolicitud) return null

    return (
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-2">
          <FileCheck className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-green-800">Solicitud atendida</h3>
            <p className="text-sm text-green-700">
              {solicitudAtendida.tipo || "Solicitud"} #{solicitudAtendida.id || ""}
            </p>
            {solicitudAtendida.titulo && <p className="font-medium mt-1">{solicitudAtendida.titulo}</p>}
            {solicitudAtendida.descripcion && (
              <p className="text-sm mt-1 text-gray-600">{solicitudAtendida.descripcion}</p>
            )}
            {solicitudAtendida.fecha && (
              <p className="text-xs mt-2 text-gray-500">
                Fecha: {new Date(solicitudAtendida.fecha).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Componente para mostrar el convenio seleccionado
  const ConvenioPreview = () => {
    if (!selectedConvenio) return null

    // Buscar el convenio seleccionado en la lista de convenios
    const convenio = conveniosDisponibles.find((c) => c.id === selectedConvenio || c.nombre === selectedConvenio)

    if (!convenio) return null

    return (
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <FileText className="text-blue-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h3 className="font-medium text-blue-800">Convenio seleccionado</h3>
            <p className="font-medium mt-1">{convenio.nombre || convenio.titulo || selectedConvenio}</p>
            {convenio.descripcion && <p className="text-sm mt-1 text-gray-600">{convenio.descripcion}</p>}
            {convenio.fecha && (
              <p className="text-xs mt-2 text-gray-500">Fecha: {new Date(convenio.fecha).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Crear publicación</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInstructions(true)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              title="Ver instrucciones"
            >
              <HelpCircle size={20} />
            </button>
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

          {/* Sección para seleccionar convenio - SIEMPRE VISIBLE */}
          <div className="mb-4">
            <label htmlFor="convenio" className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar convenio relacionado: <span className="text-red-500">*</span>
            </label>
            <select
              id="convenio"
              value={selectedConvenio}
              onChange={(e) => setSelectedConvenio(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">-- Selecciona un convenio --</option>
              {conveniosDisponibles.map((convenio) => (
                <option key={convenio.id || convenio.nombre} value={convenio.id || convenio.nombre}>
                  {convenio.nombre || convenio.titulo}
                </option>
              ))}
            </select>

            {selectedConvenio && <ConvenioPreview />}
          </div>

          {/* Sección para mostrar la solicitud atendida */}
          {solicitudAtendida && (
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                <input
                  type="checkbox"
                  checked={incluirSolicitud}
                  onChange={(e) => setIncluirSolicitud(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span>Incluir solicitud atendida como evidencia</span>
              </label>

              {incluirSolicitud && <SolicitudAtendidaPreview />}
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

          {/* Modales */}
          {showInstructions && <InstructionsModal />}
        </form>
      </div>
    </div>
  )
}
