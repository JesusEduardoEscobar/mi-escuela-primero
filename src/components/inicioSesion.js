"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react" 

export default function Inicio() {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [contra, setContra] = useState("")
  const [token, setToken] = useState("")
  const [mensajeNombre, setMensajeNombre] = useState("")
  const [mensajeCorreo, setMensajeCorreo] = useState("")
  const [mensajeContra, setMensajeContra] = useState("")
  const [mensajeToken, setMensajeToken] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const validarNombre = (e) => {
    const regexNombre = /^[A-Za-z\s]{3,}$/
    if (regexNombre.test(e.target.value)) {
      setMensajeNombre("El nombre ingresado es válido")
    } else {
      setMensajeNombre("Usted ha ingresado un nombre inválido")
    }
    setNombre(e.target.value)
  }

  const validarCorreo = (e) => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regexCorreo.test(e.target.value)) {
      setMensajeCorreo("El correo ingresado es válido")
    } else {
      setMensajeCorreo("El correo ingresado no es válido")
    }
    setCorreo(e.target.value)
  }

  const validarContra = (e) => {
    const regexContra = /^[A-Za-z1-9]{5,}$/
    if (regexContra.test(e.target.value)) {
      setMensajeContra("La contraseña ingresada es válida")
    } else {
      setMensajeContra("La contraseña ingresada no es válida")
    }
    setContra(e.target.value)
  }

  const validarToken = (e) => {
    const valor = e.target.value
    const regexToken = /^.[A-Z]{4}[0-9]{2}$/
    if (regexToken.test(valor)) {
      setMensajeToken("El token ingresado es valido")
    } else {
      setMensajeToken("El token ingresado no es valido")
    }
    setToken(valor)
  }

  return (
    <div className="h-full bg-gradient-to-t from-green-500 to-white">
      <div className="bg-white">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 uppercase">Mi escuela primero</h1>
          <p className="text-gray-500">Ingresa tus datos para acceder</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={validarNombre}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="Ingresa tu nombre"
            />
            <p className={`text-xs ${mensajeNombre.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeNombre}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={correo}
              onChange={validarCorreo}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="ejemplo@correo.com"
            />
            <p className={`text-xs ${mensajeCorreo.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeCorreo}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={contra}
                onChange={validarContra}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            <p className={`text-xs ${mensajeContra.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeContra}
            </p>
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
            <p className={`text-xs ${mensajeToken.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeToken}
            </p>
          </div>

          <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => router.push("/paginaPrincipal")}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold
                        hover:bg-green-600 active:bg-green-700 
                        transform transition-all duration-200 
                        hover:scale-[1.02] active:scale-[0.98]
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
            <button
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
        </div>
      </div>
    </div>
  )
}

