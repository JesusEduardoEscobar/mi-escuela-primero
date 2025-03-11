import Link from "next/link"
import Image from "next/image"

export function UserTable({ users, title }) {
  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-4 text-left font-medium text-gray-500">Nombre</th>
              <th className="py-3 px-4 text-left font-medium text-gray-500">Institución</th>
              <th className="py-3 px-4 text-left font-medium text-gray-500">Dirección</th>
              <th className="py-3 px-4 text-left font-medium text-gray-500">Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  <Link href={`/admin/perfil/${user.id}`}>
                    <div className="flex items-center space-x-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <Image
                          src={user.imagen || "/placeholder.svg"}
                          alt={user.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="font-medium hover:underline">{user.nombre}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-3 px-4">{user.institucion}</td>
                <td className="py-3 px-4">{user.direccion}</td>
                <td className="py-3 px-4">{user.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

