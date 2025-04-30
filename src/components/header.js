"use client"
import { useState, useRef, useEffect } from "react"
import { Settings, LogOut, UserX } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { getPageTitle } from "@/config/titulos"
import { logout, eliminarCuenta } from '@/backend/CerraryEliminar'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  // Estados para controlar el menú y los modales
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false)
  const [confirmacionVisible, setConfirmacionVisible] = useState(false)
  const [textoConfirmacion, setTextoConfirmacion] = useState("")

  // Referencia para detectar clics fuera del menú
  const menuRef = useRef(null)

  // Cerrar el menú cuando se hace clic fuera de él
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

  // Función para abrir el modal de eliminar cuenta
  const handleEliminarCuentaClick = () => {
    setModalEliminarVisible(true)
    setMenuAbierto(false)
  }

  // Función para verificar el texto de confirmación
  const handleVerificarTexto = (e) => {
    e.preventDefault()
    if (textoConfirmacion.toLowerCase() === "eliminar cuenta") {
      setModalEliminarVisible(false)
      setConfirmacionVisible(true)
    } else {
      alert("Por favor escribe 'eliminar cuenta' para continuar")
    }
  }

  // Función para eliminar la cuenta definitivamente
  const handleEliminarCuenta = async () => {
  await eliminarCuenta(router)
  setConfirmacionVisible(false)
  
};


  return (
    <header className="block top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center h-16">
          {/* Logo - fixed width */}
          <div className="flex-shrink-0 w-[200px]" onClick={() => router.push("/usuarios/paginaPrincipal")}>
            <Image
              src="/img/Mi_Escuela_Primero.png"
              width={200}
              height={10}
              alt="Mi Escuela Primero"
              className="cursor-pointer"
            />
          </div>

          {/* Title - centered with flex-grow */}
          <div className="flex-grow flex justify-center items-center">
            <h1 className="text-xl font-semibold text-gray-800 hidden md:block">{pageTitle}</h1>
          </div>

          {/* Settings - fixed width */}
          <div className="flex-shrink-0 w-[200px] flex justify-end relative" ref={menuRef}>
            <button
              onClick={() => setMenuAbierto(!menuAbierto)}
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-600 dark:text-black-300 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800"
            >
              <Settings size={24} />
            </button>

            {/* Menú desplegable */}
            {menuAbierto && (
              <div className="absolute top-12 right-0 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={handleCerrarSesion}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Cerrar sesión
                </button>
                <button
                  onClick={handleEliminarCuentaClick}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <UserX size={16} className="mr-2" />
                  Eliminar cuenta
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para eliminar cuenta */}
      {modalEliminarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar cuenta</h2>
            <p className="mb-4 text-gray-700">
              Esta acción es irreversible. Para confirmar, escribe "eliminar cuenta" en el campo de abajo.
            </p>
            <form onSubmit={handleVerificarTexto}>
              <input
                type="text"
                value={textoConfirmacion}
                onChange={(e) => setTextoConfirmacion(e.target.value)}
                placeholder="Escribe 'eliminar cuenta'"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalEliminarVisible(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Continuar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de confirmación final */}
      {confirmacionVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-red-600">¿Estás seguro?</h2>
            <p className="mb-4 text-gray-700">
              Esta acción eliminará permanentemente tu cuenta y todos tus datos. No podrás recuperarlos.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmacionVisible(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminarCuenta}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sí, eliminar mi cuenta
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
