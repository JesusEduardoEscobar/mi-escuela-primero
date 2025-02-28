"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Registro from './registro'

// Definimos un array de objetos con información de las personas
const people = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://example.com/john.jpg'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    imageUrl: 'https://example.com/jane.jpg'
  },
  // Agrega más personas según sea necesario
]

const Component = () => {
  const router = useRouter()

  return (
    <div className='b-shadow flex flex-col items-center justify-center w-[50%] p-6 bg-white shadow-lg rounded-lg'>
      <ul role="list">
        {people.map((person, index) => (
          <li key={index} className="flex py-4 first:pt-0 last:pb-0">
            <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{person.name}</p>
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">{person.email}</p>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  )
}

export default Component
