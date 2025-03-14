"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { X, Upload, Plus } from "lucide-react"

export default function EditarPerfilModal({ usuario, onClose, onSave }) {
  const [nombre, setNombre] = useState(usuario.nombre || "")
  const [correo, setCorreo] = useState(usuario.correo || "")
  const [descripcion, setDescripcion] = useState(usuario.descripcion || "")
  const [ubicacion, setUbicacion] = useState(usuario.ubicacion || "")
  const [imagen, setImagen] = useState(usuario.imagen || "/placeholder.svg")
  const [previewImagen, setPreviewImagen] = useState(null)

  // Para escuelas: necesidades, para aliados: apoyos
  const [items, setItems] = useState(usuario.tipo === "escuela" ? usuario.necesidades || [] : usuario.apoyos || [])
  const [nuevoItem, setNuevoItem] = useState("")

  const fileInputRef = useRef(null)

  const handleImagenClick = () => {
    fileInputRef.current.click()
  }

  const handleImagenChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // En una app real, aquí subiríamos la imagen a un servidor
      // Para la demo, usamos URL.createObjectURL para mostrar una vista previa
      const objectUrl = URL.createObjectURL(file)
      setPreviewImagen(objectUrl)
    }
  }

  const agregarItem = () => {
    if (nuevoItem.trim()) {
      setItems([...items, nuevoItem.trim()])
      setNuevoItem("")
    }
  }

  const eliminarItem = (index) => {
    const nuevosItems = [...items]
    nuevosItems.splice(index, 1)
    setItems(nuevosItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!nombre || !correo) {
      alert("Por favor completa los campos obligatorios")
      return
    }

    // Crear objeto con datos actualizados
    const perfilActualizado = {
      ...usuario,
      nombre,
      correo,
      descripcion,
      ubicacion,
      imagen: previewImagen || imagen,
      ...(usuario.tipo === "escuela" ? { necesidades: items } : { apoyos: items }),
    }

    onSave(perfilActualizado)
    onClose()
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
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Imagen de perfil */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer mb-2"
                onClick={handleImagenClick}
              >
                <Image
                  src={previewImagen || imagen || "/placeholder.svg"}
                  alt="Imagen de perfil"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Upload size={24} className="text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImagenChange} />
              <button type="button" className="text-sm text-primary hover:underline" onClick={handleImagenClick}>
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
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
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
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">
                  Ubicación
                </label>
                <input
                  type="text"
                  id="ubicacion"
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                  value={ubicacion}
                  onChange={(e) => setUbicacion(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows={3}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
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

            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={`Añadir ${usuario.tipo === "escuela" ? "necesidad" : "área de apoyo"}`}
                value={nuevoItem}
                onChange={(e) => setNuevoItem(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), agregarItem())}
              />
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg p-2"
                onClick={agregarItem}
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

