"use client"

import MotionTransition from '@/components/transition-component'
import Agregar from '@/components/crearPost'
import { useRequiereAuth } from '@/utils/ComprobacionDePerfil'

export default function Agergar() {
  // useRequiereAuth()
  
  return (
    <div>
        <MotionTransition />
        <Agregar />
    </div>
  )
}
