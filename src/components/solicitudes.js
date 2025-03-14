"use client"
import Image from "next/image"
import Link from "next/link"
import { X, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { usuarios } from "@/data/dataUsuarios"

export default function SolicitudModal({ solicitud, onClose }) {
  if (!solicitud) return null

  // Obtener información de los aliados
  const aliados = solicitud.aliados
    ? solicitud.aliados.map((id) => usuarios.find((u) => u.id === id)).filter(Boolean)
    : []

  // Determinar el estado y su color/icono
  const estadoInfo = {
    pendiente: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <AlertCircle size={16} className="text-yellow-500" />,
    },
    "en proceso": {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <Clock size={16} className="text-blue-500" />,
    },
    terminada: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle size={16} className="text-green-500" />,
    },
  }

  const { color, icon } = estadoInfo[solicitud.estado] || estadoInfo["pendiente"]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{solicitud.titulo}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${color}`}>
              {icon}
              <span>
                {solicitud.estado === "pendiente"
                  ? "Pendiente"
                  : solicitud.estado === "en proceso"
                    ? "En proceso"
                    : "Completada"}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700">{solicitud.descripcion}</p>
          </div>

          {aliados.length > 0 ? (
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Aliados participantes</h3>
              <div className="space-y-2">
                {aliados.map((aliado) => (
                  <Link
                    key={aliado.id}
                    href={`/perfil/${aliado.id}`}
                    className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Image
                      src={aliado.imagen || "/placeholder.svg"}
                      alt={aliado.nombre}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{aliado.nombre}</p>
                      <p className="text-sm text-gray-500">{aliado.correo}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg text-center">
              <p className="text-gray-500 flex items-center justify-center gap-2">
                <Clock size={18} />
                Esperando aliados para este proyecto
              </p>
            </div>
          )}

          {/* Acciones según el estado */}
          <div className="flex flex-wrap gap-2 mt-6">
            {solicitud.estado === "pendiente" && (
              <>
                <button className="btn-primary">Editar solicitud</button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Cancelar solicitud
                </button>
              </>
            )}

            {solicitud.estado === "en proceso" && (
              <>
                <button className="btn-primary">Ver progreso</button>
                <button className="btn-secondary">Contactar aliados</button>
              </>
            )}

            {solicitud.estado === "terminada" && <button className="btn-primary">Ver reporte final</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

