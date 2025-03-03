"use-client"
import Inicio from '@/components/incio'
import TransitionPage from '@/components/transition-page'

export default function page() {
  return (
    <div className='pt-10 pb-20'>
      <TransitionPage />
      <Inicio />
    </div>
  )
}
