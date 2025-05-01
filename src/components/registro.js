"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ChevronDown, Upload, Loader2 } from "lucide-react"

export default function RegistrationForm() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const [userType, setUserType] = useState("escuela") // Default to escuela
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState("")
  const [showPrivacyTerms, setShowPrivacyTerms] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  // Campos comunes
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userName, setUserName] = useState("") // Nombre para todos los usuarios
  const [userStatus, setUserStatus] = useState(1) // Estado del usuario (activo por defecto)

  // Campos para escuelas y aliados
  const [phoneNumber, setPhoneNumber] = useState("")

  // Campos para Escuelas
  const [institutionName, setInstitutionName] = useState("")
  const [street, setStreet] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [cct, setCct] = useState("")
  const [directorName, setDirectorName] = useState("")
  const [zipCode, setZipCode] = useState("")
  const [studentCount, setStudentCount] = useState("")
  const [documentValid, setDocumentValid] = useState(null)

  // Campos para Administradores
  const [verificationCode, setVerificationCode] = useState("")

  // Campos para Aliados
  const [representativeName, setRepresentativeName] = useState("")
  const [personType, setPersonType] = useState("")
  const [sector, setSector] = useState("") // Sector para aliados
  const [companyName, setCompanyName] = useState("")
  const [incomeProof, setIncomeProof] = useState(null)

  // Mensajes de error
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [submitError, setSubmitError] = useState("")

  // Validaciones
  const validateEmail = (e) => {
    const value = e.target.value
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Validación básica de formato de correo
    if (!regex.test(value)) {
      setEmailError("El correo ingresado no es válido")
      setEmail(value)
      return
    }

    if (userType === "administrador") {
      const dominioAdmin = /@mpj\.org\.mx$/
      if (!dominioAdmin.test(value)) {
        setEmailError("Los administradores deben usar un correo específico")
        setEmail(value)
        return
      }
    }
    setEmailError("")
    setEmail(value)
    return
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

  const validatePhoneNumber = (e) => {
    const value = e.target.value
    // Permitir solo números y un máximo de 10 dígitos
    const regex = /^[0-9]{0,10}$/
    if (regex.test(value)) {
      setPhoneNumber(value)
      if (value.length === 10) {
        setPhoneError("")
      } else if (value.length > 0) {
        setPhoneError("El número debe tener 10 dígitos")
      } else {
        setPhoneError("")
      }
    }
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDocumentChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setDocumentValid(file)
    }
  }

  const handleIncomeProofChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setIncomeProof(file)
    }
  }

  // Validar Token solo si es administrador
  if (userType === "admin") {
    const regexLettersNumbersMax8 = /^[a-zA-Z]\d{1,6}[a-zA-Z]$/;
    if (!regexLettersNumbersMax8.test(verificationCode)) {
      setVerificationCodeError(
        "El código debe comenzar y terminar con letras, contener números en el  medio y tener un máximo de 8 caracteres."
      );
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden")
      return
    }

    // Validar email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
      setEmailError("El correo ingresado no es válido")
      return
    }

    // Validar contraseña
    const passwordRegex = /^[A-Za-z0-9]{8,}$/
    if (!passwordRegex.test(password)) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres alfanuméricos")
      return
    }

    // Validar número de teléfono
    if (phoneNumber.length > 0 && phoneNumber.length !== 10) {
      setPhoneError("El número debe tener 10 dígitos")
      return
    }

    // Validar aceptación de términos para escuelas y aliados
    if ((userType === "escuela" || userType === "aliado") && !acceptedTerms) {
      setSubmitError("Debes aceptar los términos de privacidad para continuar")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Crear FormData para enviar archivos
      const formData = new FormData()

      // Agregar campos comunes
      formData.append("userType", userType)
      formData.append("email", email)
      formData.append("password", password)
      formData.append(
        "name",
        userType === "administrador" ? name : userType === "escuela" ? institutionName : representativeName,
      )
      formData.append("estado", userStatus.toString())

      if (phoneNumber) {
        formData.append("phoneNumber", phoneNumber)
      }

      // Agregar foto de perfil si existe
      if (profileImage) {
        formData.append("profileImage", profileImage)
      }

      // Agregar campos específicos según el tipo de usuario
      if (userType === "escuela") {
        formData.append("institutionName", institutionName)
        formData.append("street", street)
        formData.append("neighborhood", neighborhood)
        formData.append("cct", cct)
        formData.append("directorName", directorName)
        formData.append("zipCode", zipCode)
        formData.append("studentCount", studentCount)
        formData.append("acceptedTerms", acceptedTerms.toString())

        if (documentValid) {
          formData.append("documentValid", documentValid)
        }
      } else if (userType === "administrador") {
        formData.append("verificationCode", verificationCode)
      } else if (userType === "aliado") {
        formData.append("representativeName", representativeName)
        formData.append("personType", personType === "fisica" ? "1" : "0")
        formData.append("sector", sector)
        formData.append("street", street)
        formData.append("neighborhood", neighborhood)
        formData.append("zipCode", zipCode)
        formData.append("acceptedTerms", acceptedTerms.toString())

        if (personType === "moral") {
          formData.append("companyName", companyName)
        }

        if (incomeProof) {
          formData.append("incomeProof", incomeProof)
        }
      }

      // Enviar datos al backend
      const response = await fetch("http://localhost:1984/api/registrar", {
        method: "POST",
        body: formData,
        credentials: "include", // Para manejar cookies si es necesario
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al registrar usuario")
      }

      const data = await response.json()

      // Redireccionar según la respuesta del servidor
      if (data.redirectUrl) {
        router.push(data.redirectUrl)
      } else {
        // Redirección predeterminada
        router.push("/")
      }
    } catch (error) {
      console.error("Error al registrar:", error)
      setSubmitError(error.message || "Ocurrió un error al registrar. Por favor, intenta de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl mx-auto border border-green-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-green-50 opacity-70"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-green-50 opacity-70"></div>

        <div className="text-center space-y-2 mb-8 relative">
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

          {/* Campo de teléfono para todos los usuarios */}
          {(userType === "escuela" || userType === "aliado") && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Número de teléfono</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={validatePhoneNumber}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="10 dígitos"
                maxLength={10}
              />
              {phoneError && <p className="text-xs text-red-500">{phoneError}</p>}
            </div>
          )}

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
                <option value="aliado">Aliado</option>
                <option value="administrador">Administrador</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            </div>
          </div>

          {/* Contenedor con altura y ancho fijos para los campos específicos */}
          <div className="min-h-[400px] w-full">
            {/* Foto de perfil para escuelas y aliados */}
            {(userType === "escuela" || userType === "aliado") && (
              <div className="space-y-2 mb-6">
                <label className="block text-sm font-medium text-gray-700">Foto de perfil</label>
                <div className="flex flex-col items-center space-y-4">
                  {profileImagePreview ? (
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-green-500">
                      <img
                        src={profileImagePreview || "/placeholder.svg"}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProfileImage(null)
                          setProfileImagePreview("")
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:border-green-500"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Upload size={32} className="text-gray-400" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                  >
                    {profileImagePreview ? "Cambiar foto" : "Subir foto"}
                  </button>
                </div>
              </div>
            )}

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
                  <label className="block text-sm font-medium text-gray-700">Número de alumnos</label>
                  <input
                    type="number"
                    value={studentCount}
                    onChange={(e) => setStudentCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="Ingresa el número total de alumnos"
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Documento de validación</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      onChange={handleDocumentChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                      required
                      name="documentValid"
                    />

                  </div>
                </div>
              </>
            )}

            {/* Campos específicos para Administradores */}
            {userType === "administrador" && (
              <div className="w-full space-y-6 py-10">
                <div className="space-y-2 w-full">
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                    placeholder="Ingresa tu nombre completo"
                    required
                  />
                </div>

                <div className="space-y-2 w-full">
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
              </div>
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
                  <label className="block text-sm font-medium text-gray-700">Sector</label>
                  <select
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none appearance-none"
                    required
                  >
                    <option value="">Selecciona un sector</option>
                    <option value="Educación">Educación</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Salud">Salud</option>
                    <option value="Alimentación">Alimentación</option>
                    <option value="Construcción">Construcción</option>
                    <option value="Otro">Otro</option>
                  </select>
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

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Acta de situación fiscal o carta constitutiva
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="file"
                      onChange={handleIncomeProofChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 outline-none"
                      required
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Términos de privacidad para escuelas y aliados */}
          {(userType === "escuela" || userType === "aliado") && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  He leído y acepto los{" "}
                  <a
                    href="/politicas.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-700 font-medium"
                  >
                    términos de privacidad  
                  </a>
                </label>
              </div>
              {submitError && submitError.includes("términos") && <p className="text-xs text-red-500">{submitError}</p>}
            </div>
          )}

          {/* Mensaje de error general */}
          {submitError && !submitError.includes("términos") && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">{submitError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 mt-auto">
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
              disabled={isSubmitting}
              className="w-full bg-white text-green-500 py-3 rounded-lg font-semibold
                    border-2 border-green-500
                      hover:bg-green-50 active:bg-green-100
                      transform transition-all duration-200
                      hover:scale-[1.02] active:scale-[0.98]
                      focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Procesando...</span>
                </div>
              ) : (
                "Registrarse"
              )}
            </button>
          </div>
        </form>

        {/* Modal de términos de privacidad */}
        {showPrivacyTerms && <PrivacyTermsModal />}
      </div>
  )
}
