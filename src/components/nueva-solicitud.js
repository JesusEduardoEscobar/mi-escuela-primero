"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { getUserRole } from "../utils/UtilidadesAuth"; // Ajusta la ruta si es necesario

export default function NuevaSolicitudModal({ onClose, onSubmit }) {
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [categoria, setCategoria] = useState("")

  // Obtiene tipoUsuario e idUsuario desde el JWT en localStorage
  const userRole = getUserRole() || {};
  const { tipoUsuario, id: usuarioId } = userRole;

  // Para probar manualmente sin login:
  // const tipoUsuario = 2;  // 1 = escuela, 2 = aliado
  // const usuarioId    = 25; // Pon aquí un ID válido para tu DB

  console.log(
    "PRUEBA ⛔⛔⛔ - Tipo de usuario:",
    tipoUsuario,
    "- ID de usuario:",
    usuarioId
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descripcion) {
      alert("Por favor completa la descripción");
      return;
    }

    if (!categoria) {
      alert("Por favor selecciona una categoría");
      return;
    }

    // Payload y endpoint según tipo de usuario
    let endpoint, payload;
    if (tipoUsuario === 1) {
      endpoint = "/api/crearSolicitud";
      payload = {
        descripcion,
        prioridad: "MEDIA",
        documentacion: "Document",
        id_Escuela: usuarioId,
        id_Apoyo: parseInt(categoria),
        fecha: new Date().toISOString().split("T")[0],
      };
    } else {
      endpoint = "/api/crearOferta";
      payload = {
        descripcion,
        id_Apoyo: parseInt(categoria),
        id_Aliado: usuarioId,
        fecha: new Date().toISOString().split("T")[0],
      };
    }

    try {
      const response = await fetch(`http://localhost:1984${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          tipoUsuario === 1
            ? "Solicitud enviada con éxito"
            : "Oferta enviada con éxito"
        );
        onSubmit({ ...payload, id: Date.now(), estado: "pendiente" });
        onClose();
      } else {
        alert(
          tipoUsuario === 1
            ? "Error al crear la solicitud"
            : "Error al crear la oferta"
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">
            {tipoUsuario === 1 ? "Nueva solicitud" : "Nueva oferta"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción detallada *
            </label>
            <textarea
              rows={4}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe tu necesidad, objetivos y resultados esperados..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría *
            </label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecciona una categoría</option>
              <option value="infraestructura">Infraestructura</option>
              <option value="material_didactico">Material didáctico</option>
              <option value="capacitacion">Capacitación</option>
              <option value="tecnologia">Tecnología</option>
              <option value="eventos">Eventos</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              {tipoUsuario === 1 ? "Crear solicitud" : "Crear oferta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

