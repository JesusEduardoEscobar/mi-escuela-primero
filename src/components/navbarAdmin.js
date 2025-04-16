"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Para obtener la ruta actual
import { itemsNavbarAdmin } from "@/data";
import MotionTransition from "@/components/transition-component";


export default function Navbar() {
  const pathname = usePathname(); // Ruta actual

  return (
    <MotionTransition position="bottom" className="fixed bottom-0 left-0 w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
          {itemsNavbarAdmin.map((item) => (
            <div key={item.id} className="relative group">
              <Link
                href={item.link}
                className={`
                  flex items-center justify-center
                  w-12 h-12
                  rounded-full
                  transition-all duration-200 ease-in-out
                  ${
                    pathname === item.link
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "text-gray-600 dark:text-gray-300 hover:bg-primary/10 dark:hover:bg-primary/20"
                  }
                `}
              >
                <span className="group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              </Link>
              {pathname === item.link && (
                <span className="absolute-bottom-1 left-1/2 w-1 h-1 bg-primary rounded-full transform mt-1 -translate-x-1/2" />
              )}
            </div>
          ))}
        </div>
      </nav>
    </MotionTransition>
  );
}
