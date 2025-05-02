"use client"

import { useEffect, useState } from "react";
import { UserTable } from "@/components/user-table";

export default function EscuelasPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const criteriosEscuelas = [
    { value: "nombre", label: "Nombre" },
    { value: "institucion", label: "Institución" },
  ];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:1984/api/admin/usuarios-aprobados");
        const data = await res.json();

        // 🔄 Estandarizar los datos para que el componente UserTable los pueda mostrar
        const usuariosNormalizados = data
        .filter((usuario) => usuario.tipo === "escuela")
        .map((usuario) => ({
          id: usuario.id,
          nombre: usuario.nombre,
          institucion: usuario.nombreInstitucion || "Sin institución",
          calle: usuario.calleEscuela || "", 
          colonia: usuario.coloniaEscuela || "Sin colonia",
          telefono: usuario.telefono || "Sin teléfono",
          imagen: usuario.fotoEscuela || "/placeholder.svg",
        }));

        setUsuarios(usuariosNormalizados);
      } catch (error) {
        console.error("Error cargando escuelas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Escuelas Registradas</h1>

      {loading ? (
        <div className="text-gray-500">Cargando escuelas...</div>
      ) : (
        <UserTable
          users={usuarios}
          title="Escuelas"
          searchCriterias={criteriosEscuelas}
        />
      )}
    </div>
  );
}
