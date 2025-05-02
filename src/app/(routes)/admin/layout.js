"use client"
import { usePathname } from "next/navigation"
import NavbarAdmin from '@/components/navbarAdmin'
import { logout } from "@/backend/CerraryEliminar"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Settings, LogOut, UserX } from "lucide-react"

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [menuAbierto, setMenuAbierto] = useState(false)
  const menuRef = useRef(null)
  const router = useRouter()
  useEffect(() => {
      function handleClickOutside(event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setMenuAbierto(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
  }, [])
  // Función para manejar el cierre de sesión
  const handleCerrarSesion = async () => {
    await logout(router)
    setMenuAbierto(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header placeholder - you'll implement this */}
      <div className="w-full h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h1 className="text-xl font-bold">Panel de Administración</h1>

          {/* Settings - fixed width */}
          <div className="relative" ref={menuRef}>
            <button
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              >
                <Settings size={24} />
             </button>
      
            {/* Menú desplegable */}
            {menuAbierto && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={handleCerrarSesion}
                  className="flex items-center w-full px-4 py-2 text-sm   text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                    Cerrar sesión
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">{children}</div>
      <NavbarAdmin />
    </div>
  )
}

