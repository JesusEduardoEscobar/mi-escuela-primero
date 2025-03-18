// Datos de ejemplo para la aplicación
export const usuarios = [
  {
    id: 1,
    nombre: "Escuela Primaria Benito Juárez",
    tipo: "escuela",
    correo: "contacto@primaria-benito-juarez.edu.mx",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=200&width=200",
    descripcion: "Escuela primaria pública con enfoque en educación integral y valores.",
    ubicacion: "Ciudad de México",
    necesidades: ["Material didáctico", "Apoyo en infraestructura", "Talleres para padres"],
    matches: [3, 5],
    solicitudes: [
      {
        id: 1,
        titulo: "Renovación de biblioteca",
        descripcion: "Necesitamos apoyo para renovar nuestra biblioteca escolar con nuevos libros y mobiliario.",
        estado: "en proceso",
        aliados: [3],
      },
      {
        id: 2,
        titulo: "Taller de ciencias",
        descripcion: "Buscamos aliados que puedan impartir talleres de ciencias para nuestros estudiantes.",
        estado: "pendiente",
        aliados: [],
      },
    ],
  },
  {
    id: 2,
    nombre: "Escuela Secundaria Miguel Hidalgo",
    tipo: "escuela",
    correo: "info@secundaria-hidalgo.edu.mx",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=200&width=200",
    descripcion: "Secundaria enfocada en preparar estudiantes para la excelencia académica.",
    ubicacion: "Guadalajara, Jalisco",
    necesidades: ["Equipos de cómputo", "Becas para estudiantes", "Programas de mentoría"],
    matches: [4],
    solicitudes: [
      {
        id: 3,
        titulo: "Laboratorio de computación",
        descripcion: "Necesitamos actualizar nuestro laboratorio de computación con equipos nuevos.",
        estado: "terminada",
        aliados: [4],
      },
    ],
  },
  {
    id: 3,
    nombre: "Fundación Educativa Futuro",
    tipo: "aliado",
    correo: "contacto@fundacionfuturo.org",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=200&width=200",
    descripcion: "Organización dedicada a mejorar la calidad educativa en escuelas públicas.",
    ubicacion: "Ciudad de México",
    apoyos: ["Donación de libros", "Capacitación docente", "Mejora de infraestructura"],
    matches: [1],
    escuelasApoyadas: [1],
  },
  {
    id: 4,
    nombre: "TechMex Empresarial",
    tipo: "aliado",
    correo: "vinculacion@techmex.com",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=200&width=200",
    descripcion: "Empresa de tecnología comprometida con la educación digital en México.",
    ubicacion: "Monterrey, Nuevo León",
    apoyos: ["Donación de equipos", "Talleres de programación", "Mentoría tecnológica"],
    matches: [2],
    escuelasApoyadas: [2],
  },
  {
    id: 5,
    nombre: "Asociación Cultural Raíces",
    tipo: "aliado",
    correo: "info@raices.org",
    imagen: "/https://imgs.search.brave.com/_jNap9jRRcWdeDWSBOEtwtQvPc8v6E7Vk6RskJHKvoA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE2/NDgyMjE4OC92ZWN0/b3IvbWFsZS1hdmF0/YXItcHJvZmlsZS1w/aWN0dXJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LUHNM/Z1ZJd0VHZER2ZjRf/a2l5bkNYdzk2cF9Q/aEJqSUdkVTY4cWtw/YnVJPQ?height=200&width=200",
    descripcion: "Asociación dedicada a promover la cultura y las artes en entornos educativos.",
    ubicacion: "Oaxaca",
    apoyos: ["Talleres culturales", "Eventos artísticos", "Material didáctico"],
    matches: [1],
    escuelasApoyadas: [1],
  },
]

// dataAdmin.js
export const usuariosAliados = [
  {
    id: 1,
    nombre: "Aliado 1",
    imagen: "/img/aliado1.jpg",
    tipo: "aliado",
  },
  {
    id: 2,
    nombre: "Aliado 2",
    imagen: "/img/aliado2.jpg",
    tipo: "aliado",
  },
];

export const usuariosEscuelas = [
  {
    id: 3,
    nombre: "Escuela 1",
    imagen: "/img/escuela1.jpg",
    tipo: "escuela",
  },
  {
    id: 4,
    nombre: "Escuela 2",
    imagen: "/img/escuela2.jpg",
    tipo: "escuela",
  },
];

export const publicaciones = [
  {
    id: 1,
    usuarioId: 1,
    fecha: "2023-10-15",
    titulo: "Renovación de nuestra biblioteca escolar",
    descripcion:
      "Gracias al apoyo de Fundación Educativa Futuro, hemos logrado renovar completamente nuestra biblioteca con nuevos libros y mobiliario. Los estudiantes están encantados con el nuevo espacio de lectura.",
    imagenes: ["/img/escuela1.png", "/img/doona1.png"],
    participantes: [1, 3],
    likes: 24,
    comentarios: [
      {
        usuarioId: 3,
        texto: "¡Fue un placer colaborar en este proyecto! Los niños merecen espacios dignos para su educación.",
        fecha: "2023-10-15",
      },
    ],
  },
  {
    id: 2,
    usuarioId: 2,
    fecha: "2023-09-28",
    titulo: "Nuevo laboratorio de computación",
    descripcion:
      "Estamos muy agradecidos con TechMex Empresarial por la donación de 20 computadoras nuevas para nuestro laboratorio. Ahora nuestros estudiantes podrán desarrollar habilidades digitales con equipos de última generación.",
    imagenes: ["/img/doona1.png"],
    participantes: [2, 4],
    likes: 35,
    comentarios: [
      {
        usuarioId: 4,
        texto: "Nos alegra mucho ver el impacto positivo de esta donación. ¡Seguiremos apoyando!",
        fecha: "2023-09-29",
      },
    ],
  },
];

export const mensajes = [
  {
    id: 1,
    emisorId: 1,
    receptorId: 3,
    conversacion: [
      {
        emisorId: 1,
        texto: "Hola, estamos interesados en su programa de donación de libros.",
        fecha: "2023-10-01T10:30:00",
      },
      {
        emisorId: 3,
        texto:
          "¡Hola! Claro, estaríamos encantados de apoyarles. ¿Podríamos agendar una videollamada para discutir los detalles?",
        fecha: "2023-10-01T11:45:00",
      },
      {
        emisorId: 1,
        texto: "Por supuesto, ¿les parece bien este jueves a las 10am?",
        fecha: "2023-10-01T13:20:00",
      },
      {
        emisorId: 3,
        texto: "Perfecto, agendaré la reunión. Nos vemos el jueves.",
        fecha: "2023-10-01T14:05:00",
      },
    ],
  },
  {
    id: 2,
    emisorId: 2,
    receptorId: 4,
    conversacion: [
      {
        emisorId: 2,
        texto: "Buenas tardes, queremos agradecer nuevamente por la donación de equipos para nuestro laboratorio.",
        fecha: "2023-09-30T15:10:00",
      },
      {
        emisorId: 4,
        texto: "Es un placer poder contribuir. ¿Cómo ha sido la experiencia de los estudiantes con los nuevos equipos?",
        fecha: "2023-09-30T16:30:00",
      },
      {
        emisorId: 2,
        texto: "Están muy emocionados. Ya hemos comenzado a implementar los talleres de programación básica.",
        fecha: "2023-10-01T09:15:00",
      },
    ],
  },
]

export const posts = [
  {
    id: 1,
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
    },
    image: "/img/doona1.png",
    likes: 124,
    caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
  },
  {
    id: 2,
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
    },
    image: "/img/doona1.png",
    likes: 124,
    caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
  },
  {
    id: 3,
    nombre: "Vegetta777",
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
    },
    image: "/img/doona1.png",
    likes: 124,
    caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
  },
  {
    id: 4,
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
    },
    image: "/img/doona1.png",
    likes: 124,
    caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
  },
  {
    id: 5,
    user: {
      name: "Vegetta777",
      image: "/img/vegetta777.png",
    },
    image: "/img/doona1.png",
    likes: 124,
    caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
  },
  {
    id: 6,
    user: {
      name: "Alfredo.tinieblas",
      image: "/img/Persona1.png",
    },
    image: "/img/escuela1.png",
    likes: 89,
    caption: "Diseño para nuevos salones de clase",
  },
]