import { UserTable } from "@/components/user-table";
import { usuariosEscuelas } from "@/data/dataAdmin";

export default function UsuariosPage() {
    // Puedes definir criterios de búsqueda específicos para escuelas
    const criteriosEscuelas = [
        { value: "nombre", label: "Nombre de la escuela" },
        { value: "institucion", label: "Institución" },
        { value: "direccion", label: "Ubicación" },
    ];
    
    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold">
                Usuarios Registrados
            </h1>
            <div className="space-y-6">
                <UserTable 
                    users={usuariosEscuelas} 
                    title="Escuelas" 
                    searchCriterias={criteriosEscuelas} 
                />
            </div>
        </div>
    )
}