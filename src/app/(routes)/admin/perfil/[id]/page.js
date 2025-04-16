"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usuariosAliados, usuariosEscuelas, usuariosProblematicos, solicitudesRegistro } from "@/data/dataAdmin"
import { usuarios, publicaciones } from "@/data/dataUsuarios"
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ArrowLeft,
  MessageSquare,
  Grid,
  BookOpen,
  Heart,
  MessageCircle,
} from "lucide-react"
import { StrikeManager } from "@/components/strike-manager"
import { useParams, useRouter } from "next/navigation"

export default function PerfilPage() {
  const params = useParams()
  const router = useRouter()
  const [pestanaActiva, setPestanaActiva] = useState("informacion")
  const [publicacionesUsuario, setPublicacionesUsuario] = useState([])

  // Buscar el usuario en todas las listas
  const allUsers = [...usuariosAliados, ...usuariosEscuelas, ...usuariosProblematicos, ...solicitudesRegistro]
  const user = allUsers.find((u) => u.id === params.id)

  useEffect(() => {
    if (params.id) {
      // Buscar publicaciones del usuario
      const publicacionesEncontradas = publicaciones.filter((p) => p.usuarioId === params.id)
      setPublicacionesUsuario(publicacionesEncontradas)
    }
  }, [params.id])

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Determinar si es una solicitud
  const esSolicitud = solicitudesRegistro.some((s) => s.id === params.id)

  // Determinar si es un usuario problemático y su nivel de strike
  const usuarioProblematico = usuariosProblematicos.find((u) => u.id === params.id)
  const strikes = usuarioProblematico?.strikes || 0

  // Obtener matches del usuario
  const matchesUsuario = user.matches || []
  const usuariosMatches = usuarios.filter((u) => matchesUsuario.includes(u.id))

  // Obtener solicitudes o escuelas apoyadas según el tipo de usuario
  const solicitudesOApoyos = user.tipo === "escuela" ? user.solicitudes || [] : user.escuelasApoyadas || []

  const goBack = () => {
    router.back()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <button className="p-2 mr-2 hover:bg-gray-100" onClick={goBack}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Perfil de Usuario</h1>
      </div>

      <div className="bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="relative h-24 w-24 rounded-full overflow-hidden">
              <Image src={user.imagen || "/placeholder.svg"} alt={user.nombre} fill className="object-cover" />
            </div>

            <div className="mt-4 md:mt-0 md:ml-6 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{user.nombre}</h2>
                  <div className="flex items-center mt-1 text-gray-600">
                    <Building size={18} className="mr-2" />
                    <span>{user.institucion}</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Link href={`/admin/chat/${user.id}`}>
                    <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                      <MessageSquare size={18} className="mr-2" />
                      Enviar mensaje
                    </button>
                  </Link>

                  {strikes > 0 && (
                    <div className="flex items-center">
                      <StrikeManager
                        initialStrikes={strikes}
                        userId={user.id}
                        onStrikeChange={(id, newCount) => {
                          // This would typically update the database
                          console.log(`Updated user ${id} to ${newCount} strikes`)
                        }}
                      />
                      {strikes === 3 && (
                        <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                          Suspender cuenta
                        </button>
                      )}
                    </div>
                  )}

                  {esSolicitud && (
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        Aprobar
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                        Rechazar
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {user.tipo === "escuela" || user.tipo === "aliado" ? (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {user.tipo === "escuela" && user.necesidades ? (
                      <>
                        <h3 className="text-sm font-semibold w-full">Necesidades:</h3>
                        {user.necesidades.map((necesidad, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs rounded-full px-3 py-1">
                            {necesidad}
                          </span>
                        ))}
                      </>
                    ) : user.tipo === "aliado" && user.apoyos ? (
                      <>
                        <h3 className="text-sm font-semibold w-full">Áreas de apoyo:</h3>
                        {user.apoyos.map((apoyo, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs rounded-full px-3 py-1">
                            {apoyo}
                          </span>
                        ))}
                      </>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Pestañas */}
      <div className="flex border-b mb-6">
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "informacion"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("informacion")}
        >
          <MapPin size={18} />
          Información
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "publicaciones"
              ? "border-b-2 border-blue-500 text-blue-500"
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
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("solicitudes")}
        >
          <BookOpen size={18} />
          {user.tipo === "escuela" ? "Solicitudes" : "Escuelas apoyadas"}
        </button>
        <button
          className={`flex items-center gap-1 px-4 py-2 text-sm font-medium ${
            pestanaActiva === "matches"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setPestanaActiva("matches")}
        >
          <Heart size={18} />
          Matches
        </button>
      </div>

      {/* Contenido según pestaña activa */}
      {pestanaActiva === "informacion" && (
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Phone size={18} className="mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Teléfono</p>
                <p>{user.telefono}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail size={18} className="mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
            </div>

            <div className="flex items-start col-span-1 md:col-span-2">
              <MapPin size={18} className="mr-2 mt-0.5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p>{user.direccion}</p>
              </div>
            </div>

            {user.documentosVerificacion && (
              <div className="col-span-1 md:col-span-2 mt-2">
                <p className="text-sm text-gray-500 mb-2">Documentos de verificación</p>
                <div className="flex flex-wrap gap-2">
                  {user.documentosVerificacion.map((doc, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {doc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user.fechaSolicitud && (
              <div className="flex items-start">
                <Calendar size={18} className="mr-2 mt-0.5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Fecha de solicitud</p>
                  <p>{user.fechaSolicitud}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {pestanaActiva === "publicaciones" && (
        <div>
          {publicacionesUsuario.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {publicacionesUsuario.map((post) => (
                <article key={post.id} className="bg-white border rounded-lg shadow-sm p-4">
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
                      <span className="text-sm flex items-center">
                        <Heart size={14} className="mr-1" />
                        {post.likes}
                      </span>
                      <span className="text-sm flex items-center">
                        <MessageCircle size={14} className="mr-1" />
                        {post.comentarios.length}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white border rounded-lg shadow-sm">
              <p className="text-gray-500">Este usuario aún no ha publicado nada</p>
            </div>
          )}
        </div>
      )}

      {pestanaActiva === "solicitudes" && (
        <div>
          {user.tipo === "escuela" ? (
            // Mostrar solicitudes si es una escuela
            solicitudesOApoyos.length > 0 ? (
              <div className="space-y-4">
                {solicitudesOApoyos.map((solicitud) => (
                  <div key={solicitud.id} className="bg-white border rounded-lg shadow-sm p-4">
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
                              <Link
                                key={aliadoId}
                                href={`/perfil/${aliadoId}`}
                                className="flex items-center gap-1 bg-gray-100 rounded-full pl-1 pr-3 py-1"
                              >
                                <Image
                                  src={aliado?.imagen || "/placeholder.svg"}
                                  alt={aliado?.nombre || "Aliado"}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                                <span className="text-xs">{aliado?.nombre || "Aliado"}</span>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">Esperando aliados</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white border rounded-lg shadow-sm">
                <p className="text-gray-500">No hay solicitudes activas</p>
              </div>
            )
          ) : // Mostrar escuelas apoyadas si es un aliado
          solicitudesOApoyos.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {solicitudesOApoyos.map((escuelaId) => {
                const escuela = usuarios.find((u) => u.id === escuelaId)
                return (
                  <Link
                    key={escuelaId}
                    href={`/perfil/${escuelaId}`}
                    className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={escuela?.imagen || "/placeholder.svg"}
                        alt={escuela?.nombre || "Escuela"}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h2 className="font-bold text-lg">{escuela?.nombre || "Escuela"}</h2>
                        <p className="text-sm text-gray-500 mb-1">Escuela</p>
                        <div className="flex items-center text-xs text-gray-600 mb-2">
                          <MapPin size={12} className="mr-1" />
                          {escuela?.ubicacion || "Sin ubicación"}
                        </div>
                        <p className="text-sm line-clamp-2">{escuela?.descripcion || "Sin descripción"}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-white border rounded-lg shadow-sm">
              <p className="text-gray-500">Este aliado aún no apoya a ninguna escuela</p>
            </div>
          )}
        </div>
      )}

      {pestanaActiva === "matches" && (
        <div>
          {usuariosMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {usuariosMatches.map((match) => (
                <Link
                  key={match.id}
                  href={`/perfil/${match.id}`}
                  className="bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                >
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
            <div className="text-center py-8 bg-white border rounded-lg shadow-sm">
              <p className="text-gray-500">Este usuario aún no tiene matches</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
