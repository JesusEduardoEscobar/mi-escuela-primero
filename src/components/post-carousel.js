"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PostCarousel({ images, usuarioId, altText = "Post image" }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si no hay imágenes o solo hay una, no mostramos controles
  const showControls = images.length > 1

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  // Si no hay imágenes, mostramos un placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square">
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${altText} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />

      {/* Controles de navegación */}
      {showControls && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              goToPrevious()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow-md hover:bg-white/90 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              goToNext()
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow-md hover:bg-white/90 transition-colors"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicadores de posición */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  goToSlide(index)
                }}
                className={`w-2 h-2 rounded-full ${currentIndex === index ? "bg-primary" : "bg-white/70"}`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

