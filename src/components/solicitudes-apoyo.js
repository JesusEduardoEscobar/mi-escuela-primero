// app/admin/solicitudes-apoyo-ayuda/page.jsx
"use client";

import { useState, useEffect } from "react";
import { SolicitudCard } from "@/components/solicitud-carta";
import { solicitudesApoyo, solicitudesAyuda } from "@/data/dataAdmin";
import { Search, X, Filter } from "lucide-react";

export default function SolicitudesApoyoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [showFilters, setShowFilters] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    async function cargarSolicitudes() {
      try {
        const res = await fetch("http://localhost:1984/api/todasSolicitudes");
        const data = await res.json();
        setSolicitudes(data.escuelas);
      } catch (error) {
        console.error("Error al cargar solicitudes del servidor:", error);
      }
    }

    cargarSolicitudes();
  }, []);

  const solicitudesFiltradas = solicitudes.filter((solicitud) => {
    const matchesSearch = solicitud.tipoApoyo
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEstado =
      filtroEstado === "todos" || solicitud.estado === filtroEstado;
    return matchesSearch && matchesEstado;
  });

  console.log(solicitudesFiltradas);

  // Filtrar solicitudes de apoyo
  const apoyoFiltradas = solicitudesApoyo.filter((solicitud) => {
    // Filtrar por término de búsqueda
    const matchesSearch =
      solicitud.solicitante.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      solicitud.solicitante.institucion
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      solicitud.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtrar por estado
    const matchesEstado =
      filtroEstado === "todos" || solicitud.estado === filtroEstado;

    return matchesSearch && matchesEstado;
  });

  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Solicitudes de Apoyo</h1>

      {/* Barra de búsqueda y filtros */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, institución o descripción..."
              className="pl-10 pr-10 py-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <Filter size={18} className="mr-2" />
            Filtros
          </button>
        </div>

        {/* Filtros expandibles */}
        {showFilters && (
          <div className="mt-3 pt-3 border-t">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium mr-2">Estado:</span>
              <button
                onClick={() => setFiltroEstado("todos")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filtroEstado === "todos"
                    ? "bg-blue-100 text-blue-800 border border-blue-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroEstado("pendiente")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filtroEstado === "pendiente"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setFiltroEstado("aprobada")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filtroEstado === "aprobada"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                Aprobadas
              </button>
              <button
                onClick={() => setFiltroEstado("rechazada")}
                className={`px-3 py-1 text-sm rounded-full ${
                  filtroEstado === "rechazada"
                    ? "bg-red-100 text-red-800 border border-red-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                Rechazadas
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sección de Solicitudes de Apoyo */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {solicitudesFiltradas.length} solicitudes
          </span>
        </div>

        {solicitudesFiltradas.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500 rounded-lg border">
            No se encontraron solicitudes de apoyo con los filtros actuales.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {solicitudesFiltradas.map((solicitud) => (
              <SolicitudCard key={solicitud.id} solicitud={solicitud} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
