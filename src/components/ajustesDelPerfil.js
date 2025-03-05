"use client"

import { useState, useRef } from "react"
import { X, Camera } from "lucide-react"

export default function ProfileSettings({ user, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    profilePic: user.profilePic,
    coverPic: user.coverPic,
  })

  const [profilePreview, setProfilePreview] = useState(user.profilePic)
  const [coverPreview, setCoverPreview] = useState(user.coverPic)

  const profileInputRef = useRef(null)
  const coverInputRef = useRef(null)

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
    setProfilePreview(previewUrl)
    setFormData((prev) => ({ ...prev, profilePic: previewUrl }))
  }

  const handleCoverPicChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen")
      return
    }

    // En un caso real, aquí subirías la imagen a un servidor
    const previewUrl = URL.createObjectURL(file)
    setCoverPreview(previewUrl)
    setFormData((prev) => ({ ...prev, coverPic: previewUrl }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Editar perfil</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Imagen de portada */}
          <div className="relative h-32 bg-gray-200 rounded-md overflow-hidden mb-8">
            <img src={coverPreview || "/placeholder.svg"} alt="Portada" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => coverInputRef.current?.click()}
              className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              aria-label="Cambiar portada"
            >
              <Camera size={18} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              onChange={handleCoverPicChange}
              className="hidden"
            />
          </div>

          {/* Foto de perfil */}
          <div className="relative w-24 h-24 mx-auto -mt-20 mb-4">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
              <img
                src={profilePreview || "/placeholder.svg"}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => profileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full"
              aria-label="Cambiar foto de perfil"
            >
              <Camera size={16} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={profileInputRef}
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biografía
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

