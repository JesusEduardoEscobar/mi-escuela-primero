"use client"

import { useState, useRef, useEffect } from "react"
import { ImageIcon, X, Send, HelpCircle, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { getUserRole } from "../utils/UtilidadesAuth"

export default function CrearPost({ onCreatePost, onClose, solicitudAtendida = null, convenios = [] }) {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState(null) // Solo guardamos el archivo, no la vista previa
  const fileInputRef = useRef(null)
  const [incluirSolicitud, setIncluirSolicitud] = useState(solicitudAtendida ? true : false)
  const [selectedConvenio, setSelectedConvenio] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showInstructions, setShowInstructions] = useState(false)
  const [detalleConvenio, setDetalleConvenio] = useState(null)
  //const [convenios, setConvenios] = useState([]);
  const [listaConvenios, setListaConvenios] = useState([]);

  const router = useRouter()
  const userInfo = getUserRole()
  console.log("userInfo", userInfo.id)

  // 🔄 Fetch usuarios del convenio cuando cambia la selección
useEffect(() => {
  const obtenerConveniosPorAliado = async () => {
    if (!userInfo?.id) {
      setListaConvenios([]);
      return;
    }

    try {
      const res = await fetch(`http://localhost:1984/convenios-usuario/${userInfo.id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "No se pudo obtener convenios");

      console.log("Datos obtenidos:", data); // ✅ Verifica si es realmente un array

      if (Array.isArray(data)) {
        setListaConvenios(data);
      } else {
        console.error("Formato inesperado, no es un array:", data);
        setListaConvenios([data]);
      }
    } catch (err) {
      console.error("Error al obtener convenios:", err);
      setListaConvenios([]);
    }
  };

  obtenerConveniosPorAliado();
}, [userInfo.id]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setMedia(file)
    }
  }

  const handleRemoveFile = () => {
    setMedia(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
      const formData = new FormData()
      formData.append("foto", media);
      formData.append("convenioId", selectedConvenio);
      formData.append("descripcion", content);
      formData.append("usuarioId", userInfo.id);


      if (incluirSolicitud && solicitudAtendida) {
        formData.append("solicitudId", solicitudAtendida.id)
      }

      if (media) {
        formData.append("foto", media)
      }

      const res = await fetch("http://localhost:1984/crear-evidencia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData,
      });

      console.log("Respuesta sin procesar:", res); // 🔥 Verifica si es HTML
      const texto = await res.text(); // 🔥 Intenta ver la respuesta en texto
      console.log("Contenido de la respuesta:", texto);

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Error al crear la publicación")
      }

      if (typeof onCreatePost === "function") {
        onCreatePost({
          id: data.postId,
          content,
          mediaUrl: data.imagen,
          solicitudAtendida: incluirSolicitud ? solicitudAtendida : null,
          convenioId: selectedConvenio,
        })
      }

      setContent("")
      setMedia(null)
      setSelectedConvenio("")

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
  console.log("Convenios en el frontend:", listaConvenios);


  // ... (resto del código permanece igual, incluyendo InstructionsModal)
  const InstructionsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Info className="mr-2 text-blue-500" size={24} />
            Cómo crear una publicación
          </h3>
          <button onClick={() => setShowInstructions(false)} className="p-2 hover:bg-gray-100 rounded-full">
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
              Puedes adjuntar imágenes para mostrar cómo el convenio fue atendido.
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
              <p className="text-gray-600">Marca la casilla para vincular una solicitud atendida.</p>
            </div>
          )}
          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h4 className="font-medium text-lg">{solicitudAtendida ? "5" : "4"}. Publicar</h4>
            <p className="text-gray-600">Haz clic en el botón "Publicar" para compartir tu contenido.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={() => setShowInstructions(false)} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
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
              className="ml-2 text-blue-500 hover:text-blue-700 p-1 rounded-full"
              aria-label="Ver instrucciones"
              title="Ver instrucciones"
            >
              <HelpCircle size={18} />
            </button>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              router.push("/usuarios/paginaPrincipal")
            }}
            className="p-2 hover:bg-gray-100 rounded-full"
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

          {/* Mostrar solo el nombre del archivo en lugar de la vista previa */}
          {media && (
            <div className="mb-4 flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="text-sm text-gray-700 truncate max-w-xs">
                {media.name}
              </span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="convenio" className="block text-sm font-medium text-gray-700 mb-1">
              Seleccionar convenio: <span className="text-red-500">*</span>
            </label>
            <select id="convenio" value={selectedConvenio} onChange={(e) => setSelectedConvenio(e.target.value)}>
            <option value="">-- Selecciona un convenio --</option>
                {listaConvenios.map((convenio) => (
                <option key={convenio.id} value={convenio.id}>
                  {convenio.aliadoNombre || convenio.escuela.nombre || `Convenio #${convenio.id}`}
                </option>
              ))}
            </select>
          </div>

          {/* 👥 Mostrar detalle de usuarios del convenio */}
          {detalleConvenio && (
            <div className="mb-4 border p-3 rounded bg-gray-50 text-sm text-gray-700">
              <p>
                <strong>Escuela:</strong>{" "}
                <span className={detalleConvenio.creador === detalleConvenio.escuela.id ? "font-bold text-blue-600" : ""}>
                  {detalleConvenio.escuela.nombre}
                </span>
              </p>
              <p>
                <strong>Aliado:</strong>{" "}
                <span className={detalleConvenio.creador === detalleConvenio.aliado.id ? "font-bold text-blue-600" : ""}>
                  {detalleConvenio.aliado.nombre}
                </span>
              </p>
            </div>
          )}

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
              <input type="file" accept="image/*" onChange={handleMediaChange} className="hidden" ref={fileInputRef} />
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
                  e.stopPropagation()
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

      {showInstructions && <InstructionsModal />}
    </div>
  )
}