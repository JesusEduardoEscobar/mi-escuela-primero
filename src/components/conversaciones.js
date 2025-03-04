export default function Conversation({ conversation }) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="space-y-3">
        {conversation.messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                message.sender === "me"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              <p>{message.text}</p>
              <div className={`text-xs mt-1 ${message.sender === "me" ? "text-green-200" : "text-gray-500"}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

