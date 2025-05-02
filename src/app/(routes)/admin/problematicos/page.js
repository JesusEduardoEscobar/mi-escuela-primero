"use client"

import { useEffect, useState } from "react"
import { UserCard } from "@/components/user-card"
import toast, { Toaster } from "react-hot-toast"

export default function ProblematicosPage() {
  const [usuariosProblematicos, setUsuariosProblematicos] = useState([])

  // Obtener usuarios desde el backend
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:1984/api/admin/usuarios-strikes")
        const data = await response.json()
        setUsuariosProblematicos(data.usuarios || data) // depende de cómo lo retornes
      } catch (error) {
        console.error("Error al cargar usuarios:", error)
        toast.error("No se pudieron cargar los usuarios.")
      }
    }

    fetchUsuarios()
  }, [])

  const handleStrikeChange = async (userId, newStrikeCount) => {
    try {
      const res = await fetch(`http://localhost:1984/api/admin/actualizar-strike`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, newStrikeCount }),
      })

      if (!res.ok) throw new Error("Error al actualizar strike")

      const updatedUsers = usuariosProblematicos.map((user) =>
        user.id === userId ? { ...user, strikes: newStrikeCount } : user
      )
      setUsuariosProblematicos(updatedUsers)

      const user = updatedUsers.find((u) => u.id === userId)
      if (newStrikeCount === 3) {
        toast.error(`${user.nombre} ha alcanzado 3 strikes. Será eliminado automáticamente.`)
      } else {
        toast.success(`${user.nombre} ahora tiene ${newStrikeCount} strike(s).`)
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("No se pudo actualizar el strike.")
    }
  }

  // Agrupar usuarios por strikes
  const strike0 = usuariosProblematicos.filter((u) => !u.strikes || u.strikes === 0)
  const strike1 = usuariosProblematicos.filter((u) => u.strikes === 1)
  const strike2 = usuariosProblematicos.filter((u) => u.strikes === 2)
  const strike3 = usuariosProblematicos.filter((u) => u.strikes === 3)

  return (
    <div className="space-y-6">
      <Toaster />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios Problemáticos</h1>
        <div className="text-sm text-gray-500">Total: {usuariosProblematicos.length} usuarios</div>
      </div>

      <div className="space-y-8 pb-20">
        {[{ data: strike0, label: "Sin Strikes", color: "text-gray-600" },
          { data: strike1, label: "Strike 1", color: "text-yellow-600" },
          { data: strike2, label: "Strike 2", color: "text-orange-600" },
          { data: strike3, label: "Strike 3", color: "text-red-600" }].map(
            (grupo, i) =>
              grupo.data.length > 0 && (
                <div key={i}>
                  <h2 className={`text-lg font-medium mb-3 ${grupo.color}`}>{grupo.label}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grupo.data.map((user) => (
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
              )
          )}
      </div>
    </div>
  )
}
