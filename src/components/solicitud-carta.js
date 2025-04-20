// components/solicitud-card.jsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { Calendar, Phone, Building, CheckCircle, XCircle, Clock } from 'lucide-react';

export function SolicitudCard({ solicitud }) {
  // Función para determinar el color según el estado
  const getStatusColor = (estado) => {
    switch (estado) {
      case 'aprobada':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rechazada':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  // Función para obtener el icono según el estado
  const getStatusIcon = (estado) => {
    switch (estado) {
      case 'aprobada':
        return <CheckCircle size={16} className="mr-1" />;
      case 'rechazada':
        return <XCircle size={16} className="mr-1" />;
      default:
        return <Clock size={16} className="mr-1" />;
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <Link href={`/admin/perfil/${solicitud.solicitante.id}`}>
          <div className="relative h-14 w-14 rounded-full overflow-hidden">
            <Image
              src={solicitud.solicitante.imagen || "https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ"}
              alt={solicitud.solicitante.nombre}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/admin/perfil/${solicitud.solicitante.id}`}>
                <h3 className="font-medium text-lg hover:underline">{solicitud.solicitante.nombre}</h3>
              </Link>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Building size={16} className="mr-1" />
                <span>{solicitud.solicitante.institucion}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Phone size={16} className="mr-1" />
                <span>{solicitud.solicitante.telefono}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar size={16} className="mr-1" />
                <span>Solicitud: {solicitud.fechaSolicitud}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                solicitud.solicitante.tipo === "aliado" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
              }`}>
                {solicitud.solicitante.tipo === "aliado" ? "Aliado" : "Escuela"}
              </span>
              <span className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(solicitud.estado)}`}>
                {getStatusIcon(solicitud.estado)}
                {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm">{solicitud.descripcion}</p>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <Link href={`/admin/chat/${solicitud.solicitante.id}`}>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                Contactar
              </button>
            </Link>
            {solicitud.estado === 'pendiente' && (
              <>
                <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                  Aprobar
                </button>
                <button className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                  Rechazar
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}