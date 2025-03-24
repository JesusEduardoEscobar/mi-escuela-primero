import { UserTable } from "@/components/user-table";
import { usuariosAliados } from "@/data/dataAdmin";

export default function AliadosPage() {
    // Criterios de búsqueda específicos para aliados
    const criteriosAliados = [
        { value: "nombre", label: "Nombre de la persona" },
        { value: "institucion", label: "Institución" },
        { value: "direccion", label: "Dirección" },
    ];
    
    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold">
                Aliados Registrados
            </h1>
            <div className="space-y-6">
                <UserTable 
                    users={usuariosAliados} 
                    title="Aliados" 
                    searchCriterias={criteriosAliados} 
                />
            </div>
        </div>
    )
}