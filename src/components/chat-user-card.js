"use client"

import { useRouter } from "next/navigation"

export function ChatUserCard({ chat }) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/admin/chat/${chat.idChat}`)
  }

  return (
    <div onClick={handleClick} className="cursor-pointer p-4 border rounded hover:bg-gray-100">
      <p className="font-medium text-gray-800">
        Conversación entre {chat.nombreUsuario1} y {chat.nombreUsuario2}
      </p>
    </div>
  )
}
