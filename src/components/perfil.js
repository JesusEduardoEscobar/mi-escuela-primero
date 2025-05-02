"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Mail, Grid, BookOpen, Heart, Clock, Plus, Edit } from "lucide-react"
import { usuarios, publicaciones } from "@/data/dataUsuarios"
import SolicitudModal from "@/components/solicitudes"
import NuevaSolicitudModal from "@/components/nueva-solicitud"
import EditarPerfilModal from "@/components/editar-perfil"

// Simulamos un usuario logueado para la demo
const USUARIO_ACTUAL_ID = 1
const USUARIO_INICIAL = usuarios.find((u) => u.id === USUARIO_ACTUAL_ID)

// const response = await fetch('localhost:1984/api/mostrarperfil')

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(USUARIO_INICIAL)
  const [pestanaActiva, setPestanaActiva] = useState("publicaciones")
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)
  const [mostrarNuevaSolicitud, setMostrarNuevaSolicitud] = useState(false)
  const [mostrarEditarPerfil, setMostrarEditarPerfil] = useState(false)
  const [solicitudes, setSolicitudes] = useState(usuario.solicitudes || [])

  // Obtener publicaciones del usuario
  const publicacionesUsuario = publicaciones.filter((p) => p.usuarioId === usuario.id)

  // Obtener matches del usuario
  const matchesUsuario = usuario.matches || []
  const usuariosMatches = usuarios.filter((u) => matchesUsuario.includes(u.id))

  const handleNuevaSolicitud = (nuevaSolicitud) => {
    setSolicitudes([...solicitudes, nuevaSolicitud])
  }

  const handleEditarPerfil = (perfilActualizado) => {
    setUsuario(perfilActualizado)
  }

  const handleEditarClick = () => {
    setMostrarEditarPerfil(true)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cabecera del perfil */}
      <div className="card mb-6">
        <div className="md:flex gap-6">
          <div className="mb-4 md:mb-0">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <Image
                src={usuario.imagen || "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ"}
                alt={usuario.nombre}
                fill
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
              <button
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg"
                onClick={handleEditarClick}
              >
                <Edit color="black" size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-1">{usuario.nombre}</h1>
            <p className="text-gray-500 mb-2">{usuario.tipo === "escuela" ? "Escuela" : "Aliado"}</p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-1" />
                {usuario.correo}
              </div>
            </div>

            <p className="text-sm mb-4">{usuario.descripcion}</p>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex border-b mb-6">
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "publicaciones"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("publicaciones")}
        >
          <Grid size={18} />
          Publicaciones
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "solicitudes"
              ? "border-b-2 border-primary text-primary"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("solicitudes")}
        >
          <BookOpen size={18} />
          Solicitudes
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "matches" ? "border-b-2 border-primary text-primary" : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("matches")}
        >
          <Heart size={18} />
          Matches
        </button>
      </div>

      {/* Contenido según pestaña activa */}
      {pestanaActiva === "publicaciones" && (
        <div>
          {publicacionesUsuario.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {publicacionesUsuario.map((post) => (
                <article key={post.id} className="card">
                  <h2 className="font-bold text-lg mb-2">{post.titulo}</h2>

                  <div className="relative mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={post.imagenes[0] || "/placeholder.svg"}
                      alt={post.titulo}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.descripcion}</p>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {new Date(post.fecha).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{post.likes} likes</span>
                      <span className="text-sm">{post.comentarios.length} comentarios</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <p className="text-gray-500 mb-2">Aún no has publicado nada</p>
              <Link href="/publicar" className="btn-primary">
                Crear publicación
              </Link>
            </div>
          )}
        </div>
      )}

      {pestanaActiva === "solicitudes" && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Mis solicitudes</h2>
            <button className="btn-primary flex items-center gap-1" onClick={() => setMostrarNuevaSolicitud(true)}>
              <Plus size={18} />
              Nueva solicitud
            </button>
          </div>

          {solicitudes.length > 0 ? (
            <div className="space-y-4">
              {solicitudes.map((solicitud) => (
                <div
                  key={solicitud.id}
                  className="card hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSolicitudSeleccionada(solicitud)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg">{solicitud.titulo}</h2>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        solicitud.estado === "pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : solicitud.estado === "en proceso"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {solicitud.estado === "pendiente"
                        ? "Pendiente"
                        : solicitud.estado === "en proceso"
                          ? "En proceso"
                          : "Completada"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">{solicitud.descripcion}</p>

                  {solicitud.aliados && solicitud.aliados.length > 0 ? (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Aliados participantes:</h3>
                      <div className="flex flex-wrap gap-2">
                        {solicitud.aliados.map((aliadoId) => {
                          const aliado = usuarios.find((u) => u.id === aliadoId)
                          return (
                            <div
                              key={aliadoId}
                              className="flex items-center gap-1 bg-gray-100 rounded-full pl-1 pr-3 py-1"
                            >
                              <Image
                                src={aliado.imagen || "/placeholder.svg"}
                                alt={aliado.nombre}
                                width={24}
                                height={24}
                                className="rounded-full"
                              />
                              <span className="text-xs">{aliado.nombre}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" />
                      Esperando aliados
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <p className="text-gray-500">No tienes solicitudes activas</p>
              <button className="btn-primary mt-2" onClick={() => setMostrarNuevaSolicitud(true)}>
                Crear solicitud
              </button>
            </div>
          )}
        </div>
      )}

      {pestanaActiva === "matches" && (
        <div>
          {usuariosMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {usuariosMatches.map((match) => (
                <Link key={match.id} href={`/perfil/${match.id}`} className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <Image
                      src={match.imagen || "/placeholder.svg"}
                      alt={match.nombre}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <h2 className="font-bold text-lg">{match.nombre}</h2>
                      <p className="text-sm text-gray-500 mb-1">{match.tipo === "escuela" ? "Escuela" : "Aliado"}</p>
                      <div className="flex items-center text-xs text-gray-600 mb-2">
                        <MapPin size={12} className="mr-1" />
                        {match.ubicacion}
                      </div>
                      <p className="text-sm line-clamp-2">{match.descripcion}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <p className="text-gray-500">Aún no tienes matches</p>
              <Link href="/matches" className="btn-primary mt-2">
                Explorar perfiles
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Modal de solicitud */}
      {solicitudSeleccionada && (
        <SolicitudModal solicitud={solicitudSeleccionada} onClose={() => setSolicitudSeleccionada(null)} />
      )}

      {/* Modal de nueva solicitud */}
      {mostrarNuevaSolicitud && (
        <NuevaSolicitudModal onClose={() => setMostrarNuevaSolicitud(false)} onSubmit={handleNuevaSolicitud} />
      )}

      {/* Modal de editar perfil */}
      {mostrarEditarPerfil && (
        <EditarPerfilModal
          usuario={usuario}
          onClose={() => setMostrarEditarPerfil(false)}
          onSave={handleEditarPerfil}
        />
      )}
    </div>
  )
}

