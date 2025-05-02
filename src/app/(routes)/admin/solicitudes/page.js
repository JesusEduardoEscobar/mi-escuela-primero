// 🔁 Este componente es ahora del lado del servidor
import {TarjetaSolicitud} from "@/components/Tarjeta-Solicitud";

export default async function SolicitudesPage() {
  const res = await fetch("http://localhost:1984/api/admin/solicitudes", {
    cache: "no-store",
  });
  const solicitudes = await res.json();

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-2xl font-bold">Solicitudes de Ingreso</h1>
      <div className="grid grid-cols-1 gap-4">
        {solicitudes.map((solicitud) => (
          <TarjetaSolicitud key={solicitud.id} solicitud={solicitud} />
        ))}
      </div>
    </div>
  );
}
