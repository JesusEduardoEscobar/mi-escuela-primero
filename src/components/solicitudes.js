"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Clock, CheckCircle, AlertCircle, Save, Edit2 } from "lucide-react";
import { usuarios } from "@/data/dataUsuarios";
import { realDataUsuarios } from "@/data/realDataUsuarios";

export default function SolicitudModal({
  solicitud,
  onClose,
  onUpdateSolicitud,
}) {
  // Estados para manejar la edición del estado
  const [editandoEstado, setEditandoEstado] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState(
    solicitud ? solicitud.estado : "pendiente"
  );
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  if (!solicitud) return null;

  // Obtener información de los aliados
  const aliados = solicitud.aliados
    ? solicitud.aliados
        .map((id) => realDataUsuarios[0].find((u) => u.id === id))
        .filter(Boolean)
    : [];

  // Determinar el estado y su color/icono
  const estadoInfo = {
    "en revisión": {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertCircle size={16} className="text-red-500" />,
    },
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
  };

  // Función para manejar el cambio de estado
  const handleCambiarEstado = () => {
    setEditandoEstado(true);
  };

  // Función para guardar el nuevo estado
  const handleGuardarEstado = async () => {
    setGuardando(true);
    setMensajeExito("");

    const estadoNumerico = {
      pendiente: 1,
      "en proceso": 2,
      terminada: 3,
    }[nuevoEstado];

    console.log(
      "Estado numérico nuevo:",
      estadoNumerico,
      nuevoEstado,
      "estado",
      solicitud.estado,
      "ID",
      solicitud.id,
      "tabla",
      solicitud.TABLE
    );

    try {
      const response = await fetch(
        "http://localhost:1984/api/actualizarEstadoSolicitud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: solicitud.id,
            tabla: solicitud.TABLE,
            estado: estadoNumerico,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al actualizar estado");
      }

      // Actualiza el estado en el frontend también
      if (onUpdateSolicitud) {
        onUpdateSolicitud({
          ...solicitud,
          estado: nuevoEstado,
        });
      }

      setGuardando(false);
      setEditandoEstado(false);
      setMensajeExito("¡Estado actualizado correctamente!");

      setTimeout(() => {
        setMensajeExito("");
      }, 3000);
    } catch (error) {
      console.error("Error actualizando estado:", error);
      setGuardando(false);
      alert("No se pudo actualizar el estado.");
    }
  };

  // Función para cancelar la edición
  const handleCancelarEdicion = () => {
    setNuevoEstado(solicitud.estado);
    setEditandoEstado(false);
  };

  const { color, icon } =
    estadoInfo[solicitud.estado] || estadoInfo["pendiente"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">{solicitud.tipoApoyo}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {!editandoEstado ? (
                <>
                  <div
                    className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${color}`}
                  >
                    {icon}
                    <span>
                      {solicitud.estado === "en revisión"
                        ? "En Revisión"
                        : solicitud.estado === "pendiente"
                        ? "Pendiente"
                        : solicitud.estado === "en proceso"
                        ? "En Proceso"
                        : "Completada"}
                    </span>
                  </div>
                  {solicitud.estado !== "en revisión" && (
                    <button
                      onClick={handleCambiarEstado}
                      className="ml-2 text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm"
                    >
                      <Edit2 size={14} />
                      <span>Cambiar</span>
                    </button>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="border rounded-md px-3 py-1 text-sm"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en proceso">En proceso</option>
                    <option value="terminada">Terminada</option>
                  </select>
                  <button
                    onClick={handleGuardarEstado}
                    disabled={guardando}
                    className={`px-3 py-1 rounded-md text-sm bg-green-500 text-white hover:bg-green-600 flex items-center gap-1 ${
                      guardando ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {guardando ? (
                      <span className="inline-block animate-spin rounded-full h-3 w-3 border-t-2 border-white"></span>
                    ) : (
                      <Save size={14} />
                    )}
                    <span>{guardando ? "Guardando..." : "Guardar"}</span>
                  </button>
                  <button
                    onClick={handleCancelarEdicion}
                    className="px-3 py-1 rounded-md text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mensaje de éxito */}
          {mensajeExito && (
            <div className="mb-4 p-2 bg-green-100 text-green-800 rounded-md flex items-center gap-2">
              <CheckCircle size={16} />
              {mensajeExito}
            </div>
          )}

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
                      src={
                        aliado.imagen || "/placeholder.svg?height=40&width=40"
                      }
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
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Editar solicitud
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                  Cancelar solicitud
                </button>
              </>
            )}

            {solicitud.estado === "en proceso" && (
              <>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Ver progreso
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                  Contactar aliados
                </button>
              </>
            )}

            {solicitud.estado === "terminada" && (
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Ver reporte final
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
