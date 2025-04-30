"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload } from "lucide-react"

export default function EditarPerfilModal({ usuario, onClose, onSave }) {
  const [nombre, setNombre] = useState(usuario.nombre || "")
  const [correo, setCorreo] = useState(usuario.correo || "")
  const [imagen, setImagen] = useState(usuario.imagen || "/placeholder.svg")
  const [previewImagen, setPreviewImagen] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Para escuelas: necesidades, para aliados: apoyos
  const [items, setItems] = useState(usuario.tipo === "escuela" ? usuario.necesidades || [] : usuario.apoyos || [])

  const fileInputRef = useRef(null)
  const selectedFileRef = useRef(null)

  const handleImagenClick = () => {
    fileInputRef.current.click()
  }

  const handleImagenChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Guardar referencia al archivo para subirlo después
      selectedFileRef.current = file

      // Crear vista previa
      const objectUrl = URL.createObjectURL(file)
      setPreviewImagen(objectUrl)
    }
  }

  const eliminarItem = (index) => {
    const nuevosItems = [...items]
    nuevosItems.splice(index, 1)
    setItems(nuevosItems)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      if (!nombre || !correo) {
        throw new Error("Por favor completa los campos obligatorios")
      }

      // Crear FormData para enviar al servidor
      const formData = new FormData()
      formData.append("userId", usuario.id)
      formData.append("nombre", nombre)
      formData.append("correo", correo)

      // Añadir imagen si se seleccionó una nueva
      if (selectedFileRef.current) {
        formData.append("imagen", selectedFileRef.current)
      }

      // Enviar datos al servidor
      const response = await fetch("/api/usuarios/actualizar-perfil", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al actualizar el perfil")
      }

      const data = await response.json()

      // Actualizar el estado local con los datos actualizados
      const perfilActualizado = {
        ...usuario,
        nombre,
        correo,
        imagen: data.usuario.imagen || imagen,
        ...(usuario.tipo === "escuela" ? { necesidades: items } : { apoyos: items }),
      }

      // Llamar a la función onSave con los datos actualizados
      onSave(perfilActualizado)
      onClose()
    } catch (error) {
      console.error("Error al actualizar el perfil:", error)
      setError(error.message || "Error al actualizar el perfil")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Editar perfil</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Imagen de perfil */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer mb-2"
                onClick={handleImagenClick}
              >
                <Image
                  src={previewImagen || imagen || "/placeholder.svg?height=128&width=128"}
                  alt="Imagen de perfil"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Upload size={24} className="text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImagenChange} />
              <button type="button" className="text-sm text-blue-600 hover:underline" onClick={handleImagenClick}>
                Cambiar foto
              </button>
            </div>

            {/* Datos básicos */}
            <div className="flex-1 grid gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="correo"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Necesidades o Apoyos */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {usuario.tipo === "escuela" ? "Necesidades" : "Áreas de apoyo"}
            </label>

            <div className="flex flex-wrap gap-2 mb-2">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1 bg-gray-100 rounded-full pl-3 pr-2 py-1">
                  <span className="text-sm">{item}</span>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-red-500"
                    onClick={() => eliminarItem(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Guardando...
                </span>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
