"use client"

import { useState } from "react"
import { X } from "lucide-react"

export default function NuevaSolicitudModal({ onClose, onSubmit }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!titulo || !descripcion) {
      alert("Por favor completa todos los campos requeridos")
      return
    }

    // Crear objeto de solicitud
    const nuevaSolicitud = {
      id: Date.now(), // ID temporal
      titulo,
      descripcion,
      categoria,
      estado: "pendiente",
      aliados: [],
    }

    onSubmit(nuevaSolicitud)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Nueva solicitud</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
              Título de la solicitud *
            </label>
            <input
              type="text"
              id="titulo"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Ej: Renovación de biblioteca escolar"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción detallada *
            </label>
            <textarea
              id="descripcion"
              rows={4}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe tu necesidad, objetivos y resultados esperados..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              id="categoria"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="infraestructura">Infraestructura</option>
              <option value="material_didactico">Material didáctico</option>
              <option value="capacitacion">Capacitación</option>
              <option value="tecnologia">Tecnología</option>
              <option value="eventos">Eventos</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Crear solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

