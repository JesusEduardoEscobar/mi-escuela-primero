"use client"

import Link from 'next/link'
import { Settings } from 'lucide-react'
import { useRouter } from "next/navigation"
import Image from 'next/image'

export default function Header() {
  const router = useRouter()
  return (
    <header className="block top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo or title */}
          <div className="container mx-auto px-2 py-2" 
          onClick={() => router.push("/usuarios/paginaPrincipal")}>
            <Image 
              src="/img/Mi_Escuela_Primero.png" 
              width={200} 
              height={10} 
              alt="Mi Escuela Primero"
            />
          </div>
          
          <Link
            href="/settings"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-600 dark:text-black-300 hover:bg-gray-100 hover:text-white dark:hover:bg-gray-800"
          >
            <Settings size={24} />
          </Link>
        </div>
      </div>
    </header>
  )
}
