"use client"

import { useState, useEffect } from "react"
import { Check, Edit, Trash2, Filter, Building, AlertCircle, CheckCircle, Clock, X, ChevronDown } from 'lucide-react'

// Importar datos desde el archivo data.js
import { TIPOS_SOLICITUD, ESTADOS_SOLICITUD, solicitudesEjemplo } from "../data"

// Componente principal para gestionar solicitudes
export default function Solicitudes({ userId, userType = "regular" }) {
  const [solicitudes, setSolicitudes] = useState([])
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [filtroOrganizacion, setFiltroOrganizacion] = useState("todos")
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [currentSolicitud, setCurrentSolicitud] = useState(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [openSelect, setOpenSelect] = useState(null)
  
  // Cargar solicitudes
  useEffect(() => {
    // En un caso real, aquí harías una llamada a la API
    // Filtramos según el tipo de usuario
    let solicitudesFiltradas = [...solicitudesEjemplo]
    
    if (userType === "regular") {
      // Usuario regular solo ve sus propias solicitudes
      solicitudesFiltradas = solicitudesFiltradas.filter(s => s.creadorId === userId)
    } else if (userType === "organizacion") {
      // Organizaciones ven todas las solicitudes pendientes o las que están atendiendo
      solicitudesFiltradas = solicitudesFiltradas.filter(s => 
        s.estado === ESTADOS_SOLICITUD.PENDIENTE || 
        (s.organizacion && s.organizacion.id === userId)
      )
    }
    // Administradores ven todas (no filtramos)
    
    setSolicitudes(solicitudesFiltradas)
  }, [userId, userType])
  
  // Filtrar solicitudes según los criterios seleccionados
  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const cumpleTipo = filtroTipo === "todos" || solicitud.tipo === filtroTipo
    const cumpleEstado = filtroEstado === "todos" || solicitud.estado === filtroEstado
    const cumpleOrganizacion = filtroOrganizacion === "todos" || 
      (filtroOrganizacion === "sin_asignar" && !solicitud.organizacion) ||
      (filtroOrganizacion === "asignadas" && solicitud.organizacion)
    
    return cumpleTipo && cumpleEstado && cumpleOrganizacion
  })
  
  // Abrir diálogo de edición
  const handleEdit = (solicitud) => {
    setCurrentSolicitud({...solicitud})
    setShowEditDialog(true)
  }
  
  // Guardar cambios de edición
  const handleSaveEdit = () => {
    // Actualizar la solicitud en el estado
    setSolicitudes(prev => 
      prev.map(s => s.id === currentSolicitud.id ? 
        {...currentSolicitud, fechaActualizacion: new Date().toISOString()} : s
      )
    )
    setShowEditDialog(false)
  }
  
  // Abrir diálogo de eliminación
  const handleDeleteClick = (solicitud) => {
    setCurrentSolicitud(solicitud)
    setShowDeleteDialog(true)
  }
  
  // Confirmar eliminación
  const handleConfirmDelete = () => {
    // Eliminar la solicitud del estado
    setSolicitudes(prev => prev.filter(s => s.id !== currentSolicitud.id))
    setShowDeleteDialog(false)
  }
  
  // Abrir diálogo para marcar como completada
  const handleCompleteClick = (solicitud) => {
    setCurrentSolicitud(solicitud)
    setShowCompleteDialog(true)
  }
  
  // Confirmar marcar como completada
  const handleConfirmComplete = () => {
    // Actualizar el estado de la solicitud
    setSolicitudes(prev => 
      prev.map(s => s.id === currentSolicitud.id ? 
        {
          ...s, 
          estado: ESTADOS_SOLICITUD.COMPLETADA,
          fechaActualizacion: new Date().toISOString()
        } : s
      )
    )
    setShowCompleteDialog(false)
  }
  
  // Crear nueva solicitud
  const handleCreateSolicitud = () => {
    const nuevaSolicitud = {
      id: Date.now(),
      titulo: "",
      descripcion: "",
      tipo: TIPOS_SOLICITUD.AYUDA,
      estado: ESTADOS_SOLICITUD.PENDIENTE,
      organizacion: null,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString(),
      creadorId: userId
    }
    
    setCurrentSolicitud(nuevaSolicitud)
    setShowEditDialog(true)
  }
  
  // Renderizar icono según estado
  const renderEstadoIcon = (estado) => {
    switch(estado) {
      case ESTADOS_SOLICITUD.PENDIENTE:
        return <Clock className="h-5 w-5 text-yellow-500" />
      case ESTADOS_SOLICITUD.EN_PROCESO:
        return <AlertCircle className="h-5 w-5 text-blue-500" />
      case ESTADOS_SOLICITUD.COMPLETADA:
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return null
    }
  }
  
  // Obtener color de badge según estado
  const getEstadoBadgeColor = (estado) => {
    switch(estado) {
      case ESTADOS_SOLICITUD.PENDIENTE:
        return "bg-yellow-100 text-yellow-800"
      case ESTADOS_SOLICITUD.EN_PROCESO:
        return "bg-blue-100 text-blue-800"
      case ESTADOS_SOLICITUD.COMPLETADA:
        return "bg-green-100 text-green-800"
      default:
        return ""
    }
  }

  // Manejar selección en dropdown personalizado
  const handleSelectOption = (selectName, value) => {
    if (selectName === 'tipo') {
      setFiltroTipo(value)
    } else if (selectName === 'estado') {
      setFiltroEstado(value)
    } else if (selectName === 'organizacion') {
      setFiltroOrganizacion(value)
    } else if (currentSolicitud && selectName === 'solicitudTipo') {
      setCurrentSolicitud({...currentSolicitud, tipo: value})
    } else if (currentSolicitud && selectName === 'solicitudEstado') {
      setCurrentSolicitud({...currentSolicitud, estado: value})
    }
    setOpenSelect(null)
  }
  
  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null)
      setOpenSelect(null)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  
  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Filter size={18} />
          <span className="font-medium">Filtros:</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {/* Dropdown para tipo */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm border rounded-md bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setOpenSelect(openSelect === 'tipo' ? null : 'tipo')
              }}
            >
              <span className="truncate">
                {filtroTipo === 'todos' ? 'Todos los tipos' : 
                 filtroTipo === TIPOS_SOLICITUD.AYUDA ? 'Ayuda' : 'Apoyo'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {openSelect === 'tipo' && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('tipo', 'todos')
                  }}
                >
                  Todos los tipos
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('tipo', TIPOS_SOLICITUD.AYUDA)
                  }}
                >
                  Ayuda
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('tipo', TIPOS_SOLICITUD.APOYO)
                  }}
                >
                  Apoyo
                </div>
              </div>
            )}
          </div>
          
          {/* Dropdown para estado */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-[140px] px-3 py-2 text-sm border rounded-md bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setOpenSelect(openSelect === 'estado' ? null : 'estado')
              }}
            >
              <span className="truncate">
                {filtroEstado === 'todos' ? 'Todos los estados' : 
                 filtroEstado === ESTADOS_SOLICITUD.PENDIENTE ? 'Pendientes' : 
                 filtroEstado === ESTADOS_SOLICITUD.EN_PROCESO ? 'En proceso' : 'Completadas'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {openSelect === 'estado' && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('estado', 'todos')
                  }}
                >
                  Todos los estados
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('estado', ESTADOS_SOLICITUD.PENDIENTE)
                  }}
                >
                  Pendientes
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('estado', ESTADOS_SOLICITUD.EN_PROCESO)
                  }}
                >
                  En proceso
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('estado', ESTADOS_SOLICITUD.COMPLETADA)
                  }}
                >
                  Completadas
                </div>
              </div>
            )}
          </div>
          
          {/* Dropdown para organización */}
          <div className="relative">
            <button 
              className="flex items-center justify-between w-[180px] px-3 py-2 text-sm border rounded-md bg-white"
              onClick={(e) => {
                e.stopPropagation()
                setOpenSelect(openSelect === 'organizacion' ? null : 'organizacion')
              }}
            >
              <span className="truncate">
                {filtroOrganizacion === 'todos' ? 'Todas' : 
                 filtroOrganizacion === 'sin_asignar' ? 'Sin asignar' : 'Con organización'}
              </span>
              <ChevronDown size={16} />
            </button>
            
            {openSelect === 'organizacion' && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('organizacion', 'todos')
                  }}
                >
                  Todas
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('organizacion', 'sin_asignar')
                  }}
                >
                  Sin asignar
                </div>
                <div 
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSelectOption('organizacion', 'asignadas')
                  }}
                >
                  Con organización
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleCreateSolicitud}
        >
          Nueva solicitud
        </button>
      </div>
      
      {/* Lista de solicitudes */}
      {solicitudesFiltradas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solicitudesFiltradas.map(solicitud => (
            <div key={solicitud.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium">{solicitud.titulo}</h3>
                  <div className="relative">
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation()
                        setOpenDropdown(openDropdown === solicitud.id ? null : solicitud.id)
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </button>
                    
                    {openDropdown === solicitud.id && (
                      <div className="absolute right-0 z-10 mt-1 w-48 bg-white border rounded-md shadow-lg">
                        <div 
                          className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEdit(solicitud)
                            setOpenDropdown(null)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </div>
                        {solicitud.estado !== ESTADOS_SOLICITUD.COMPLETADA && (
                          <div 
                            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCompleteClick(solicitud)
                              setOpenDropdown(null)
                            }}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            <span>Marcar como completada</span>
                          </div>
                        )}
                        <div 
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(solicitud)
                            setOpenDropdown(null)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border">
                    {solicitud.tipo === TIPOS_SOLICITUD.AYUDA ? 'Ayuda' : 'Apoyo'}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEstadoBadgeColor(solicitud.estado)}`}>
                    <span className="flex items-center gap-1">
                      {renderEstadoIcon(solicitud.estado)}
                      {solicitud.estado === ESTADOS_SOLICITUD.PENDIENTE && 'Pendiente'}
                      {solicitud.estado === ESTADOS_SOLICITUD.EN_PROCESO && 'En proceso'}
                      {solicitud.estado === ESTADOS_SOLICITUD.COMPLETADA && 'Completada'}
                    </span>
                  </span>
                </div>
              </div>
              <div className="px-4 py-3">
                <p className="text-sm text-gray-600 line-clamp-3">{solicitud.descripcion}</p>
              </div>
              <div className="px-4 pb-4 pt-0">
                {solicitud.organizacion ? (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                    <Building size={16} />
                    <span>Atendida por: <strong>{solicitud.organizacion.nombre}</strong></span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 mt-2">Sin organización asignada</div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  Actualizada: {new Date(solicitud.fechaActualizacion).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No hay solicitudes que coincidan con los filtros seleccionados</p>
        </div>
      )}
      
      {/* Diálogo de edición */}
      {showEditDialog && currentSolicitud && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowEditDialog(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-3 border-b mb-4">
                  <h3 className="text-lg font-medium">
                    {currentSolicitud.id === Date.now() ? "Nueva solicitud" : "Editar solicitud"}
                  </h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowEditDialog(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                      id="titulo"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      value={currentSolicitud.titulo}
                      onChange={(e) => setCurrentSolicitud({...currentSolicitud, titulo: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      id="descripcion"
                      rows={4}
                      className="w-full px-3 py-2 border rounded-md"
                      value={currentSolicitud.descripcion}
                      onChange={(e) => setCurrentSolicitud({...currentSolicitud, descripcion: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo de solicitud</label>
                    <div className="relative">
                      <button 
                        id="tipo"
                        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenSelect(openSelect === 'solicitudTipo' ? null : 'solicitudTipo')
                        }}
                      >
                        <span>
                          {currentSolicitud.tipo === TIPOS_SOLICITUD.AYUDA ? 'Ayuda' : 'Apoyo'}
                        </span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {openSelect === 'solicitudTipo' && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                          <div 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectOption('solicitudTipo', TIPOS_SOLICITUD.AYUDA)
                            }}
                          >
                            Ayuda
                          </div>
                          <div 
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleSelectOption('solicitudTipo', TIPOS_SOLICITUD.APOYO)
                            }}
                          >
                            Apoyo
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {userType === "admin" && (
                    <div className="grid gap-2">
                      <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                      <div className="relative">
                        <button 
                          id="estado"
                          className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-white"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenSelect(openSelect === 'solicitudEstado' ? null : 'solicitudEstado')
                          }}
                        >
                          <span>
                            {currentSolicitud.estado === ESTADOS_SOLICITUD.PENDIENTE ? 'Pendiente' : 
                             currentSolicitud.estado === ESTADOS_SOLICITUD.EN_PROCESO ? 'En proceso' : 'Completada'}
                          </span>
                          <ChevronDown size={16} />
                        </button>
                        
                        {openSelect === 'solicitudEstado' && (
                          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                            <div 
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectOption('solicitudEstado', ESTADOS_SOLICITUD.PENDIENTE)
                              }}
                            >
                              Pendiente
                            </div>
                            <div 
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectOption('solicitudEstado', ESTADOS_SOLICITUD.EN_PROCESO)
                              }}
                            >
                              En proceso
                            </div>
                            <div 
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSelectOption('solicitudEstado', ESTADOS_SOLICITUD.COMPLETADA)
                              }}
                            >
                              Completada
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleSaveEdit}
                >
                  Guardar
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowEditDialog(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Diálogo de confirmación de eliminación */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowDeleteDialog(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-3 border-b mb-4">
                  <h3 className="text-lg font-medium">Confirmar eliminación</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowDeleteDialog(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="py-4">
                  <p>¿Estás seguro de que deseas eliminar esta solicitud? Esta acción no se puede deshacer.</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmDelete}
                >
                  Eliminar
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Diálogo de confirmación para marcar como completada */}
      {showCompleteDialog && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={() => setShowCompleteDialog(false)}>
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div 
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center pb-3 border-b mb-4">
                  <h3 className="text-lg font-medium">Marcar como completada</h3>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setShowCompleteDialog(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="py-4">
                  <p>¿Estás seguro de que deseas marcar esta solicitud como completada?</p>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleConfirmComplete}
                >
                  Confirmar
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowCompleteDialog(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}