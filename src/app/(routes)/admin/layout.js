"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Users, ClipboardCheck, AlertTriangle, MessageSquare, School } from "lucide-react"

export default function AdminLayout({ children }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header placeholder - you'll implement this */}
      <div className="w-full h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-full flex items-center">
          <h1 className="text-xl font-bold">Panel de Administración</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">{children}</div>

      {/* Navigation bar - improved version */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-sm z-10">
        <div className="container mx-auto h-full">
          <div className="flex justify-around items-center h-full">
            <Link
              href="/admin/usuariosAliados"
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                pathname.includes("/admin/usuariosAliados")
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <Users size={24} />
              <span className="text-xs mt-1">Aliados</span>
            </Link>
            <Link
              href="/admin/usuariosEscuelas"
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                pathname.includes("/admin/usuariosEscuelas")
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <School size={24} />
              <span className="text-xs mt-1">Escuelas</span>
            </Link>
            <Link
              href="/admin/solicitudes"
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                pathname.includes("/admin/solicitudes")
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <ClipboardCheck size={24} />
              <span className="text-xs mt-1">Solicitudes</span>
            </Link>
            <Link
              href="/admin/problematicos"
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                pathname.includes("/admin/problematicos")
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <AlertTriangle size={24} />
              <span className="text-xs mt-1">Problemáticos</span>
            </Link>
            <Link
              href="/admin/chat"
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                pathname.includes("/admin/chat")
                  ? "text-blue-600 border-t-2 border-blue-600"
                  : "text-gray-600 hover:text-blue-500"
              }`}
            >
              <MessageSquare size={24} />
              <span className="text-xs mt-1">Chat</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

