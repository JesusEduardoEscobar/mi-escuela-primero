"use client"
import SalaMensaje from '@/components/salaMensaje'
import TransitionPage from '@/components/transition-page'

export default function page() {
  return (
    <div className=' pb-20'>
      <TransitionPage />
      <SalaMensaje />
    </div>
  )
}
