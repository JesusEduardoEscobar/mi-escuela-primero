  "use client"

  import React, { useState } from 'react'
  import { useRouter } from 'next/navigation'
  import Registro from './registro'

  export default function Inicio() {
    // Constantes para el codigo y la validacion
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [contra, setContra] = useState('')
    const [token, setToken] = useState('')
    const [mensajeNombre, setMensajeNombre] = useState('')
    const [mensajeCorreo, setMensajeCorreo] = useState('')
    const [mensajeContra, setMensajeContra] = useState('')
    const [mensajeToken, setMensajeToken] = useState('')

    // Funcion para dirigirme de una pagina a otra
    const router = useRouter()
    const [mostrarRegistro, setMostrarRegistro] = useState(false)

    const validarNombre = (e) => {
      const regexNombre = /^[A-Za-z\s]{3,}$/
      if (regexNombre.test(e.target.value)) {
        setMensajeNombre("✅ El nombre ingresado es válido")
      } else {
        setMensajeNombre('❌ Usted ha ingresado un nombre inválido')
      }
      setNombre(e.target.value)
    }

    const validarCorreo = (e) => {
      const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (regexCorreo.test(e.target.value)) {
        setMensajeCorreo("✅ El correo ingresado es válido")
      } else {
        setMensajeCorreo("❌ El correo ingresado no es válido")
      }
      setCorreo(e.target.value)
    }

    const validarContra = (e) => {
      const regexContra = /^[A-Za-z1-9]{5,}$/
      if (regexContra.test(e.target.value)) {
        setMensajeContra("✅ La contraseña ingresada es válida")
      } else {
        setMensajeContra("❌ La contraseña ingresada no es válida")
      }
      setContra(e.target.value)
    }

    const validarToken = (e) => {
      const valor = e.target.value;
      const regexToken = /^.[A-Z]{4}[0-9]{2}$/
      if(regexToken.test(valor)){
        setMensajeToken("✅ El token ingresado es valido")
      } else {
        setMensajeToken("❌ El token ingresado no es valido")
      }
    }

    return (
      <div className='b-shadow flex flex-col items-center justify-center w-[50%] p-6 bg-white shadow-lg rounded-lg'>
        <label className='mb-1 text-lg font-semibold'>Ingresa tu nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={validarNombre}
          className="p-2 border border-gray-400 rounded w-full"
        />
        <p className="text-sm text-gray-600">{mensajeNombre}</p>

        <label className='mt-4 mb-1 text-lg font-semibold'>
          Ingresa tu correo electrónico:
        </label>
        <input
          type="email"
          value={correo}
          onChange={validarCorreo}
          className="p-1 border border-gray-400 rounded w-full"
        />
        <p className="text-sm text-gray-600">{mensajeCorreo}</p>

        <label className='mt-4 mb-1 text-lg font-semibold'>
          Ingresa tu contraseña:
        </label>
        <input
          type='password'
          value={contra}
          onChange={validarContra}
          className='p-1 border border-gray-400 rounded w-full'
        />
        <p className="text-sm text-gray-600">{mensajeContra}</p>

        <label className='mt-4 mb-1 text-lg font-semibold'>
          Ingresa tu token
        </label>
        <input
          type='text'
          value={token}
          onChange={validarToken}
          className='p-1 border border-gray-400 rounded w-full'
        />
        <p className="text-sm text-gray-600">{mensajeToken}</p>

        {/* Btn para regresar a la pagina de inicio de sesion */}
        <div className="mt-6 flex gap-6 w-full">
          <button
            onClick={() => router.push('/')}
            className="bg-green-500 text-white px-4 py-3 rounded  hover:bg-green-600 transition w-full"
          >
            Regresar
          </button>
          {/* Botón para ir a la página de registro */}
          <button
            onClick={() => router.push('/paginaIncio')}
            className="bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition w-full"
          >
            Ingersar
          </button>
        </div>
      </div>
    )
  }
