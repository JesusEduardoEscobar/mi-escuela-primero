'use client';
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Phone,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { getDirectLink } from "@/utils/Links";
import { useState } from "react";

export function SolicitudCard({ solicitud, onUpdate }) {
  const [procesando, setProcesando] = useState(false);

  const getStatusColor = (estado) => {
    switch (estado) {
      case "terminada":
        return "bg-green-100 text-green-800 border-green-200";
      case "en revisión":
        return "bg-red-100 text-red-800 border-red-200";
      case "en proceso":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "terminada":
        return <CheckCircle size={16} className="mr-1" />;
      case "en revisión":
        return <XCircle size={16} className="mr-1" />;
      case "en proceso":
        return <Clock size={16} className="mr-1" />;
      default:
        return <Clock size={16} className="mr-1" />;
    }
  };

  const aprobarSolicitud = async () => {
    setProcesando(true);
    try {
      const res = await fetch("http://localhost:1984/api/actualizarEstadoSolicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: solicitud.id,
          tabla: solicitud.TABLE,
          estado: 1, // estado aprobado: pendiente
        }),
      });

      if (!res.ok) throw new Error("Error al aprobar");

      const data = await res.json();
      console.log("✅ Solicitud aprobada:", data);

      if (onUpdate) {
        onUpdate({ ...solicitud, estado: "pendiente" });
      }
    } catch (error) {
      console.error("❌ Error al aprobar:", error);
      alert("No se pudo aprobar la solicitud");
    } finally {
      setProcesando(false);
    }
  };

  const rechazarSolicitud = async () => {
    const confirmar = confirm("¿Estás seguro de que quieres rechazar y eliminar esta solicitud?");
    if (!confirmar) return;

    setProcesando(true);
    try {
      const res = await fetch("http://localhost:1984/api/eliminarSolicitud", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: solicitud.id,
          tabla: solicitud.TABLE,
        }),
      });

      if (!res.ok) throw new Error("Error al rechazar");

      const data = await res.json();
      console.log("🗑️ Solicitud eliminada:", data);

      if (onUpdate) {
        onUpdate(null); // Indica que se eliminó
      }
    } catch (error) {
      console.error("❌ Error al rechazar:", error);
      alert("No se pudo eliminar la solicitud");
    } finally {
      setProcesando(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <Link href={`/admin/perfil/${solicitud.id_Dueño}`}>
          <div className="relative h-14 w-14 rounded-full overflow-hidden">
            <Image
              src={
                getDirectLink(solicitud.Usuario_Imagen)?.directLinkImage ||
                "/placeholder.svg?height=40&width=40"
              }
              alt={solicitud.nombre}
              fill
              className="object-cover"
            />
          </div>
        </Link>

        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <Link href={`/admin/perfil/${solicitud.id_Dueño}`}>
                <h3 className="font-medium text-lg hover:underline">{solicitud.nombre}</h3>
              </Link>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Building size={16} className="mr-1" />
                <span>{solicitud.institucion}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Phone size={16} className="mr-1" />
                <span>{solicitud.numeroTelefono}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar size={16} className="mr-1" />
                <span>Solicitud: {new Date(solicitud.fecha).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(solicitud.estado)}`}
              >
                {getStatusIcon(solicitud.estado)}
                {solicitud.estado.charAt(0).toUpperCase() + solicitud.estado.slice(1)}
              </span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <p className="text-sm">{solicitud.descripcion}</p>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            {solicitud.estado === "en revisión" && (
              <>
                <button
                  onClick={aprobarSolicitud}
                  disabled={procesando}
                  className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                >
                  <ThumbsUp size={16} />
                  Aprobar
                </button>
                <button
                  onClick={rechazarSolicitud}
                  disabled={procesando}
                  className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
                >
                  <ThumbsDown size={16} />
                  Rechazar
                </button>
              </>
            )}
            <Link href={`/admin/chat/${solicitud.id_Dueño}`}>
              <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                Contactar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
