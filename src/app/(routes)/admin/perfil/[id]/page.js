"use client"

import Image from "next/image"
import Link from "next/link"
import { usuariosAliados, usuariosEscuelas, usuariosProblematicos, solicitudesRegistro } from "@/data/dataAdmin";
import { Building, Phone, Mail, MapPin, Calendar, ArrowLeft, MessageSquare } from "lucide-react"
import { StrikeManager } from "@/components/strike-manager"
import { useParams, useRouter } from "next/navigation";

export default function PerfilPage() {
  const params = useParams()
  const router = useRouter()
  // Buscar el usuario en todas las listas
  const allUsers = [...usuariosAliados, ...usuariosEscuelas, ...usuariosProblematicos, ...solicitudesRegistro]

  const user = allUsers.find((u) => u.id === params.id)

  if (!user) {
    return <div>Usuario no encontrado</div>
  }

  // Determinar si es una solicitud
  const esSolicitud = solicitudesRegistro.some((s) => s.id === params.id)

  // Determinar si es un usuario problemático y su nivel de strike
  const usuarioProblematico = usuariosProblematicos.find((u) => u.id === params.id)
  const strikes = usuarioProblematico?.strikes || 0

  const goBack = () => {
      router.back()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <button
          className="p-2 mr-2 hover:bg-gray-100"
          onClick={goBack}
        >
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

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}