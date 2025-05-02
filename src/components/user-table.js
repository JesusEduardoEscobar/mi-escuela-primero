"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, ChevronDown } from 'lucide-react'
import { getDirectLink } from "@/utils/Links";

export function UserTable({ users, title, searchCriterias }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("nombre");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showCriteriaDropdown, setShowCriteriaDropdown] = useState(false);

  const criterias = searchCriterias || [
    { value: "nombre", label: "Nombre" },
    { value: "institucion", label: "Institución" },
  ];

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => {
      const searchValue = user[searchCriteria]?.toString().toLowerCase() || "";
      return searchValue.includes(searchTerm.toLowerCase());
    });

    setFilteredUsers(filtered);
  }, [searchTerm, searchCriteria, users]);

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredUsers(users);
  };

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h2 className="text-lg font-medium">{title}</h2>

          <div className="relative flex items-center w-full md:w-auto md:min-w-[350px]">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Buscar por ${criterias.find(c => c.value === searchCriteria)?.label.toLowerCase()}`}
                className="pl-10 pr-10 py-2 w-full border rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
              {searchTerm && (
                <button 
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowCriteriaDropdown(!showCriteriaDropdown)}
                className="flex items-center justify-between px-3 py-2 border border-l-0 rounded-r-md bg-gray-50 hover:bg-gray-100 text-sm"
              >
                <span className="mr-2 hidden md:inline">
                  {criterias.find(c => c.value === searchCriteria)?.label}
                </span>
                <span className="mr-2 md:hidden">Criterio</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showCriteriaDropdown && (
                <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {criterias.map((criteria) => (
                      <li key={criteria.value}>
                        <button
                          onClick={() => {
                            setSearchCriteria(criteria.value);
                            setShowCriteriaDropdown(false);
                          }}
                          className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 ${
                            searchCriteria === criteria.value ? "bg-blue-50 text-blue-600" : ""
                          }`}
                        >
                          {criteria.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No se encontraron resultados para tu búsqueda.
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-3 px-4 text-left font-medium text-gray-500">Nombre</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Institución</th>
                <th className="cpy-3 px-4 text-left font-medium text-gray-500">Calle</th>
                <th className="cpy-3 px-4 text-left font-medium text-gray-500">Colonia</th>
                <th className="py-3 px-4 text-left font-medium text-gray-500">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <Link href={`/admin/perfil/${user.id}`}>
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src={getDirectLink(user.imagen)?.directLinkImage || "/default-user.jpg"}
                            alt={user.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium hover:underline">{user.nombre}</span>
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4">{user.nombreInstitucion || user.nombreEmpresa || user.institucion}</td>
                  {user.cct !== undefined && (
                    <>
                      <td className="py-3 px-4">{user.calle}</td>
                      <td className="py-3 px-4">{user.colonia}</td>
                    </>
                  )}
                  {user.sector !== undefined && (
                    <>
                      <td className="py-3 px-4">{user.calle}</td>
                      <td className="py-3 px-4">{user.colonia}</td>
                    </>
                  )}
                  <td className="py-3 px-4">{user.telefono}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="p-4 border-t text-sm text-gray-500">
        Mostrando {filteredUsers.length} de {users.length} {title.toLowerCase()}
      </div>
    </div>
  );
}
