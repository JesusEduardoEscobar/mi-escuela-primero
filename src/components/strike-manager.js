"use client"

import { useState } from "react"
import { AlertTriangle, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function StrikeManager({ initialStrikes = 0, userId, onStrikeChange }) {
  const [strikes, setStrikes] = useState(initialStrikes)
  const [isUpdating, setIsUpdating] = useState(false)

  const getStrikeColor = (count) => {
    if (count === 0) return "bg-gray-100 text-gray-700"
    if (count === 1) return "bg-yellow-100 text-yellow-700 border-yellow-300"
    if (count === 2) return "bg-orange-100 text-orange-700 border-orange-300"
    if (count === 3) return "bg-red-100 text-red-700 border-red-300"
    return ""
  }

  const handleIncreaseStrike = () => {
    if (strikes < 3) {
      setIsUpdating(true)
      const newCount = strikes + 1
      setStrikes(newCount)

      // Simulate API call
      setTimeout(() => {
        setIsUpdating(false)
        if (onStrikeChange) {
          onStrikeChange(userId, newCount)
        }
      }, 500)
    }
  }

  const handleDecreaseStrike = () => {
    if (strikes > 0) {
      setIsUpdating(true)
      const newCount = strikes - 1
      setStrikes(newCount)

      // Simulate API call
      setTimeout(() => {
        setIsUpdating(false)
        if (onStrikeChange) {
          onStrikeChange(userId, newCount)
        }
      }, 500)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div
        className={cn(
          "flex items-center px-3 py-1 rounded-full border transition-colors",
          getStrikeColor(strikes),
          isUpdating && "opacity-70",
        )}
      >
        <AlertTriangle size={16} className="mr-1" />
        <span className="font-medium">{strikes === 0 ? "Sin strikes" : `Strike ${strikes}`}</span>
      </div>

      <div className="flex flex-col">
        <button
          onClick={handleIncreaseStrike}
          disabled={strikes >= 3 || isUpdating}
          className={cn(
            "p-1 rounded hover:bg-gray-100 transition-colors",
            (strikes >= 3 || isUpdating) && "opacity-50 cursor-not-allowed",
          )}
          title="Aumentar strike"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={handleDecreaseStrike}
          disabled={strikes <= 0 || isUpdating}
          className={cn(
            "p-1 rounded hover:bg-gray-100 transition-colors",
            (strikes <= 0 || isUpdating) && "opacity-50 cursor-not-allowed",
          )}
          title="Disminuir strike"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  )
}