"use client"

import React, { useState } from 'react'

export default function inicio() {
  // Expresiones
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contra, setContra] = useState('')
  const [mensajeNombre, setMensajeNombre] = useState('')
  const [mensajeCorreo, setMensajeCorreo] = useState('')
  const [mensajeContra, setMensajeContra] = useState('')

  const validarNombre = (e) => {
    const regexNombre = /^[A-Za-z\s]+$/
    if(regexNombre.test(e.target.value)){
      setMensajeNombre("El nombre ingresado el valido")
    } else {
      setMensajeNombre('Usted ha ingresado un nombre invalido')
    }
    setNombre(e.target.value)
  }

  const validarCorreo = (e) => {
    const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if(regexCorreo.test(e.target.value)){
      setMensajeCorreo("El correo ingresado es valido")
    } else {
      setMensajeCorreo("El correo ingresado no es valida")
    }
    setCorreo(e.target.value)
  }
  const validarContra = (e) => {
    const regexContra = /^[A-Za-z1-9]+$/
    if(regexContra.test(e.target.value)){
      setMensajeContra("La contraseña ingresada es valida")
    } else {
      setMensajeContra("La contraseña ingresada no es valida")
    }
    setContra(e.target.value)
  }

  return (
    <div className='b-shadow flex flex-col items-center justify-center w-[50%]'>
      <label className='mx-auto mb-2 text-[18px] md:mx-0 md:mb-8 text-justify'>
        Ingresa tu nombre:
      </label>
      <input
        type="text"
        value={nombre}
        onChange={validarNombre}
        className="mx-2 p-2 border border-gray-400 rounded"
      />
      <p>{mensajeNombre}</p>

      <label className='mx-auto mt-4 mb-2 text-[18px] md:mx-0 md:mb-8 text-justify'>
        Ingresa tu correo electrónico:
      </label>
      <input
        type="email"
        value={correo}
        onChange={validarCorreo}
        className="mx-2 p-2 border border-gray-400 rounded"
      />
      <p>{mensajeCorreo}</p>

      <label className='mx-auto mt-4 mb-2 text-[18px] md:mx-0 md:mb-8 text-justify'>
        Ingresa tu contraseña:
      </label>
      <input
        type='password'
        value={contra}
        onChange={validarContra}
        className='mx-2 p-2 border border-gray-400 rounded'
      />
      <p>{mensajeContra}</p>
    </div>
  )
}