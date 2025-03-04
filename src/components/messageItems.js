export default function MessageItem({ match, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${isSelected ? "bg-pink-50" : ""}`}
    >
      <div className="relative">
        <img
          src={match.user.image || "/placeholder.svg"}
          alt={match.user.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        {match.unread && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-pink-500 rounded-full border-2 border-white"></span>
        )}
      </div>

      <div className="ml-3 flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="font-semibold truncate">{match.user.name}</h3>
          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{match.timestamp}</span>
        </div>
        <p className={`text-sm truncate ${match.unread ? "font-semibold text-gray-900" : "text-gray-500"}`}>
          {match.lastMessage}
        </p>
      </div>
    </div>
  )
}

