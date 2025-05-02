"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

import { Check, X, MapPin, Bell, MessageCircle } from "lucide-react"

const API_URL = "http://localhost:1984"
const USUARIO_ACTUAL_ID = 23 // simulado

export default function MatchesPage() {
  const [potencialesMatches, setPotencialesMatches] = useState([])
  const [matchesActuales, setMatchesActuales] = useState([])
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([])
  const [indiceActual, setIndiceActual] = useState(0)
  const [usuarioActual, setUsuarioActual] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUsuarios = await fetch(`${API_URL}/api/usuarios`)
        const dataUsuarios = await resUsuarios.json()
        const fetchedUsuario = dataUsuarios.find((u) => u.id === USUARIO_ACTUAL_ID)
        if (!fetchedUsuario) return console.error("Usuario no encontrado")
        setUsuarioActual(fetchedUsuario)

        if (fetchedUsuario.tipoUsuario === 3) return // Admin no hace matches

        // Obtener matches actuales
        const resMatches = await fetch(`${API_URL}/api/convenios/usuario/${USUARIO_ACTUAL_ID}`)
        const dataMatches = await resMatches.json()
        setMatchesActuales(dataMatches)

        // Obtener posibles matches desde backend actualizado
        const resPotenciales = await fetch(`${API_URL}/api/matches-potenciales/${USUARIO_ACTUAL_ID}`)
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
    try {
      await fetch(`${API_URL}/api/convenios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: USUARIO_ACTUAL_ID,
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
    try {
      const res = await fetch(`${API_URL}/api/convenios/${convenioId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estadoProgreso: estado,
          usuarioId: USUARIO_ACTUAL_ID,
        }),
      })
      const data = await res.json()
      console.log(data.message)
    } catch (err) {
      console.error("Error al actualizar convenio:", err)
    }
  }


  if (usuarioActual?.tipoUsuario === 3) {
    return <p>No puedes hacer matches. Eres administrador.</p>
  }

  const matchActual = potencialesMatches[indiceActual];
  const usuarioMatchActual = matchActual?.usuario;
  const apoyos = matchActual?.apoyos ?? [];
  console.log("apoyos", apoyos);
  return (
    <div className="max-w-5xl mx-auto mb-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Encuentra tu match perfecto</h1>
  
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sección de swipe */}
        <div className="card bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Descubre</h2>
          {potencialesMatches.length > 0 && usuarioMatchActual ? (
            <div className="relative">
              <div className="rounded-lg overflow-hidden mb-4">
                <Image
                  src={usuarioMatchActual?.imagen || "/placeholder.svg"}
                  alt={usuarioMatchActual?.nombre}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                />
              </div>
  
              <div className="mb-4">
  <div className="flex justify-between items-center mb-1">
    <h3 className="text-lg font-bold">{usuarioMatchActual.nombre}</h3>
    <div className="flex items-center text-gray-500 text-sm">
      <MapPin size={14} className="mr-1" />
      {usuarioMatchActual.colonia}, {usuarioMatchActual.calle}, {usuarioMatchActual.cp}  
    </div>
  </div>

  <p className="text-sm text-gray-600 mb-3">{usuarioMatchActual.descripcion}</p>

  {apoyos.length > 0 && (
  <div>
    <h4 className="font-semibold text-sm mb-1">
      {usuarioMatchActual?.tipoUsuario === 2 ? "Puede apoyar con:" : "Necesidades:"}
    </h4>
    <ul className="text-sm">
  {apoyos.map((item, index) => (
    <li
      key={index}
      className={`inline-block ${
        usuarioMatchActual?.tipoUsuario === 2 ? "bg-secondary-light" : "bg-gray-400"
      } text-white rounded-full px-3 py-1 text-xs mr-2 mb-2`}
    >
      {item}
    </li>
  ))}
</ul>
  </div>
)}
</div>


  
              <div className="flex justify-center gap-2 mt-1 mb-4">
                <button onClick={handleRechazar} className="bg-red-500 text-white rounded-full p-4 shadow-lg hover:bg-red-600">
                  <X size={24} />
                </button>
                <button onClick={handleAceptar} className="bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600">
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

        {/* Columna derecha: Matches pendientes y aceptados */}
        <div className="space-y-10">
          {/* Sección de matches pendientes por aceptar */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Solicitudes recibidas</h2>
  
            {matchesActuales.filter(m => m.estadoProgreso === 0).length > 0 ? (
              <div className="space-y-4">
                {matchesActuales.filter(m => m.estadoProgreso === 0).map((match) => (
                  <div key={match.convenioId} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Image
                      src={match.usuario.imagen || "/placeholder.svg"}
                      alt={match.usuario.nombre}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{match.usuario.nombre}</h3>
                      <p className="text-sm text-gray-500">{match.usuario.tipoUsuario === 1 ? "Escuela" : "Aliado"}</p>
                      <div className="flex mt-1">
                        <button className="text-xs bg-primary text-white rounded-full px-3 py-1 mr-2">Mensaje</button>
                        <button className="text-xs bg-gray-200 text-gray-700 rounded-full px-3 py-1">Ver perfil</button>
                        <button
                          className="ml-2 text-xs bg-green-500 text-white rounded-full px-3 py-1"
                          onClick={() => actualizarEstadoConvenio(match.convenioId, 1)}
                        >
                          Aceptar
                        </button>
                        <button
                          className="ml-1 text-xs bg-red-500 text-white rounded-full px-3 py-1"
                          onClick={() => actualizarEstadoConvenio(match.convenioId, 2)}
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No tienes solicitudes pendientes.</p>
              </div>
            )}
          </div>
  
          {/* Sección de matches aceptados */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Tus matches aceptados</h2>
  
            {matchesActuales.filter(m => m.estadoProgreso === 1).length > 0 ? (
              <div className="space-y-4">
                {matchesActuales.filter(m => m.estadoProgreso === 1).map((match) => (
                  <div key={match.convenioId} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <Image
                      src={match.usuario.imagen || "/placeholder.svg"}
                      alt={match.usuario.nombre}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{match.usuario.nombre}</h3>
                      <p className="text-sm text-gray-500">{match.usuario.tipoUsuario === 1 ? "Escuela" : "Aliado"}</p>
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
                <p className="text-gray-500">Aún no tienes convenios aceptados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}  

