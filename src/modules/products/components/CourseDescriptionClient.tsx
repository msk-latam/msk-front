'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCourseDescription } from '../hooks/useCourseDescription'

interface ClientDescriptionProps {
  slug: string
  maxLength?: number
}

export default function CourseDescriptionClient({
  slug,
  maxLength = 600,
}: ClientDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { data, loading, error } = useCourseDescription(slug)

  const handleToggle = () => setIsExpanded(!isExpanded)

  const description = data?.content ?? ''
  const title = data?.title ?? 'Descripción del curso'

  if (loading) {
    return (
      <section className="bg-white rounded-[38px] md:pt-7 md:pb-3">
        <h1 className="text-2xl md:text-[34px] font-raleway font-medium mb-6 text-[#1A1A1A]">
          Cargando...
        </h1>
        <p className="text-[#1A1A1A] text-sm font-inter font-normal text-[16px] leading-[161%]">
          Cargando descripción...
        </p>
      </section>
    )
  }

  if (error || !description) {
    return null
  }

  // Detectar donde hacer el salto de párrafo
  const breakPhrase = 'En este curso de Medicina de urgencias te prepara'
  const breakIndex = description.indexOf(breakPhrase)

  let firstPart = description
  let secondPart = ''

  if (breakIndex !== -1) {
    firstPart = description.substring(0, breakIndex + breakPhrase.length)
    secondPart = description.substring(breakIndex + breakPhrase.length).trim()
  }

  // Controlar si se aplica truncado
  const displayFirstPart = isExpanded
    ? firstPart
    : firstPart.length > maxLength
    ? firstPart.slice(0, maxLength) + '...'
    : firstPart

  const displaySecondPart = isExpanded ? secondPart : ''

  return (
    <section className="bg-white rounded-[38px] md:pt-7 md:pb-3">
      <h1 className="text-2xl md:text-[34px] font-raleway font-medium mb-6 text-[#1A1A1A]">
        {title}
      </h1>

      <article className="text-[#1A1A1A] text-sm font-inter font-normal text-[16px] leading-[161%] relative">
        <p className="m-0">{displayFirstPart}</p>
        {displaySecondPart && <p className="mt-4">{displaySecondPart}</p>}

        {!isExpanded && description.length > maxLength && (
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </article>

      {description.length > maxLength && (
        <motion.div
          className="flex justify-center mt-2"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.button
            onClick={handleToggle}
            className="text-[#9200AD] text-sm flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {isExpanded ? 'Leer menos' : 'Leer más'}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-chevron-down"
              viewBox="0 0 16 16"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <path d="M1 4.5a.5.5 0 0 1 .708-.708L8 9.293l6.292-5.5A.5.5 0 0 1 15 4.5l-7 6a.5.5 0 0 1-.708 0l-7-6z" />
            </motion.svg>
          </motion.button>
        </motion.div>
      )}
    </section>
  )
}
