"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, X, MapPin } from "lucide-react"
import { usuarios } from "@/data/dataUsuarios"

// Simulamos un usuario logueado para la demo
const USUARIO_ACTUAL_ID = 1
const USUARIO_ACTUAL = usuarios.find((u) => u.id === USUARIO_ACTUAL_ID)

export default function MatchesPage() {
  const [potencialesMatches, setPotencialesMatches] = useState([])
  const [matchesActuales, setMatchesActuales] = useState([])
  const [indiceActual, setIndiceActual] = useState(0)

  useEffect(() => {
    // Filtrar usuarios que podrían ser matches potenciales
    // En una app real, esto vendría de un algoritmo de recomendación
    const usuariosFiltrados = usuarios.filter((u) => {
      // No mostrar al usuario actual
      if (u.id === USUARIO_ACTUAL_ID) return false

      // No mostrar usuarios que ya son matches
      if (USUARIO_ACTUAL.matches && USUARIO_ACTUAL.matches.includes(u.id)) return false

      // Mostrar aliados si el usuario actual es escuela y viceversa
      return (
        (USUARIO_ACTUAL.tipo === "escuela" && u.tipo === "aliado") ||
        (USUARIO_ACTUAL.tipo === "aliado" && u.tipo === "escuela")
      )
    })

    setPotencialesMatches(usuariosFiltrados)

    // Obtener matches actuales
    const matchesUsuario = USUARIO_ACTUAL.matches || []
    const usuariosMatches = usuarios.filter((u) => matchesUsuario.includes(u.id))
    setMatchesActuales(usuariosMatches)
  }, [])

  const handleAceptar = () => {
    // En una app real, aquí enviaríamos la solicitud al backend
    // Para la demo, simplemente pasamos al siguiente usuario
    if (indiceActual < potencialesMatches.length - 1) {
      setIndiceActual(indiceActual + 1)
    }
  }

  const handleRechazar = () => {
    // Pasar al siguiente usuario
    if (indiceActual < potencialesMatches.length - 1) {
      setIndiceActual(indiceActual + 1)
    }
  }

  const usuarioActual = potencialesMatches[indiceActual]

  return (
    <div className="max-w-2xl mx-auto mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Encuentra tu match perfecto</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sección de swipe */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Descubre</h2>

          {potencialesMatches.length > 0 ? (
            <div className="relative">
              <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src={usuarioActual.imagen || "/placeholder.svg"}
                  alt={usuarioActual.nombre}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold">{usuarioActual.nombre}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={14} className="mr-1" />
                    {usuarioActual.ubicacion}
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{usuarioActual.descripcion}</p>

                {usuarioActual.tipo === "aliado" ? (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Puede apoyar con:</h4>
                    <ul className="text-sm">
                      {usuarioActual.apoyos.map((apoyo, index) => (
                        <li
                          key={index}
                          className="inline-block bg-secondary-light text-white rounded-full px-3 py-1 text-xs mr-2 mb-2"
                        >
                          {apoyo}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Necesidades:</h4>
                    <ul className="text-sm">
                      {usuarioActual.necesidades.map((necesidad, index) => (
                        <li
                          key={index}
                          className="inline-block bg-primary-light text-white rounded-full px-3 py-1 text-xs mr-2 mb-2"
                        >
                          {necesidad}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-2 mt-1 mb-4">
                <button
                  onClick={handleRechazar}
                  className="bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600"
                >
                  <X size={24} />
                </button>
                <button
                  onClick={handleAceptar}
                  className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600"
                >
                  <Check size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No hay más perfiles disponibles por el momento.</p>
              <p className="text-sm text-gray-400 mt-2">¡Vuelve más tarde para descubrir nuevos matches!</p>
            </div>
          )}
        </div>

        {/* Sección de matches actuales */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Tus matches</h2>

          {matchesActuales.length > 0 ? (
            <div className="space-y-4">
              {matchesActuales.map((match) => (
                <div key={match.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Image
                    src={match.imagen || "/placeholder.svg"}
                    alt={match.nombre}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{match.nombre}</h3>
                    <p className="text-sm text-gray-500">{match.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
                    <div className="flex mt-1">
                      <button className="text-xs bg-primary text-white rounded-full px-3 py-1 mr-2">Mensaje</button>
                      <button className="text-xs bg-gray-200 text-gray-700 rounded-full px-3 py-1">Ver perfil</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Aún no tienes matches.</p>
              <p className="text-sm text-gray-400 mt-2">¡Explora perfiles y encuentra colaboradores!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

