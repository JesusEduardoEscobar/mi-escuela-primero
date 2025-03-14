"use client"

import { useState, useRef, useEffect } from "react"
import { LogOut, Settings, User, Edit, Shield, Bell, HelpCircle } from "lucide-react"

export default function PerfilMenu({ tipo }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const menuRef = useRef(null)

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto)
  }

  // Cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={toggleMenu} className={`${tipo === "editar" ? "btn-primary" : "btn-secondary"}`}>
        {tipo === "editar" ? "Editar perfil" : "Configuración"}
      </button>

      {menuAbierto && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border">
          {tipo === "editar" ? (
            <div className="py-1">
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Edit size={16} className="mr-2" />
                Editar información
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-2" />
                Cambiar foto
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Shield size={16} className="mr-2" />
                Privacidad
              </button>
            </div>
          ) : (
            <div className="py-1">
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-2" />
                Preferencias
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Bell size={16} className="mr-2" />
                Notificaciones
              </button>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <HelpCircle size={16} className="mr-2" />
                Ayuda
              </button>
              <hr className="my-1" />
              <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                <LogOut size={16} className="mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

