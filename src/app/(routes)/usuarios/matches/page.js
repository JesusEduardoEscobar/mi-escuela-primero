"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Check, X, MapPin, Bell, MessageCircle } from "lucide-react"
import { usuarios } from "@/data/dataUsuarios"

// Simulamos un usuario logueado para la demo
const USUARIO_ACTUAL_ID = 1
const USUARIO_ACTUAL = usuarios.find((u) => u.id === USUARIO_ACTUAL_ID)

export default function MatchesPage() {
  const [potencialesMatches, setPotencialesMatches] = useState([])
  const [matchesActuales, setMatchesActuales] = useState([])
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([])
  const [indiceActual, setIndiceActual] = useState(0)
  const [tabActiva, setTabActiva] = useState("matches")

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

    // Simular solicitudes pendientes (en una app real, esto vendría del backend)
    // Asumimos que algunos usuarios han dado like al perfil del usuario actual
    const solicitudesPendientesSimuladas = usuarios.filter((u) => {
      // No incluir al usuario actual
      if (u.id === USUARIO_ACTUAL_ID) return false

      // No incluir usuarios que ya son matches
      if (USUARIO_ACTUAL.matches && USUARIO_ACTUAL.matches.includes(u.id)) return false

      // Simular que algunos usuarios han dado like (para demo usamos IDs pares)
      return (
        u.id % 2 === 0 &&
        ((USUARIO_ACTUAL.tipo === "escuela" && u.tipo === "aliado") ||
          (USUARIO_ACTUAL.tipo === "aliado" && u.tipo === "escuela"))
      )
    })

    setSolicitudesPendientes(solicitudesPendientesSimuladas)
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

  const handleAceptarSolicitud = (id) => {
    // En una app real, aquí enviaríamos la solicitud al backend
    // Para la demo, simplemente quitamos la solicitud y la añadimos a matches
    const solicitud = solicitudesPendientes.find((s) => s.id === id)
    if (solicitud) {
      setSolicitudesPendientes(solicitudesPendientes.filter((s) => s.id !== id))
      setMatchesActuales([...matchesActuales, solicitud])
    }
  }

  const handleRechazarSolicitud = (id) => {
    // Quitar la solicitud de la lista
    setSolicitudesPendientes(solicitudesPendientes.filter((s) => s.id !== id))
  }

  const cambiarTab = (tab) => {
    setTabActiva(tab)
  }

  const usuarioActual = potencialesMatches[indiceActual]

  return (
    <div className="max-w-2xl mx-auto mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Encuentra tu match perfecto</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sección de swipe */}
        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Descubre</h2>

          {potencialesMatches.length > 0 && indiceActual < potencialesMatches.length ? (
            <div className="relative">
              <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src={usuarioActual.imagen || "/placeholder.svg?height=400&width=400"}
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
                      {usuarioActual.apoyos?.map((apoyo, index) => (
                        <li
                          key={index}
                          className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-xs mr-2 mb-2"
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
                      {usuarioActual.necesidades?.map((necesidad, index) => (
                        <li
                          key={index}
                          className="inline-block bg-purple-500 text-white rounded-full px-3 py-1 text-xs mr-2 mb-2"
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
                  className="bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <button
                  onClick={handleAceptar}
                  className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors"
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

        {/* Sección de matches y solicitudes */}
        <div className="card bg-white p-4 rounded-lg shadow">
          {/* Tabs personalizados sin usar componentes importados */}
          <div className="mb-4">
            <div className="grid w-full grid-cols-2 rounded-md bg-gray-100 p-1">
              <button
                onClick={() => cambiarTab("matches")}
                className={`flex items-center justify-center gap-1 py-2 text-sm font-medium transition-colors ${
                  tabActiva === "matches" ? "bg-white rounded-md shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <MessageCircle size={16} />
                <span>Tus matches</span>
                {matchesActuales.length > 0 && (
                  <span className="ml-1 bg-blue-500 text-white text-xs rounded-full px-2 py-0.5">
                    {matchesActuales.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => cambiarTab("solicitudes")}
                className={`flex items-center justify-center gap-1 py-2 text-sm font-medium transition-colors ${
                  tabActiva === "solicitudes" ? "bg-white rounded-md shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <Bell size={16} />
                <span>Solicitudes</span>
                {solicitudesPendientes.length > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                    {solicitudesPendientes.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Contenido de las tabs */}
          <div>
            {/* Tab de Matches */}
            <div className={tabActiva === "matches" ? "block" : "hidden"}>
              {matchesActuales.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {matchesActuales.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={match.imagen || "/placeholder.svg?height=60&width=60"}
                        alt={match.nombre}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{match.nombre}</h3>
                        <p className="text-sm text-gray-500">{match.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
                        <div className="flex mt-1">
                          <button className="text-xs bg-blue-500 text-white rounded-full px-3 py-1 mr-2 hover:bg-blue-600 transition-colors">
                            Mensaje
                          </button>
                          <button className="text-xs bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300 transition-colors">
                            Ver perfil
                          </button>
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

            {/* Tab de Solicitudes */}
            <div className={tabActiva === "solicitudes" ? "block" : "hidden"}>
              {solicitudesPendientes.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {solicitudesPendientes.map((solicitud) => (
                    <div
                      key={solicitud.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Image
                        src={solicitud.imagen || "/placeholder.svg?height=60&width=60"}
                        alt={solicitud.nombre}
                        width={60}
                        height={60}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{solicitud.nombre}</h3>
                        <p className="text-sm text-gray-500">{solicitud.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
                        <div className="flex mt-1">
                          <button
                            onClick={() => handleAceptarSolicitud(solicitud.id)}
                            className="text-xs bg-green-500 text-white rounded-full px-3 py-1 mr-2 hover:bg-green-600 transition-colors"
                          >
                            Aceptar
                          </button>
                          <button
                            onClick={() => handleRechazarSolicitud(solicitud.id)}
                            className="text-xs bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600 transition-colors"
                          >
                            Rechazar
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">Le gustas</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No tienes solicitudes pendientes.</p>
                  <p className="text-sm text-gray-400 mt-2">¡Cuando alguien te dé like, aparecerá aquí!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
