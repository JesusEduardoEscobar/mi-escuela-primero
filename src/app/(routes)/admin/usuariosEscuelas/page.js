import { UserTable } from "@/components/user-table";
import { usuariosEscuelas } from "@/data/dataAdmin";

export default function UsuariosPage() {
    return (
        <div className="space-y-6 pb-20">
            <h1 className="text-2xl font-bold">
                Usuarios Registrados
            </h1>
            <div className="space-y-6">
                <UserTable users={usuariosEscuelas} title="Escuelas" />
            </div>
        </div>
    )
}