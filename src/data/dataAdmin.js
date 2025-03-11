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
    imagen: "/placeholder.svg?height=100&width=100",
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
    imagen: "/placeholder.svg?height=100&width=100",
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
    imagen: "/placeholder.svg?height=100&width=100",
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
    imagen: "/placeholder.svg?height=100&width=100",
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
    imagen: "/placeholder.svg?height=100&width=100",
    strikes: 1,
  },
]

// Datos de ejemplo para usuarios de chat
export const usuariosChat = [
  ...usuariosAliados,
  ...usuariosEscuelas,
  ...usuariosProblematicos.map((user) => ({ ...user, strikes: undefined })),
]

