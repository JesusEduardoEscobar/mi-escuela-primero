import Post from "@/components/post"

export default function PaginaPrincipal() {
  return (
    <div className="min-h-screen bg-white">
      {/* Instagram-style posts */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-[470px] mx-auto space-y-6">
          <Post
            post={{
              id: 1,
              user: {
                name: "Vegetta777",
                image: "/img/vegetta777.png",
              },
              image: "/img/doona1.png",
              likes: 124,
              caption: "Tengo en mi diposicion para donar 20 sillas y 5 mesas en buneas condiciones",
              comments: [
                { user: "profesor_juan", text: "¡Excelente inicio de clases! 🎉" },
                { user: "maria_edu", text: "Me encanta ver el entusiasmo 💫" },
              ],
            }}
          />

          <Post
            post={{
              id: 2,
              user: {
                name: "Alfredo.tinieblas",
                image: "/img/Persona1.png",
              },
              image: "/img/escuela1.png",
              likes: 89,
              caption: "Diseño para nuevos salones de clase",
              comments: [
                { user: "padre_pedro", text: "¡Qué buena actividad! 👏" },
                { user: "ana_maestra", text: "Los niños están muy entusiasmados 😊" },
              ],
            }}
          />
        </div>
      </div>
    </div>
  )
}

