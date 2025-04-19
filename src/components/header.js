"use client"

import Link from "next/link"
import { Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { getPageTitle } from "@/config/titulos"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  console.log("Current pathname:", pathname) // Add this for debugging
  console.log("Page title:", pageTitle) // Add this for debugging

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
          <div className="flex-shrink-0 w-[200px] flex justify-end">
            <Link
              href="/settings"
              className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 text-gray-600 dark:text-black-300 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800"
            >
              <Settings size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
