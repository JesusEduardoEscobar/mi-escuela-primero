"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getUserRole } from "@/utils/UtilidadesAuth"
import { getDirectLink } from "@/utils/Links"
import { Check, X, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

const API_URL = "http://localhost:1984"

export default function MatchesPage() {
  const [potencialesMatches, setPotencialesMatches] = useState([])
  const [matchesActuales, setMatchesActuales] = useState([])
  const [indiceActual, setIndiceActual] = useState(0)
  const [usuarioActual, setUsuarioActual] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const rol = getUserRole()
      if (!rol) return

      try {
        const resUsuarios = await fetch(`${API_URL}/api/usuarios`)
        const dataUsuarios = await resUsuarios.json()

        const fetchedUsuario = dataUsuarios.find((u) => u.id === rol.id)
        if (!fetchedUsuario) return console.error("Usuario no encontrado")
        setUsuarioActual(fetchedUsuario)

        const resMatches = await fetch(`${API_URL}/api/convenios/usuario/${fetchedUsuario.id}`)
        const dataMatches = await resMatches.json()
        setMatchesActuales(dataMatches)

        const resPotenciales = await fetch(`${API_URL}/api/matches-potenciales/${fetchedUsuario.id}`)
        const posibles = await resPotenciales.json()
        setPotencialesMatches(posibles)
      } catch (error) {
        console.error("Error cargando datos:", error)
      }
    }

    fetchData()
  }, [])

  const handleAceptar = async () => {
    const match = potencialesMatches[indiceActual]
    if (!match || !usuarioActual) return

    try {
      await fetch(`${API_URL}/api/convenios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuarioActual.id,
          match_id: match.usuario.id,
          tipoUsuario: usuarioActual.tipoUsuario,
        }),
      })
      avanzarMatch()
    } catch (err) {
      console.error("Error al aceptar match:", err)
    }
  }

  const handleRechazar = () => avanzarMatch()

  const avanzarMatch = () => {
    setPotencialesMatches(prev => prev.filter((_, i) => i !== indiceActual))
    setIndiceActual(0)
  }

  const actualizarEstadoConvenio = async (convenioId, estado) => {
    if (!usuarioActual) return
    try {
      const res = await fetch(`${API_URL}/api/convenios/${convenioId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estadoProgreso: estado,
          usuarioId: usuarioActual.id,
        }),
      })
      const data = await res.json()
      console.log(data.message)
    } catch (err) {
      console.error("Error al actualizar convenio:", err)
    }
  }

  // Si el usuario es admin
  if (usuarioActual?.tipoUsuario === 3) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20 text-gray-600">
        <h1 className="text-2xl font-bold mb-4">Vista no disponible para administradores</h1>
        <p>Los administradores no pueden hacer matches. Utiliza otra cuenta para acceder a esta funcionalidad.</p>
      </div>
    )
  }

  const matchActual = potencialesMatches[indiceActual]
  const usuarioMatchActual = matchActual?.usuario
  const apoyos = matchActual?.apoyos ?? []
  const matchImage =
  usuarioMatchActual?.foto
  ? getDirectLink(usuarioMatchActual.foto)?.directLinkImage || "/file.svg"
  : "/file.svg";


  return (
    <div className="max-w-6xl mx-auto mb-20 px-4">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">Encuentra tu match perfecto</h1>
  
      <div className="grid md:grid-cols-2 gap-8">
        {/* Swipe Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Descubre</h2>
  
          {potencialesMatches.length > 0 && usuarioMatchActual ? (
            <div className="relative">
              <div className="rounded-xl overflow-hidden mb-4">
                <Image
                  src={matchImage}
                  alt={usuarioMatchActual?.nombre}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
  
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-bold text-gray-800">{usuarioMatchActual.nombre}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin size={16} className="mr-1" />
                    {usuarioMatchActual.colonia}, {usuarioMatchActual.calle}, {usuarioMatchActual.cp}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{usuarioMatchActual.descripcion}</p>
  
                {apoyos.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-gray-700">
                      {usuarioMatchActual?.tipoUsuario === 2 ? "Puede apoyar con:" : "Necesidades:"}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {apoyos.map((item, index) => (
                        <li
                          key={index}
                          className="bg-gray-500 text-white rounded-full px-3 py-1 text-xs"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
  
              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={handleRechazar}
                  className="bg-red-500 hover:bg-red-600 transition text-white rounded-full p-4 shadow-lg"
                >
                  <X size={24} />
                </button>
                <button
                  onClick={handleAceptar}
                  className="bg-green-500 hover:bg-green-600 transition text-white rounded-full p-4 shadow-lg"
                >
                  <Check size={24} />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              <p>No hay más perfiles disponibles por el momento.</p>
              <p className="text-sm mt-2 text-gray-400">¡Vuelve más tarde para descubrir nuevos matches!</p>
            </div>
          )}
        </div>
  
        {/* Right Column */}
        <div className="space-y-10">
          {/* Solicitudes */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Solicitudes recibidas</h2>
  
            {matchesActuales.filter(m => m.estadoProgreso === 0).length > 0 ? (
              <div className="space-y-4">
                {matchesActuales.filter(m => m.estadoProgreso === 0).map((match) => (
                  <div
                    key={match.convenioId}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
                  >
                    <Image
                      src={match.usuario.foto || "/file.svg"}
                      alt={match.usuario.nombre}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{match.usuario.nombre}</h3>
                      <p className="text-sm text-gray-500">{match.usuario.tipoUsuario === 1 ? "Escuela" : "Aliado"}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <button className="text-xs bg-gray-200 text-gray-800 rounded-full px-3 py-1 hover:bg-gray-300 transition">Ver perfil</button>
                        <button
                          onClick={() => actualizarEstadoConvenio(match.convenioId, 1)}
                          className="text-xs bg-green-500 text-white rounded-full px-3 py-1 hover:bg-green-600 transition"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => actualizarEstadoConvenio(match.convenioId, 2)}
                          className="text-xs bg-red-500 text-white rounded-full px-3 py-1 hover:bg-red-600 transition"
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No tienes solicitudes pendientes.</p>
              </div>
            )}
          </div>
  
          {/* Matches aceptados */}
          <div className="bg-white rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Tus matches aceptados</h2>
  
            {matchesActuales.filter(m => m.estadoProgreso === 1).length > 0 ? (
              <div className="space-y-4">
                {matchesActuales.filter(m => m.estadoProgreso === 1).map((match) => (
                  <div
                    key={match.convenioId}
                    className="flex items-center gap-4 p-4 border rounded-xl hover:bg-gray-50 transition"
                  >
                    <Image
                      src={match.usuario.foto|| "/file.svg"}
                      alt={match.usuario.nombre}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{match.usuario.nombre}</h3>
                      <p className="text-sm text-gray-500">{match.usuario.tipoUsuario === 1 ? "Escuela" : "Aliado"}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <button onClick={() => router.push(`mensajes/${match.chatId}`)}
                        className="text-xs bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-700 transition">Mensaje</button>
                        <button className="text-xs bg-gray-200 text-gray-800 rounded-full px-3 py-1 hover:bg-gray-300 transition">Ver perfil</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Aún no tienes convenios aceptados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}  

