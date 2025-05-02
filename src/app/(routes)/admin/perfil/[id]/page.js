'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { getDirectLink } from '@/utils/Links'

export default function PerfilUsuario() {
  const { id } = useParams()
  const [perfil, setPerfil] = useState(null)
  const [estado, setEstado] = useState({ cargando: true, error: null })

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        setEstado({ cargando: true, error: null })
        const respuesta = await fetch(`http://localhost:1984/api/perfil/${id}`)
        
        if (!respuesta.ok) {
          throw new Error(`Error al cargar perfil: ${respuesta.status}`)
        }
        
        const datos = await respuesta.json()
        
        if (!datos.usuario) {
          throw new Error('Estructura de datos incorrecta')
        }
        
        setPerfil(datos.usuario)
        setEstado({ cargando: false, error: null })
        
      } catch (error) {
        console.error('Error:', error)
        setEstado({ cargando: false, error: error.message })
      }
    }

    cargarPerfil()
  }, [id])

  // const relaciones = Array.isArray(perfil.relaciones) ? perfil.relaciones : [perfil.relaciones]
  // const publicaciones = Array.isArray(perfil.publicaciones) ? perfil.publicaciones : [perfil.publicaciones]

  if (estado.cargando) return <div className="p-4 text-center">Cargando perfil...</div>
  if (estado.error) return <div className="p-4 text-red-500 text-center">Error: {estado.error}</div>
  if (!perfil) return <div className="p-4 text-center">No se encontró el perfil</div>
  console.log(perfil.matches)
  console.log(perfil.matches.foto)
  
  //console.log(getDirectLink(perfil.matches[0]?.foto).directLinkImage)


  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Sección superior con información básica */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0">
            <Image
              src={getDirectLink(perfil.imagen).directLinkImage || '/usuario-default.png'}
              alt={`Foto de ${perfil.nombre}`}
              width={160}
              height={160}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          
          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">{perfil.nombre}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-semibold">Tipo:</span> {perfil.tipo === 'escuela' ? 'Escuela' : 'Aliado'}</p>
              <p><span className="font-semibold">Email:</span> {perfil.email}</p>
              <p><span className="font-semibold">Teléfono:</span> {perfil.telefono}</p>
              {perfil.calle && perfil.colonia && (
                <p><span className="font-semibold">Dirección:</span> {perfil.calle}, {perfil.colonia}</p>
              )}
              {perfil.tipo === 'escuela' && perfil.nombreInstitucion && (
                <p><span className="font-semibold">Institución:</span> {perfil.nombreInstitucion}</p>
              )}
              {perfil.tipo === 'aliado' && perfil.institucion && (
                <p><span className="font-semibold">Organización:</span> {perfil.institucion}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Matches */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Matches Activos</h2>
        {perfil && perfil.matches ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(Array.isArray(perfil.matches) ? perfil.matches : [perfil.matches]).map((match) => (
              <div key={match.id} className="border rounded-lg p-4 flex items-center gap-3">
                {match.foto && (
                  <Image
                    src={getDirectLink(match.foto)?.directLinkImage || '/usuario-default.png'}
                    alt={`Foto de ${match.nombre}`}
                  width={60}
                  height={60}
                  className="rounded-full"
                  />
                )}
              <div>
                <h3 className="font-semibold">{match.nombre}</h3>
                <p className="text-sm text-gray-500">ID: {match.id}</p>
              </div>
            </div>
            ))}
        </div>
        ) : (
          <p className="text-gray-500">No hay matches activos</p>
        )}
      </div>

      {/* Sección de Relaciones (Solicitudes o Apoyos) */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {perfil.tipo === 'escuela' ? 'Solicitudes' : 'Escuelas Apoyadas'}
        </h2>
        {perfil.relaciones && perfil.relaciones.length > 0 ? (
          <div className="space-y-3">
            {(Array.isArray(perfil.relaciones) ? perfil.relaciones : [perfil.relacion]).map((relacion) => (
              <div key={relacion.id} className="border-b pb-3 last:border-b-0">
                <div className="flex items-center gap-3">
                  {relacion.foto && (
                    <Image
                      src={getDirectLink(relacion.foto).directLinkImage}
                      alt={perfil.tipo === 'escuela' ? 'Solicitud' : 'Escuela apoyada'}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">
                      {perfil.tipo === 'escuela' ? relacion.titulo : relacion.nombreInstitucion}
                    </h3>
                    {perfil.tipo === 'escuela' && (
                      <p className="text-sm text-gray-500">
                        Estado: <span className="capitalize">{relacion.estado}</span>
                      </p>
                    )}
                  </div>
                </div>
                {perfil.tipo === 'escuela' && relacion.descripcion && (
                  <p className="mt-2 text-gray-600">{relacion.descripcion}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            {perfil.tipo === 'escuela' ? 'No hay solicitudes' : 'No hay escuelas apoyadas'}
          </p>
        )}
      </div>

      {/* Sección de Publicaciones */}
      {/* <div className="bg-white rounded-lg shadow-md p-6 pb-20">
        <h2 className="text-2xl font-bold mb-4">Publicaciones</h2>
        {perfil.publicaciones && perfil.publicaciones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perfil.publicaciones.map((publicacion) => (
              <div key={publicacion.id} className="border rounded-lg overflow-hidden">
                {publicacion.foto && (
                  <div className="h-48 relative">
                    <Image
                      src={publicacion.foto}
                      alt="Publicación"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-gray-700">{publicacion.descripcion}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(publicacion.fecha).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay publicaciones</p>
        )}
      </div> */}
    </div>
  )
}