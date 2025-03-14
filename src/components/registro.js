"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react" 
import { Checkbox } from "@mui/material"

export default function Inicio() {
  const [nombre, setNombre] = useState("")
  const [nombreEscuela, setNombreEscuela] = useState("")
  const [correo, setCorreo] = useState("")
  const [contra, setContra] = useState("")
  const [verificarContra, setVerificarContra] = useState("")
  const [token, setToken] = useState("")
  const [checkbox, setCheckbox] = useState("")
  const [mensajeNombre, setMensajeNombre] = useState("")
  const [mensajenombreEscuela, setMensajeNombreEscuela] = useState("")
  const [mensajeCorreo, setMensajeCorreo] = useState("")
  const [mensajeContra, setMensajeContra] = useState("")
  const [mensajeToken, setMensajeToken] = useState("")
  const [mensajeVerificarContra, setMensajeVerificarContra] = useState("")
  const [mensajeCheckbox, setMensajeCheckbox] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const validarNombre = (e) => {
    const valor = e.target.value
    const regexNombre = /^[A-Za-z\s]{3,}$/
    if (regexNombre.test(valor)) {
      setMensajeNombre("")
    } else {
      setMensajeNombre("Usted ha ingresado un nombre inválido")
    }
    setNombre(valor)
  }

  const validarNombreEscuela = (e) => {
    const valor = e.target.value
    const regexNombreEscuela =  /^[A-Za-z\s0-9]{3,}$/
    if(regexNombreEscuela.test(valor)){
      setMensajeNombreEscuela("")
    } else {
      setMensajeNombreEscuela("El nombre de la escuela es muy corto")
    }
  }

  const validarCorreo = (e) => {
    const valor = e.target.value
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regexCorreo.test(valor)) {
      setMensajeCorreo("")
    } else {
      setMensajeCorreo("El correo ingresado no es válido")
    }
    setCorreo(valor)
  }

  const validarContra = (e) => {
    const valor = e.target.value
    const regexContra = /^[A-Za-z1-9]{5,}$/
    if (regexContra.test(valor)) {
      setContra("")
    } else {
      setMensajeContra("La contraseña ingresada no es válida")
    }
    setContra(valor)
  }

  const compararContra = (e) => {
    const password1 = e.target.value 
    if(password1 === contra){
      setMensajeVerificarContra("")
    }else{
      setMensajeVerificarContra("Las contraseñas no coinciden")
    }
  }

  const validarToken = (e) => {
    const valor = e.target.value
    const regexToken = /^[A-Z]{4}[0-9]{2}$/
    if (regexToken.test(valor)) {
      setMensajeToken("")
    } else {
      setMensajeToken("El token ingresado no es valido")
    }
    setToken(valor)
  }

  const validarCheckbox = () => {
    if (!checkbox) {
      setMensajeCheckbox("❌ Debes aceptar las políticas para continuar.");
    } else {
      setMensajeCheckbox("✅ Políticas aceptadas.");
    }
  };

  return (
      <div className="">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800 uppercase">Mi escuela primero</h1>
          <p className="text-gray-500">Ingresa tus datos para acceder</p>
        </div>
        <div className="space-y-6">
          {/* Ingresar el nombre del usuario */}
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

          {/* Nombre de la escuela */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ingresa el nombre de la institucion
            </label>
            <input
              type="text"
              value={nombreEscuela}
              onChange={validarNombreEscuela}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="Ingresa el nombre de la institucion a la que pertenece"
            />
          </div>

          {/* Ingresar correo electronico */}
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

          {/* Ingresar contraseña */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
            <p className={`text-xs ${mensajeContra.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeContra}
            </p>
          </div>
          
          {/* Corroborar que ambas constreñas son correctas */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Verificar tu contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={verificarContra}
                onChange={compararContra}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500hover:text-gray-700"
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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Colonia</label>
            <input
              type="text"
              value={token}
              onChange={validarToken}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="Ingresa tu colonia"
            />
            <p className={`text-xs ${mensajeToken.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeToken}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Calle</label>
            <input
              type="text"
              value={token}
              onChange={validarToken}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="Ingresa tu calle"
            />
            <p className={`text-xs ${mensajeToken.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeToken}
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Descripcion</label>
            <input
              type="text"
              value={token}
              onChange={validarToken}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="Ingresa una descripcion"
            />
            <p className={`text-xs ${mensajeToken.includes("✅") ? "text-green-600" : "text-red-500"}`}>
              {mensajeToken}
            </p>
          </div>

          {/* CHECKBOX DE POLITICAS DE USO */}
          <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Acepta políticas de privacidad
      </label>

      <div className="flex items-center space-x-2">
        <Checkbox
          checked={checkbox}
          onChange={(checked) => setCheckbox(checked)}
          className="w-5 h-5 border-gray-300 rounded-md"
        />
        <a
          href="/politicas.pdf" // Ruta del PDF
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Ver políticas de privacidad
        </a>
      </div>

      <p className={`text-xs ${mensajeCheckbox.includes("✅") ? "text-green-600" : "text-red-500"}`}>
        {mensajeCheckbox}
      </p>
    </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold
                        hover:bg-green-600 active:bg-green-700 
                        transform transition-all duration-200 
                        hover:scale-[1.02] active:scale-[0.98]
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Regesar
            </button>
            <button
              onClick={() => router.push("/usuarios/paginaPrincipal")}
              className="w-full bg-white text-green-500 py-3 rounded-lg font-semibold
                      z  border-2 border-green-500
                        hover:bg-green-50 active:bg-green-100
                        transform transition-all duration-200
                        hover:scale-[1.02] active:scale-[0.98]
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
  )
}

