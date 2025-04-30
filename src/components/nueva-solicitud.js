"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function NuevaSolicitudModal({ onClose, onSubmit }) {
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");

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

    const solicitudPayload = {
      descripcion,
      prioridad: "MEDIA",
      documentacion: "Document",
      id_Escuela: 3,
      id_Apoyo: parseInt(categoria), // Ya es valor numérico
      fecha: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    };

    try {
      const response = await fetch("http://localhost:1984/api/crearSolicitud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solicitudPayload),
      });

      if (response.ok) {
        alert("Solicitud enviada con éxito");
        const result = await response.json();

        onSubmit({
          ...solicitudPayload,
          estado: "pendiente",
          aliados: [],
          id: Date.now(), // Simulación
        });

        onClose();
      } else {
        alert("Error al crear la solicitud");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Nueva solicitud</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción detallada *
            </label>
            <textarea
              id="descripcion"
              rows={4}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe tu necesidad, objetivos y resultados esperados..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="categoria"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Categoría
            </label>
            <select
              id="categoria"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-primary"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="1">Formación docente</option>
              <option value="2">Formación a familias</option>
              <option value="3">Formación niñas y niños</option>
              <option value="4">Personal de apoyo</option>
              <option value="5">Infraestructura</option>
              <option value="6">Materiales</option>
              <option value="7">Mobiliario</option>
              <option value="8">Alimentación</option>
              <option value="9">Transporte</option>
              <option value="10">Jurídico</option>
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
              Crear solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
