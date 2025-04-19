"use client";

import Navbar from "@/modules/components/navbar/Navbar";
import Footer from "@/modules/components/footer/footer";
import ProductHeader from "./components/ProductHeader";
import ProductSummary from "./components/ProductSummary";
import ProductDescription from "./components/ProductDescription";
import ProductHighlights from "./components/ProductHighlights";
import ProductTeachers from "./components/ProductTeachers";
import ProductCertificate from "./components/ProductCertificate";
import ProductSyllabus from "./components/ProductSyllabus";
import ProductSupportForm from "./components/ProductSupportForm";
import ProductTestimonials from "./components/ProductTestimonials";
import ProductInstitutions from "./components/ProductInstitutions";
import CourseOverview from "./components/CourseOverview";
import ProductVideo from "./components/ProductVideo";
import CourseCards from "./components/CourseCards";

export default function ProductPage() {
  return (
    <>
      {/* HEADER CON GRADIENTE COMO EN LOGIN */}
      <div
        className="w-full relative z-9"
        style={{
          background: `linear-gradient(88.79deg, #9200AD -25.91%, #7B8CC3 -0.1%, #700084 31.13%, #B814D6 58.59%, #3B476C 109.69%, #4D005B 177.81%, #9200AD 245.71%), 
                       linear-gradient(360deg, rgba(0, 0, 0, 0) -76.85%, rgba(0, 0, 0, 0.2) 113.39%)`,
        }}
      >
        <Navbar />
        <ProductHeader />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <main className="bg-gray-50">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:py-12 pt-12 overflow-visible max-w-[1300px] mx-auto">
          {/* Columna izquierda */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="w-full bg-white rounded-[38px] flex flex-col relative z-[5] md:-mt-20 px-5 pt-9 pb-3 md:px-9 gap-6 md:gap-0">
              <ProductDescription />
              <ProductInstitutions />
              <ProductHighlights />
              <CourseOverview />
              <ProductTeachers />
            </div>
            {/* Nuevo contenedor para video */}
            <div className="w-full  bg-white rounded-[38px] md:py-10 md:px-9 px-6 py-12">
              <ProductVideo />
            </div>
            {/* Nuevo contenedor para Certificate */}
            <div className="w-full  bg-white rounded-[38px] md:py-10 md:px-9 px-6 py-12">
              <ProductCertificate />
            </div>
            {/* Nuevo contenedor para ProductSyllabus */}
            <div className="w-full  bg-white rounded-[38px] md:py-16 md:px-9 px-6 py-9">
              <ProductSyllabus />
            </div>
            {/* Nuevo contenedor para Cards */}
            <div className="w-full md:py-16 md:px-9 px-6 py-9">
              <CourseCards />
            </div>
            {/* Nuevo contenedor para ProductSupportForm */}
            <div className="w-full bg-white rounded-[38px] md:py-16 md:px-9 px-6 py-9">
              <ProductSupportForm />
            </div>
          </div>

          {/* Columna derecha */}
          <aside className="w-full lg:w-1/3 relative z-[9] -mt-20">
            <ProductSummary />
          </aside>
        </div>

        {/* Testimonios */}
        <ProductTestimonials />
      </main>

      <Footer />
    </>
  );
}
