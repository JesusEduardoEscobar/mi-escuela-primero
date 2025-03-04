"use-client"
import Inicio from '@/components/inicio'
import TransitionPage from '@/components/transition-page'

export default function page() {
  return (
    <div className='pb-20'>
      <TransitionPage />
      <Inicio />
    </div>
  )
}
