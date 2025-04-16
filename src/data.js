import { CirclePlus, User, HomeIcon, Heart, MessageCircle, Users, ClipboardCheck, AlertTriangle, School} from "lucide-react";

export const itemsNavbarUsers = [
    {
        id: 1,
        title: "Home",
        icon: <HomeIcon size={25} color="black" strokeWidth={1.5} />,
        link: "/usuarios/paginaPrincipal",
    },
    {
        id: 2,
        title: "Mensaje",
        icon: <MessageCircle size={25} color="black" strokeWidth={1.5} />,
        link: "/usuarios/mensajes",
    },
    {
        id: 3,
        title: "Matches",
        icon: <Heart size={25} color="black" strokeWidth={1.5} />,
        link: "/usuarios/matches",
    },
    {
        id: 4,
        title: "Agregar",
        icon: <CirclePlus size={25} color="black" strokeWidth={1.5} />,
        link: "/usuarios/agregar",
    },
    {
        id: 5,
        title: "Perfil",
        icon: <User size={25} color="black" strokeWidth={1.5} />,
        link: "/usuarios/perfil",
    },
]

export const itemsNavbarAdmin = [
  {
    id: 1,
    title: "Pagina Principal",
    icon: <HomeIcon size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/paginaPrincipal"
  },
  {
    id: 2,
    title: "Aliados",
    icon: <Users size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/usuariosAliados"
  },
  {
    id: 3,
    title: "Escuelas",
    icon: <School size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/usuariosEscuelas"
  },
  {
    id: 4,
    title: "Solicitudes",
    icon: <ClipboardCheck size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/solicitudes"
  },
  {
    id: 5,
    title: "Prolblematicos",
    icon: <AlertTriangle size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/problematicos"
  },
  {
    id: 6,
    title: "Chat",
    icon: <MessageCircle size={25} color="black" strokeWidth={1.5} />,
    link: "/admin/chat"
  }
]

// Tipos de solicitudes
export const TIPOS_SOLICITUD = {
  AYUDA: "ayuda",
  APOYO: "apoyo"
}

// Estados de solicitudes
export const ESTADOS_SOLICITUD = {
  PENDIENTE: "pendiente",
  EN_PROCESO: "en_proceso",
  COMPLETADA: "completada"
}

// Datos de ejemplo - En un caso real, esto vendría de una API
export const solicitudesEjemplo = [
  {
    id: 1,
    titulo: "Necesito ayuda con alimentos",
    descripcion: "Familia de 4 personas necesita apoyo con alimentos básicos",
    tipo: TIPOS_SOLICITUD.AYUDA,
    estado: ESTADOS_SOLICITUD.PENDIENTE,
    organizacion: null,
    fechaCreacion: "2025-03-10T10:00:00Z",
    fechaActualizacion: "2025-03-10T10:00:00Z",
    creadorId: 1
  },
  {
    id: 2,
    titulo: "Apoyo para evento comunitario",
    descripcion: "Buscamos voluntarios para organizar evento comunitario el próximo mes",
    tipo: TIPOS_SOLICITUD.APOYO,
    estado: ESTADOS_SOLICITUD.EN_PROCESO,
    organizacion: {
      id: 1,
      nombre: "Fundación Comunitaria"
    },
    fechaCreacion: "2025-03-05T14:30:00Z",
    fechaActualizacion: "2025-03-08T09:15:00Z",
    creadorId: 1
  },
  {
    id: 3,
    titulo: "Donación de ropa",
    descripcion: "Se completó la donación de ropa para familias afectadas",
    tipo: TIPOS_SOLICITUD.APOYO,
    estado: ESTADOS_SOLICITUD.COMPLETADA,
    organizacion: {
      id: 2,
      nombre: "Ayuda Solidaria"
    },
    fechaCreacion: "2025-02-20T11:45:00Z",
    fechaActualizacion: "2025-03-01T16:20:00Z",
    creadorId: 2
  }
]

// Datos del usuario actual (ejemplo)
export const currentUser = {
  id: 1,
  name: "Juan Pérez",
  username: "juanperez",
  image: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=300&width=300",
  bio: "Activista social y voluntario",
  followers: 120,
  following: 85,
  type: "regular" // Puede ser "regular", "organizacion" o "admin"
}

// Función para obtener posts por usuario
export const getPostsByUser = (userId) => {
  // Aquí iría la lógica para obtener posts desde una API
  // Por ahora, devolvemos datos de ejemplo
  return [
    {
      id: 1,
      image: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=600&width=600",
      caption: "Evento comunitario",
      date: "2025-03-01T10:00:00Z",
      user: {
        id: userId,
        name: "Juan Pérez",
        username: "juanperez",
        image: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=300&width=300",
      },
      likes: 24,
      comments: []
    },
    {
      id: 2,
      image: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=600&width=600",
      caption: "Voluntariado",
      date: "2025-02-15T14:30:00Z",
      user: {
        id: userId,
        name: "Juan Pérez",
        username: "juanperez",
        image: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=300&width=300",
      },
      likes: 42,
      comments: []
    }
  ]
}
