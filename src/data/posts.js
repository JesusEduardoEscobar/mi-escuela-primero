// Datos de ejemplo para los posts
export const postsData = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Carlos Mendoza",
      username: "carlosmendoza",
      image: "/placeholder.svg?height=150&width=150",
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Disfrutando de un día increíble en la playa ☀️🌊 #verano #playa #vacaciones",
    likes: 243,
    comments: [
      {
        id: 1001,
        user: "mariafernandez",
        text: "¡Qué envidia! Se ve increíble 😍",
      },
      {
        id: 1002,
        user: "juanperez",
        text: "Disfruta mucho amigo! 🙌",
      },
    ],
    date: "2023-07-15T14:23:45Z",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Laura Sánchez",
      username: "laurasanchez",
      image: "/placeholder.svg?height=150&width=150",
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Nueva receta que probé hoy, ¡quedó deliciosa! 🍲 #comida #recetas #chef",
    likes: 187,
    comments: [
      {
        id: 1003,
        user: "anagomez",
        text: "¡Se ve increíble! ¿Me pasas la receta? 😋",
      },
      {
        id: 1004,
        user: "robertodiaz",
        text: "Yo también quiero probarla 👨‍🍳",
      },
      {
        id: 1005,
        user: "sofialopez",
        text: "¡Qué buena pinta tiene! 👏",
      },
    ],
    date: "2023-07-14T18:45:12Z",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Miguel Torres",
      username: "migueltorres",
      image: "/placeholder.svg?height=150&width=150",
    },
    image: "/placeholder.svg?height=600&width=600",
    caption: "Nuevo proyecto en el que estoy trabajando. Pronto más novedades 🚀 #desarrollo #programacion #tech",
    likes: 342,
    comments: [
      {
        id: 1006,
        user: "davidruiz",
        text: "¡Tiene muy buena pinta! Esperando ver más 👀",
      },
      {
        id: 1007,
        user: "patriciagarcia",
        text: "¡Felicidades por el proyecto! 🎉",
      },
    ],
    date: "2023-07-13T09:12:33Z",
  },
]

// Función para obtener un post por ID
export function getPostById(id) {
  return postsData.find((post) => post.id === id)
}

// Función para obtener todos los posts
export function getAllPosts() {
  return postsData
}

// Función para obtener posts de un usuario específico
export function getPostsByUser(userId) {
  return postsData.filter((post) => post.user.id === userId)
}

// Datos de usuario actual (para simular un usuario logueado)
export const currentUser = {
  id: 106,
  name: "Tu Nombre",
  username: "@tunombre",
  image: "/placeholder.svg?height=150&width=150",
  bio: "Apasionado por la tecnología y la fotografía 📱📷\nDesarrollador web | Amante de los viajes\nContacto: ejemplo@email.com",
  followers: 342,
  following: 267,
  posts: 15,
}

