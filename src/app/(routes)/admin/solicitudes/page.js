import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText } from "lucide-react";
import { getDirectLink } from "@/utils/Links";

export default async function SolicitudesPage() {
  try {
    const res = await fetch("http://localhost:1984/api/admin/solicitudes", { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    const solicitudes = await res.json();

    console.log("Solicitudes:", solicitudes);

    return (
      <div className="space-y-6 pb-20">
        <h1 className="text-2xl font-bold">Solicitudes de Ingreso</h1>

        <div className="grid grid-cols-1 gap-4">
          {Array.isArray(solicitudes) && solicitudes.map((solicitud) => {
            const esEscuela = solicitud.tipoUsuario === 1;
            const tipo = esEscuela ? "Escuela" : "Aliado";

            const nombre = solicitud.nombre;
            const email = solicitud.email;
            const telefono = solicitud.telefono;
            const id = solicitud.id;

            const nombreInstitucion = esEscuela ? solicitud.nombreInstitucion : solicitud.institucion;
            const calle = esEscuela ? solicitud.calleEscuela : solicitud.calleAliado;
            const colonia = esEscuela ? solicitud.coloniaEscuela : solicitud.coloniaAliado;
            const foto = solicitud.fotoEscuela || solicitud.fotoAliado;
            const documentoVerificacion = solicitud.docEscuela

            const imagen = getDirectLink(foto)?.directLinkImage || "/placeholder.svg";
            console.log("Image URL:", imagen);

            const documentos = documentoVerificacion ? [documentoVerificacion] : [];

            return (
              <div key={id} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-start">
                  <Link href={`/admin/perfil/${id}`}>
                    <div className="relative h-16 w-16 rounded-full overflow-hidden">
                      <Image
                        src={imagen}
                        alt={nombre}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link href={`/admin/perfil/${id}`}>
                          <h3 className="font-medium text-lg hover:underline">{nombre}</h3>
                        </Link>
                        <p className="text-sm text-gray-600">{nombreInstitucion || "Sin institución"}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          <span>Solicitud pendiente</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {tipo}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Dirección:</span> {`${calle || ""}, ${colonia || ""}`}
                      </div>
                      <div>
                        <span className="text-gray-500">Teléfono:</span> {telefono}
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span> {email}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Documentos de verificación:</h4>
                      <div className="flex flex-wrap gap-2">
                        {documentos.map((doc, index) => {
                          const pdfLink = getDirectLink(doc)?.directLinkPDF || "#";
                          return (
                            <a
                              key={index}
                              href={pdfLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded-full"
                            >
                              <FileText size={14} className="mr-1" />
                              Documento {index + 1}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Aprobar
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Rechazar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching solicitudes:", error);
    return <div>Error al cargar las solicitudes: {error.message}</div>;
  }
}
