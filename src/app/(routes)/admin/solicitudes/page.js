import Image from "next/image"
import Link from "next/link"
import { solicitudesRegistro } from "@/data/dataAdmin"
import { Calendar, FileText } from "lucide-react"

export default function SolicitudesPage() {
  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Solicitudes de Ingreso</h1>

      <div className="grid grid-cols-1 gap-4">
        {solicitudesRegistro.map((solicitud) => (
          <div key={solicitud.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-start">
              <Link href={`/admin/perfil/${solicitud.id}`}>
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={solicitud.imagen || "/placeholder.svg"}
                    alt={solicitud.nombre}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="ml-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/admin/perfil/${solicitud.id}`}>
                      <h3 className="font-medium text-lg hover:underline">{solicitud.nombre}</h3>
                    </Link>
                    <p className="text-sm text-gray-600">{solicitud.institucion}</p>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>Solicitud: {solicitud.fechaSolicitud}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {solicitud.tipo === "aliado" ? "Aliado" : "Escuela"}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Dirección:</span> {solicitud.direccion}
                  </div>
                  <div>
                    <span className="text-gray-500">Teléfono:</span> {solicitud.telefono}
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span> {solicitud.email}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Documentos de verificación:</h4>
                  <div className="flex flex-wrap gap-2">
                    {solicitud.documentosVerificacion.map((doc, index) => (
                      <div key={index} className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full">
                        <FileText size={14} className="mr-1" />
                        {doc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                Aprobar
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

