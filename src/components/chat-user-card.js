import Link from 'next/link'
import Image from 'next/image'

export function ChatUserCard({ user }) {
    return (
        <Link href={`/admin/chat/${user.id}`}>
            <div className='flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors'>
                <div className='relative h-12 w-12 rounded-full overflow-hidden'>
                    <Image src={user.imagen || '/placeholder.svg'} alt={user.nombre} fill className='"object-cover' />
                </div>
                <div className='ml-3'>
                    <h3 className='font-medium'>{user.nombre}</h3>
                    <p className='text-sm text-gray-500'>{user.institucion}</p>
                </div>
            </div>
        </Link>
    )
}