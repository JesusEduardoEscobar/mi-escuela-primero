"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {

  // Carousel state
  const [currentImage, setCurrentImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  const user_roles = {
    1: "escuela",
    2: "aliado",
    3: "admin",
  }

  const images = [
    "https://imgs.search.brave.com/Pwq-e9rPFpdlmds3hWMZkC3ypgLlBx0Hh0exgyOCf3w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZ2xn/Lm9yZy5wYS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAxOC8xMS9Q/cm9ncmFtYS1NaS1F/c2N1ZWxhLVByaW1l/cm8tMDAwLmpwZw",
    "https://imgs.search.brave.com/uiLZ86IfaMpRJL1MTw1J2lwui_bEvQBzxDOanTYshhQ/rs:fit:860:0:0:0/g:ce/aHR0cDovL3d3dy5n/b2IubXgvY21zL3Vw/bG9hZHMvaW1hZ2Uv/ZmlsZS81MDQ5MS9f/ZXNjdWVsYV9wcmlt/YXJpYV9taV9wYXRy/aWFfZXNfcHJpbWVy/b18zLmpwZw",
    "https://imgs.search.brave.com/7Q1Hi7qudoypScHzyserBmWnIrVqZa7bAs--Zss4T-0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZXhp/Y2Fub3NwcmltZXJv/amFsaXNjby5vcmcv/bGFuZGluZy93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyNC8wOC9N/aS1Fc2N1ZWxhLVBy/aW1lcm8tMDItMjA0/OHgxMzczLnBuZw",
  ]

  // Form state
  const [correo, setCorreo] = useState("")
  const [contra, setContra] = useState("")
  const [token, setToken] = useState("")
  const [mensajeCorreo, setMensajeCorreo] = useState("")
  const [mensajeContra, setMensajeContra] = useState("")
  const [mensajeToken, setMensajeToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // Auto-rotate carousel
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPaused, images.length])

  // Carousel navigation
  const nextImage = () => {
    setIsPaused(true)
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  const prevImage = () => {
    setIsPaused(true)
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  // Form validation
  const router = useRouter()

  const validarCorreo = (e) => {
    setCorreo(e.target.value)
  }

  const validarContra = (e) => {
    setContra(e.target.value)
  }

  const validarToken = (e) => {
    setToken(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!correo.trim() || !contra.trim()) {
      setError("Por favor, completa todos los campos obligatorios.")
      return
    }

    try {
      const response = await fetch("http://localhost:1984/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: correo, password: contra }),
      });

      console.log("Status de la respuesta:", response.status);

      if (!response.ok) {
          const errorData = await response.json();
          console.error("Error en el login:", errorData);
          throw new Error(errorData.message || "Error en el inicio de sesión");
      }

      const data = await response.json();
      console.log("Datos recibidos completos:", data);

      // Validar que `data.user` existe antes de acceder a `tipoUsuario`
      if (!data.user || !data.user.tipoUsuario) {
          throw new Error("Datos de usuario inválidos en la respuesta");
      }

      // Guardar el token en localStorage
      localStorage.setItem("token", data.token);

      // Verificar el tipo de usuario y redirigir
      const userType = data.user.tipoUsuario;
      console.log("Tipo de usuario:", userType);

      let redirectUrl = "/"; // Default redirect en caso de error

      if (userType === 3) {
          redirectUrl = "/admin/paginaPrincipal";
      } else if (userType === 1 || userType === 2) {
          redirectUrl = "/usuarios/paginaPrincipal";
      } else {
          throw new Error("Tipo de usuario no reconocido");
      }

      console.log("Redirigiendo a:", redirectUrl);
      router.push(redirectUrl);

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      setError(error.message || "Error en el servidor. Intenta nuevamente.");
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Carousel and description with same gradient background */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-green-500 to-white p-10 flex flex-col">
        <div className="relative h-64 md:h-96 mb-6 rounded-lg overflow-hidden shadow-lg">
          <img
            src={images[currentImage] || "/placeholder.svg"}
            alt={`Slide ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsPaused(true)
                  setCurrentImage(index)
                  setTimeout(() => setIsPaused(false), 10000)
                }}
                className={`h-2 w-2 rounded-full ${currentImage === index ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="prose">
          <h2 className="text-2xl font-bold mb-4 text-black">Mi escuela primero</h2>
          <p className="text-black">
            "Mi Escuela Primero" es un proyecto en Jalisco que impulsa la mejora de escuelas públicas a través de la
            colaboración entre empresas, organizaciones y la comunidad. Su objetivo es garantizar que niñas, niños y
            jóvenes tengan acceso a una educación de calidad en espacios adecuados.
          </p>
          <p className="text-black">Este programa se enfoca en:</p>
          <ul className="list-disc pl-5 text-black">
            <li>Formación y capacitación para docentes, estudiantes y familias.</li>
            <li>Suministro de material y equipamiento escolar.</li>
            <li>Mejoras en infraestructura para brindar entornos seguros y óptimos.</li>
          </ul>

          <p className="text-black">
            Gracias a estas acciones, "Mi Escuela Primero" ha fortalecido el aprendizaje y la permanencia escolar,
            logrando un impacto positivo en miles de estudiantes.
          </p>
          <p className="text-black font-bold">¡Súmate y ayuda a transformar la educación en Jalisco!</p>
        </div>
      </div>

      {/* Right side - Login form with green to white gradient */}
      <div className="w-full md:w-1/2 bg-gradient-to-b from-green-500 to-white p-6 md:p-12 flex items-center justify-center">
        <div className="absolute top-4 right-4 flex space-x-4">
          <h1 className="text-3xl font-bold mb-6 text-center text-green-900 mt-7">Conocenos:</h1>
          <a href="https://www.mexicanosprimero.org" target="_blank" rel="noopener noreferrer">
            <Image
              src="/img/Mexicanos_Primero_Jalisco_blanco.png"
              width={100}
              height={100}
              alt="Mexicanos Primero Jalisco"
            />
          </a>
        </div>

        <div className="w-full max-w-md p-8 bg-white/70 rounded-lg shadow-md">
          <div className="flex items-center justify-center">
            <Image src="/img/Mi_Escuela_Primero.png" width={200} height={10} alt="Mi Escuela Primero" />
          </div>
          <h1 className="text-3xl font-bold mb-6 text-center text-green-900">Iniciar Sesión</h1>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <input
                  type="email"
                  value={correo}
                  onChange={validarCorreo}
                  className="w-full px-4 pl-10 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="ejemplo@correo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-green-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={contra}
                  onChange={validarContra}
                  className="w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Token</label>
              <input
                type="text"
                value={token}
                onChange={validarToken}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa tu token"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold
                          hover:bg-green-600 active:bg-green-700 
                          transform transition-all duration-200 
                          hover:scale-[1.02] active:scale-[0.98]
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Ingresar
              </button>
              <button
                type="button"
                onClick={() => router.push("/Registro")}
                className="w-full bg-white text-green-500 py-3 rounded-lg font-semibold
                          border-2 border-green-500
                          hover:bg-green-50 active:bg-green-100
                          transform transition-all duration-200
                          hover:scale-[1.02] active:scale-[0.98]
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
