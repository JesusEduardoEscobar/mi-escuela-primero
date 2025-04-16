"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { MapPin, Mail, Grid, BookOpen, Heart, MessageCircle } from "lucide-react"
import { usuarios, publicaciones } from "@/data/dataUsuarios"

export default function PerfilUsuarioPage() {
  const params = useParams()
  const [usuario, setUsuario] = useState(null)
  const [pestanaActiva, setPestanaActiva] = useState("publicaciones")
  const [publicacionesUsuario, setPublicacionesUsuario] = useState([])

  useEffect(() => {
    if (params.id) {
      // Convertir a número si viene como string
      const usuarioId = Number.parseInt(params.id, 10)

      // Buscar el usuario
      const usuarioEncontrado = usuarios.find((u) => u.id === usuarioId)
      setUsuario(usuarioEncontrado)

      // Buscar publicaciones del usuario
      const publicacionesEncontradas = publicaciones.filter((p) => p.usuarioId === usuarioId)
      setPublicacionesUsuario(publicacionesEncontradas)
    }
  }, [params.id])

  if (!usuario) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    )
  }

  // Obtener solicitudes o escuelas apoyadas según el tipo de usuario
  const solicitudesOApoyos = usuario.tipo === "escuela" ? usuario.solicitudes || [] : usuario.escuelasApoyadas || []

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cabecera del perfil */}
      <div className="card mb-6">
        <div className="md:flex gap-6">
          <div className="mb-4 md:mb-0">
            <div className="relative w-32 h-32 mx-auto md:mx-0">
              <Image
                src={usuario.imagen || "/placeholder.svg"}
                alt={usuario.nombre}
                fill
                className="rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold mb-1">{usuario.nombre}</h1>
            <p className="text-gray-500 mb-2">{usuario.tipo === "escuela" ? "Escuela" : "Aliado"}</p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin size={16} className="mr-1" />
                {usuario.ubicacion}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={16} className="mr-1" />
                {usuario.correo}
              </div>
            </div>

            <p className="text-sm mb-4">{usuario.descripcion}</p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {usuario.tipo === "escuela" ? (
                <>
                  <h3 className="text-sm font-semibold w-full">Necesidades:</h3>
                  {usuario.necesidades.map((necesidad, index) => (
                    <span key={index} className="bg-primary-light text-white text-xs rounded-full px-3 py-1">
                      {necesidad}
                    </span>
                  ))}
                </>
              ) : (
                <>
                  <h3 className="text-sm font-semibold w-full">Áreas de apoyo:</h3>
                  {usuario.apoyos.map((apoyo, index) => (
                    <span key={index} className="bg-secondary-light text-white text-xs rounded-full px-3 py-1">
                      {apoyo}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex md:flex-col gap-4 justify-center">
            {/* <button className="btn-primary">Enviar mensaje</button>
            <button className="btn-secondary">Solicitar apoyo</button> */}
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
          {usuario.tipo === "escuela" ? "Solicitudes" : "Escuelas apoyadas"}
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
                      <span className="text-sm flex items-center">
                        <Heart size={14} className="mr-1" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <p className="text-gray-500">Este usuario aún no ha publicado nada</p>
            </div>
          )}
        </div>
      )}

      {pestanaActiva === "solicitudes" && (
        <div>
          {usuario.tipo === "escuela" ? (
            // Mostrar solicitudes si es una escuela
            solicitudesOApoyos.length > 0 ? (
              <div className="space-y-4">
                {solicitudesOApoyos.map((solicitud) => (
                  <div key={solicitud.id} className="card">
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
                                  src={aliado.imagen || "/placeholder.svg"}
                                  alt={aliado.nombre}
                                  width={24}
                                  height={24}
                                  className="rounded-full"
                                />
                                <span className="text-xs">{aliado.nombre}</span>
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
              <div className="text-center py-8 card">
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
                    className="card hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <Image
                        src={escuela.imagen || "/placeholder.svg"}
                        alt={escuela.nombre}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h2 className="font-bold text-lg">{escuela.nombre}</h2>
                        <p className="text-sm text-gray-500 mb-1">Escuela</p>
                        <div className="flex items-center text-xs text-gray-600 mb-2">
                          <MapPin size={12} className="mr-1" />
                          {escuela.ubicacion}
                        </div>
                        <p className="text-sm line-clamp-2">{escuela.descripcion}</p>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 card">
              <p className="text-gray-500">Este aliado aún no apoya a ninguna escuela</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

