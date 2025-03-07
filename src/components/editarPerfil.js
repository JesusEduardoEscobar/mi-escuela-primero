"use client"

import { useState, useRef } from "react"
import { X, Camera, User, AtSign, FileText } from "lucide-react"

export default function EditarPerfil({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    bio: user?.bio || "",
  })

  const [profilePicPreview, setProfilePicPreview] = useState(user?.image || "/placeholder.svg")
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen")
      return
    }

    // En un caso real, aquí subirías la imagen a un servidor
    const previewUrl = URL.createObjectURL(file)
    setProfilePicPreview(previewUrl)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert("El nombre es obligatorio")
      return
    }

    if (!formData.username.trim()) {
      alert("El nombre de usuario es obligatorio")
      return
    }

    // Crear objeto con datos actualizados
    const updatedUser = {
      ...user,
      ...formData,
      image: profilePicPreview,
    }

    // Llamar a la función para guardar cambios
    if (typeof onSave === "function") {
      onSave(updatedUser)
    } else {
      console.error("onSave no es una función")
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Editar perfil</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-4">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={profilePicPreview || "/placeholder.svg"}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full"
                aria-label="Cambiar foto de perfil"
              >
                <Camera size={16} />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </div>
            <p
              className="text-sm text-blue-500 font-medium cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              Cambiar foto de perfil
            </p>
          </div>

          {/* Nombre */}
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <User size={16} />
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre completo"
              required
            />
          </div>

          {/* Nombre de usuario */}
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <AtSign size={16} />
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="@usuario"
              required
            />
          </div>

          {/* Biografía */}
          <div className="space-y-1">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText size={16} />
              Biografía
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Cuéntanos sobre ti..."
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

