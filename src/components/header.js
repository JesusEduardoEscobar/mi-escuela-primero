import Link from 'next/link'
import { Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo or title */}
          <div className="font-semibold text-lg">
            Mi escuela primero
          </div>
          
          {/* Settings button */}
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
