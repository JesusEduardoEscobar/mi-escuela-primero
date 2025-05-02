// app/usuarios-aliados/page.js
"use client"

import { useEffect, useState } from "react";
import { UserTable } from "@/components/user-table";

export default function AliadosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const criteriosAliados = [
    { value: "nombre", label: "Nombre" },
    { value: "institucion", label: "Empresa" },        // ojo: coincide con el campo que normalizamos
  ];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:1984/api/admin/usuarios-aprobados");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Filtrar solo aliados y normalizar
        const aliados = data
          .filter((usuario) => usuario.tipo === "aliado")
          .map((usuario) => ({
            id: usuario.id,
            nombre: usuario.nombre,
            institucion: usuario.institucion || "No especificada",
            calle: usuario.calleAliado || "-",
            colonia: usuario.coloniaAliado || "-",
            telefono: usuario.telefono || "–",
            sector: usuario.sector || "–",
            imagen: usuario.fotoAliado || "/placeholder.svg",
          }));

        setUsuarios(aliados);
      } catch (error) {
        console.error("Error cargando aliados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Aliados Registrados</h1>

      {loading ? (
        <div className="text-gray-500">Cargando aliados...</div>
      ) : (
        <UserTable
          users={usuarios}
          title="Aliados"
          searchCriterias={criteriosAliados}
        />
      )}
    </div>
  );
}
