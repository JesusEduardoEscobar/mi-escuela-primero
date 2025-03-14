"use client"

import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
import { usuariosChat } from "@/data/dataAdmin"
import { Send, ArrowLeft } from "lucide-react"

export default function ChatDetailPage() {
  const router = useRouter()
  const params = useParams()
  const user = usuariosChat.find((u) => u.id === params.id)

  const goBack = () => {
    router.back()
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex items-center p-4 border-b bg-white">
        <button
          className="p-2 mr-2 rounded-full hover:bg-gray-100"
          onClick={goBack}
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div className="relative h-10 w-10 rounded-full overflow-hidden">
          <Image src={user.imagen || "/placeholder.svg"} alt={user.nombre} fill className="object-cover" />
        </div>
        <div className="ml-3">
          <h2 className="font-medium">{user.nombre}</h2>
          <p className="text-sm text-gray-500">{user.institucion}</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {/* Mensajes de ejemplo */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs">Hola, ¿cómo puedo ayudarte hoy?</div>
          </div>

          <div className="flex">
            <div className="bg-white border rounded-lg py-2 px-4 max-w-xs">
              Necesito información sobre el proceso de registro.
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-blue-500 text-white rounded-lg py-2 px-4 max-w-xs">
              Claro, el proceso de registro consta de tres pasos. Primero debes completar el formulario en línea...
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 border rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white rounded-r-lg p-2 h-full">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
