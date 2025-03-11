"use client"

import { useState } from "react"
import { UserCard } from "@/components/user-card"
import { usuariosProblematicos as initialUsuariosProblematicos } from "@/data/dataAdmin"
import { Toaster } from 'react-hot-toast';

export default function ProblematicosPage() {
  const [usuariosProblematicos, setUsuariosProblematicos] = useState(initialUsuariosProblematicos)

  // Agrupar usuarios por número de strikes
  const strike1 = usuariosProblematicos.filter((user) => user.strikes === 1)
  const strike2 = usuariosProblematicos.filter((user) => user.strikes === 2)
  const strike3 = usuariosProblematicos.filter((user) => user.strikes === 3)
  const strike0 = usuariosProblematicos.filter((user) => !user.strikes || user.strikes === 0)

  const handleStrikeChange = (userId, newStrikeCount) => {
    // Update the user's strike count
    const updatedUsers = usuariosProblematicos.map((user) => {
      if (user.id === userId) {
        return { ...user, strikes: newStrikeCount }
      }
      return user
    })

    setUsuariosProblematicos(updatedUsers)

    // Show a toast notification
    const user = usuariosProblematicos.find((u) => u.id === userId)
    if (user) {
      if (newStrikeCount === 3) {
        Toaster({
          title: "Strike máximo alcanzado",
          description: `${user.nombre} ha alcanzado el máximo de 3 strikes. Se recomienda tomar acción.`,
          variant: "destructive",
        })
      } else {
        Toaster({
          title: "Strike actualizado",
          description: `${user.nombre} ahora tiene ${newStrikeCount} ${newStrikeCount === 1 ? "strike" : "strikes"}.`,
          variant: newStrikeCount === 0 ? "default" : "warning",
        })
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios Problemáticos</h1>
        <div className="text-sm text-gray-500">Total: {usuariosProblematicos.length} usuarios</div>
      </div>

      <div className="space-y-8">
        {strike0.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3 text-gray-600">Sin Strikes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strike0.map((user) => (
                <UserCard key={user.id} user={user} enableStrikeManagement onStrikeChange={handleStrikeChange} />
              ))}
            </div>
          </div>
        )}

        {strike1.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3 text-yellow-600">Strike 1</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strike1.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  showStrikes
                  enableStrikeManagement
                  onStrikeChange={handleStrikeChange}
                />
              ))}
            </div>
          </div>
        )}

        {strike2.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3 text-orange-600">Strike 2</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strike2.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  showStrikes
                  enableStrikeManagement
                  onStrikeChange={handleStrikeChange}
                />
              ))}
            </div>
          </div>
        )}

        {strike3.length > 0 && (
          <div>
            <h2 className="text-lg font-medium mb-3 text-red-600">Strike 3</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {strike3.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  showStrikes
                  enableStrikeManagement
                  onStrikeChange={handleStrikeChange}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

