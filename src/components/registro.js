"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronDown } from "lucide-react"

export default function RegistrationForm() {
  const router = useRouter()
  const [userType, setUserType] = useState("escuela") // Default to escuela
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Campos comunes
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Campos para Escuelas
  const [institutionName, setInstitutionName] = useState("")
  const [street, setStreet] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [betweenStreet1, setBetweenStreet1] = useState("")
  const [betweenStreet2, setBetweenStreet2] = useState("")
  const [observations, setObservations] = useState("")
  const [cct, setCct] = useState("")
  const [directorName, setDirectorName] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [documentValid, setDocumentValid] = useState("")

  // Campos para Administradores
  const [name, setName] = useState("")
  const [verificationCode, setVerificationCode] = useState("")

  // Campos para Aliados
  const [representativeName, setRepresentativeName] = useState("")
  const [personType, setPersonType] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [incomeProof, setIncomeProof] = useState("")

  // Mensajes de error
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  // Validaciones
  const validateEmail = (e) => {
    const value = e.target.value
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (regex.test(value)) {
      setEmailError("")
    } else {
      setEmailError("El correo ingresado no es válido")
    }
    setEmail(value)
  }

  const validatePassword = (e) => {
    const value = e.target.value
    const regex = /^[A-Za-z0-9]{8,}$/
    if (regex.test(value)) {
      setPasswordError("")
    } else {
      setPasswordError("La contraseña debe tener al menos 8 caracteres alfanuméricos")
    }
    setPassword(value)
  }

  const validateConfirmPassword = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    if (value === password) {
      setConfirmPasswordError("")
    } else {
      setConfirmPasswordError("Las contraseñas no coinciden")
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos al servidor
    alert("Formulario enviado con éxito")
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 uppercase">Mi escuela primero</h1>
        <p className="text-gray-500">Registro de Usuario</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos comunes para todos los tipos de usuario */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={validateEmail}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
            placeholder="ejemplo@correo.com"
            required
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={validatePassword}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
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
          {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={validateConfirmPassword}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}
        </div>
        {/* Selector de tipo de usuario */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Tipo de Usuario</label>
          <div className="relative">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none appearance-none"
            >
              <option value="escuela">Escuela</option>
              <option value="administrador">Administrador</option>
              <option value="aliado">Aliado</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Campos específicos para Escuelas */}
        {userType === "escuela" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre de la institución</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el nombre de la institución"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Calle</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa la calle"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Colonia</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa la colonia"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Entre calle 1</label>
                <input
                  type="text"
                  value={betweenStreet1}
                  onChange={(e) => setBetweenStreet1(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Entre calle 1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Entre calle 2</label>
                <input
                  type="text"
                  value={betweenStreet2}
                  onChange={(e) => setBetweenStreet2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Entre calle 2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Observaciones adicionales"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CCT</label>
                <input
                  type="text"
                  value={cct}
                  onChange={(e) => setCct(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa el CCT"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Código Postal</label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa el código postal"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre del director</label>
              <input
                type="text"
                value={directorName}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el nombre del director"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Documento de validacion</label>
              <input
                type="file"
                value={documentValid}
                onChange={(e) => setDirectorName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el nombre del director"
                required
              />
            </div>
          </>
        )}

        {/* Campos específicos para Administradores */}
        {userType === "administrador" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Código de verificación</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el código de verificación"
                required
              />
            </div>
          </>
        )}

        {/* Campos específicos para Aliados */}
        {userType === "aliado" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Nombre del representante</label>
              <input
                type="text"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el nombre del representante"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Tipo de persona</label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="personType"
                    value="fisica"
                    checked={personType === "fisica"}
                    onChange={() => setPersonType("fisica")}
                    className="w-4 h-4 text-green-500 focus:ring-green-500"
                  />
                  <span>Persona Física</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="personType"
                    value="moral"
                    checked={personType === "moral"}
                    onChange={() => setPersonType("moral")}
                    className="w-4 h-4 text-green-500 focus:ring-green-500"
                  />
                  <span>Persona Moral</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Código Postal</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Ingresa el código postal"
                required
              />
            </div>

            {personType === "moral" && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa el nombre de la empresa"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Calle</label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa la calle"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Colonia</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Ingresa la colonia"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Entre calle 1</label>
                <input
                  type="text"
                  value={betweenStreet1}
                  onChange={(e) => setBetweenStreet1(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Entre calle 1"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Entre calle 2</label>
                <input
                  type="text"
                  value={betweenStreet2}
                  onChange={(e) => setBetweenStreet2(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                  placeholder="Entre calle 2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Observaciones</label>
              <textarea
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Observaciones adicionales"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Acta de situacion fiscal o carta constitutiva</label>
              <input
                type="file"
                onChange={(e) => setIncomeProof(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                required
              />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold
                      hover:bg-green-600 active:bg-green-700 
                      transform transition-all duration-200 
                      hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Regresar
          </button>
          <button
            type="submit"
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
  )
}

