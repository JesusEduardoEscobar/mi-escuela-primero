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
                          src={user.imagen || "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ"}
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

