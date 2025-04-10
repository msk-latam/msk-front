'use client'

import '@/app/globals.css'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/modules/components/navbar/Navbar'
import FAQ from '@/modules/home/components/faq/FAQ'
import NewsLetter from '@/modules/home/components/newsletter/NewsLetter'
import Footer from '@/modules/home/components/footer/footer'
import FilterSidebar from '@/modules/store/FilterSidebar'
import CourseCard from '@/modules/store/CourseCard'
import Pagination from '@/modules/store/Pagination'
import HeaderTitle from '@/modules/store/HeaderTitle'

export default function TiendaPage() {
  return (
    <>
      {/* HEADER CON GRADIENTE */}
      <div
        className="w-full h-[180px] sm:h-[290px] overflow-hidden m-0 p-0"
        style={{
          background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%), 
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
        }}
      >
        <Navbar />
        <HeaderTitle />
      </div>

     

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="flex gap-6">
          <FilterSidebar />

          <section className="w-full lg:w-3/4">
            <div className="flex justify-between mb-6">
              <div>
                <button className="text-sm font-medium">Filtros (2)</button>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="ml-4 px-3 py-1 border rounded-md text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ordenar por </label>
                <select className="ml-2 border rounded-md px-2 py-1 text-sm">
                  <option value="novedades">Novedades</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <CourseCard
                  key={i}
                  title="Iniciación a la investigación en enfermería"
                  subtitle="Tropos"
                  hours={600}
                  tags={['Medicina General', 'Actualidad']}
                  imageUrl="https://via.placeholder.com/393x180"
                />
              ))}
            </div>

            <Pagination totalPages={4} currentPage={1} onPageChange={() => {}} />
          </section>
        </div>
      </div>

      <FAQ />
      <NewsLetter />
      <Footer />
    </>
  )
}