"use client"

import { useState } from "react"
import { Heart, Send, ArrowLeft, MoreVertical } from "lucide-react"
import MessageItem from "./messageItems"
import Conversation from "./conversaciones"

// Sample data - you would fetch this from your API
const sampleMatches = [
  {
    id: 1,
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
      lastActive: "Just now",
    },
    lastMessage: "Hola que tal me podrias decir como es que te podemos ayudar?",
    unread: true,
    timestamp: "12:45 PM",
  }
]

// Sample conversation data
const sampleConversation = {
  user: {
    name: "Vegetta777",
    image: "/img/vegetta777.png",
    lastActive: "Just now",
  },
 messages: [
  {
    id: 1,
    text: "¡Hola!, soy Alejandro de Muebles Solidarios. Nos interesa ayudar. ¿Qué necesitan específicamente?",
    sender: "them",
    timestamp: "10:05 AM"
  },
  {
    id: 2,
    text: "Hola, somos la Escuela Primaria Benito Juárez. Estamos buscando apoyo para mejorar nuestras instalaciones. ¿Podríamos conversar?",
    sender: "me",
    timestamp: "10:00 AM"
  },
  {
    id: 3,
    text: "Actualmente, tenemos un déficit de sillas y mesas en algunas aulas. Muchos estudiantes deben compartir o usar mobiliario en mal estado.",
    sender: "me",
    timestamp: "10:10 AM"
  },
  {
    id: 4,
    text: "Entiendo. Podemos donar 30 sillas y 10 mesas. ¿Les ayudaría?",
    sender: "them",
    timestamp: "10:15 AM"
  },
  {
    id: 5,
    text: "¡Eso sería increíble! Con ese mobiliario podríamos equipar dos aulas. ¿Cómo podríamos coordinar la entrega?",
    sender: "me",
    timestamp: "10:18 AM"
  },
  {
    id: 6,
    text: "Podemos llevarlo este viernes en la mañana. ¿Hay alguien que pueda recibirlo?",
    sender: "them",
    timestamp: "10:22 AM"
  },
  {
    id: 7,
    text: "Sí, la directora y el equipo de mantenimiento estarán disponibles. ¿Necesitan algún documento para formalizar la donación?",
    sender: "me",
    timestamp: "10:25 AM"
  },
  {
    id: 8,
    text: "Solo una carta de agradecimiento sería suficiente. Queremos seguir apoyando en el futuro.",
    sender: "them",
    timestamp: "10:30 AM"
  },
  {
    id: 9,
    text: "¡Muchísimas gracias! Nos vemos el viernes. Su apoyo significa mucho para nuestros estudiantes.",
    sender: "me",
    timestamp: "10:35 AM"
  },
  {
    id: 10,
    text: "Nos alegra ayudar. ¡Nos vemos pronto!",
    sender: "them",
    timestamp: "10:40 AM"
  }
  ],
}

export default function MessagePageSimplified() {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would add the message to your data/API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // If no match is selected, show the contacts list
  if (selectedMatch === null) {
    return (
      <div className="flex flex-col h-screen bg-white">
        <div className="flex-1 overflow-y-auto">
          {sampleMatches.map((match) => (
            <MessageItem key={match.id} match={match} isSelected={false} onClick={() => setSelectedMatch(match.id)} />
          ))}
        </div>
      </div>
    )
  }

  // If a match is selected, show the conversation
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Conversation header */}
      <div className="sticky top-0 z-10 flex items-center p-3 border-b bg-white">
        <button className="p-2 mr-2 rounded-full hover:bg-gray-100" onClick={() => setSelectedMatch(null)}>
          <ArrowLeft size={20} className="text-gray-600" />
        </button>

        <img
          src={sampleConversation.user.image || "/placeholder.svg"}
          alt={sampleConversation.user.name}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="ml-3 flex-1">
          <h2 className="font-semibold">{sampleConversation.user.name}</h2>
          <p className="text-xs text-gray-500">{sampleConversation.user.lastActive}</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Heart size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Messages container */}
      <Conversation conversation={sampleConversation} />

      {/* Message input */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full p-3 pr-10 border rounded-full resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              rows="1"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className={`p-3 rounded-full ${newMessage.trim() ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-400"}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

