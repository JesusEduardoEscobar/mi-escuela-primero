import { UserTable } from "@/components/user-table";
import { usuariosAliados, usuariosEscuelas } from "@/data/dataAdmin";

export default function UsuariosPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">
                Usuarios Registrados
            </h1>
            <div className="space-y-6">
                <UserTable users={usuariosAliados} title="Aliados" />
                <UserTable users={usuariosEscuelas} title="Escuelas" />
            </div>
        </div>
    )
}