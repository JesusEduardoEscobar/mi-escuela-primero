// Datos de ejemplo para usuarios aliados
export const usuariosAliados = [
  {
    id: "a1",
    nombre: "Carlos Méndez",
    institucion: "Empresa Tecnológica S.A.",
    direccion: "Av. Revolución 1234, Ciudad de México",
    telefono: "555-123-4567",
    email: "carlos@empresatec.com",
    tipo: "aliado",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "a2",
    nombre: "María González",
    institucion: "Consultora Educativa",
    direccion: "Calle Reforma 567, Guadalajara",
    telefono: "333-987-6543",
    email: "maria@consultora.edu",
    tipo: "aliado",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "a3",
    nombre: "Roberto Juárez",
    institucion: "Fundación Aprendizaje",
    direccion: "Blvd. Insurgentes 890, Monterrey",
    telefono: "818-456-7890",
    email: "roberto@fundacion.org",
    tipo: "aliado",
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

// Datos de ejemplo para usuarios escuelas
export const usuariosEscuelas = [
  {
    id: "e1",
    nombre: "Ana Martínez",
    institucion: "Escuela Primaria Benito Juárez",
    direccion: "Calle Educación 123, Puebla",
    telefono: "222-345-6789",
    email: "ana@escuelabj.edu.mx",
    tipo: "escuela",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "e2",
    nombre: "Pedro Ramírez",
    institucion: "Colegio Tecnológico de Veracruz",
    direccion: "Av. Universidad 456, Veracruz",
    telefono: "229-876-5432",
    email: "pedro@colegioveracruz.edu.mx",
    tipo: "escuela",
    imagen: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "e3",
    nombre: "Lucía Hernández",
    institucion: "Instituto Superior de Querétaro",
    direccion: "Blvd. Educativo 789, Querétaro",
    telefono: "442-234-5678",
    email: "lucia@isq.edu.mx",
    tipo: "escuela",
    imagen: "/placeholder.svg?height=100&width=100",
  },
]

// Datos de ejemplo para solicitudes de registro
export const solicitudesRegistro = [
  {
    id: "s1",
    nombre: "Fernando López",
    institucion: "Escuela Secundaria Técnica #45",
    direccion: "Calle Progreso 234, León",
    telefono: "477-123-4567",
    email: "fernando@est45.edu.mx",
    tipo: "escuela",
    imagen: "/placeholder.svg?height=100&width=100",
    documentosVerificacion: ["Acta constitutiva", "Registro SEP"],
    fechaSolicitud: "2023-10-15",
  },
  {
    id: "s2",
    nombre: "Diana Torres",
    institucion: "Asociación de Desarrollo Educativo",
    direccion: "Av. Reforma 567, CDMX",
    telefono: "555-987-6543",
    email: "diana@ade.org.mx",
    tipo: "aliado",
    imagen: "/placeholder.svg?height=100&width=100",
    documentosVerificacion: ["RFC", "Comprobante de domicilio"],
    fechaSolicitud: "2023-10-18",
  },
  {
    id: "s3",
    nombre: "Javier Morales",
    institucion: "Preparatoria Autónoma",
    direccion: "Blvd. Universitario 890, Tijuana",
    telefono: "664-456-7890",
    email: "javier@prepa-autonoma.edu.mx",
    tipo: "escuela",
    imagen: "/placeholder.svg?height=100&width=100",
    documentosVerificacion: ["Registro SEP", "Identificación oficial"],
    fechaSolicitud: "2023-10-20",
  },
]

// Datos de ejemplo para usuarios problemáticos
export const usuariosProblematicos = [
  {
    id: "p1",
    nombre: "Miguel Ángel Pérez",
    institucion: "Centro Educativo del Norte",
    direccion: "Calle Principal 123, Chihuahua",
    telefono: "614-123-4567",
    email: "miguel@cen.edu.mx",
    tipo: "escuela",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=100&width=100",
    strikes: 1,
  },
  {
    id: "p2",
    nombre: "Laura Sánchez",
    institucion: "Consultora Educativa del Sur",
    direccion: "Av. Insurgentes 456, Oaxaca",
    telefono: "951-987-6543",
    email: "laura@ces.com.mx",
    tipo: "aliado",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=100&width=100",
    strikes: 2,
  },
  {
    id: "p3",
    nombre: "Ricardo Vega",
    institucion: "Instituto Tecnológico Regional",
    direccion: "Blvd. Tecnológico 789, Mérida",
    telefono: "999-456-7890",
    email: "ricardo@itr.edu.mx",
    tipo: "escuela",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=100&width=100",
    strikes: 3,
  },
  {
    id: "p4",
    nombre: "Gabriela Morales",
    institucion: "Escuela Primaria Libertad",
    direccion: "Calle Hidalgo 234, Toluca",
    telefono: "722-345-6789",
    email: "gabriela@primaria-libertad.edu.mx",
    tipo: "escuela",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=100&width=100",
    strikes: 0,
  },
  {
    id: "p5",
    nombre: "Javier Rodríguez",
    institucion: "Asociación de Capacitación",
    direccion: "Av. Juárez 567, Puebla",
    telefono: "222-765-4321",
    email: "javier@capacitacion.org",
    tipo: "aliado",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=100&width=100",
    strikes: 1,
  },
]

// data/dataAdmin.js (añadir al final del archivo)

// Datos de ejemplo para solicitudes de apoyo (de aliados a escuelas)
export const solicitudesApoyo = [
  {
    id: "sa1",
    tipo: "apoyo",
    solicitante: {
      id: "a1",
      nombre: "Carlos Méndez",
      institucion: "Empresa Tecnológica S.A.",
      telefono: "555-123-4567",
      tipo: "aliado",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Donación de 20 computadoras para laboratorio escolar",
    fechaSolicitud: "2023-11-05",
    estado: "pendiente"
  },
  {
    id: "sa2",
    tipo: "apoyo",
    solicitante: {
      id: "a2",
      nombre: "María González",
      institucion: "Consultora Educativa",
      telefono: "333-987-6543",
      tipo: "aliado",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Programa de mentoría para estudiantes de último año",
    fechaSolicitud: "2023-11-10",
    estado: "aprobada"
  },
  {
    id: "sa3",
    tipo: "apoyo",
    solicitante: {
      id: "a3",
      nombre: "Roberto Juárez",
      institucion: "Fundación Aprendizaje",
      telefono: "818-456-7890",
      tipo: "aliado",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Talleres de capacitación para docentes en nuevas tecnologías",
    fechaSolicitud: "2023-11-15",
    estado: "pendiente"
  }
];

// Datos de ejemplo para solicitudes de ayuda (de escuelas a aliados)
export const solicitudesAyuda = [
  {
    id: "sh1",
    tipo: "ayuda",
    solicitante: {
      id: "e1",
      nombre: "Ana Martínez",
      institucion: "Escuela Primaria Benito Juárez",
      telefono: "222-345-6789",
      tipo: "escuela",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Necesitamos material didáctico para 150 alumnos",
    fechaSolicitud: "2023-11-02",
    estado: "pendiente"
  },
  {
    id: "sh2",
    tipo: "ayuda",
    solicitante: {
      id: "e2",
      nombre: "Pedro Ramírez",
      institucion: "Colegio Tecnológico de Veracruz",
      telefono: "229-876-5432",
      tipo: "escuela",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Solicitud de equipamiento para laboratorio de ciencias",
    fechaSolicitud: "2023-11-08",
    estado: "aprobada"
  },
  {
    id: "sh3",
    tipo: "ayuda",
    solicitante: {
      id: "e3",
      nombre: "Lucía Hernández",
      institucion: "Instituto Superior de Querétaro",
      telefono: "442-234-5678",
      tipo: "escuela",
      imagen: "/placeholder.svg?height=100&width=100"
    },
    descripcion: "Requerimos apoyo para programa de becas estudiantiles",
    fechaSolicitud: "2023-11-12",
    estado: "rechazada"
  }
];

// Datos de ejemplo para usuarios de chat
export const usuariosChat = [
  ...usuariosAliados,
  ...usuariosEscuelas,
  ...usuariosProblematicos.map((user) => ({ ...user, strikes: undefined })),
]

