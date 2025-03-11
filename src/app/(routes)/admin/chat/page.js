import { ChatUserCard } from "@/components/chat-user-card"
import { usuariosChat } from "@/data/dataAdmin";
import { Search } from "lucide-react"

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat con Usuarios</h1>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>

      <div className="bg-white border rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-medium">Usuarios</h2>
        </div>
        <div className="divide-y">
          {usuariosChat.map((user) => (
            <ChatUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  )
}

