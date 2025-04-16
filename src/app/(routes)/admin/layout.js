"use client"
import { usePathname } from "next/navigation"
import NavbarAdmin from '@/components/navbarAdmin'

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

      <NavbarAdmin />
    </div>
  )
}

