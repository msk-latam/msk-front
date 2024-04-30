"use client";
import React, { FC, useEffect, useState } from "react";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import api from "../../../../Services/api";
import { SinglePageType } from "./PageMission";
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts";

export interface SingleContentProps {
  data: SinglePageType;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const res = await api.getBestSellers();
    setCourses(res);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="container prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
      >
        <p className="font-lora text-xl">
          Medical & Scientific Knowledge{" "}
          <strong className="font-lora-italic">
            es una propuesta moderna que desafía a expandir las metas
            profesionales
          </strong>
          . Nuestra presencia en Latinoamérica y España promueve la difusión de
          un nuevo concepto en e-learning que transforma la experiencia de
          aprendizaje a distancia del personal de la salud hispanoparlante, con
          orientación hacia los resultados y el éxito profesional.
        </p>
        <p className="font-lora  text-xl">
          Nuestro método de capacitación es flexible: brindamos distintos
          formatos de contenidos de nivel académico, entre los que se incluyen
          guías profesionales y webinars. Además, contamos con el respaldo de
          grandes instituciones de todo el mundo que certifican nuestros cursos.
        </p>
        <img src="/images/misc/woman_pc.png" alt="" />
        <p className="font-lora text-xl">
          Quienes hacemos Medical & Scientific Knowledge{" "}
          <strong className="font-lora-italic">
            queremos acompañar y ayudar a cada persona en un camino de retos y
            crecimiento laboral.
          </strong>{" "}
          Todos los cursos que ofrecemos están desarrollados por sellos,
          instituciones y autores de prestigio. La capacitación se realiza en un
          campus virtual práctico y cada profesional tendrá el apoyo y la
          asesoría permanente de nuestros agentes académicos.
        </p>
        <p className="font-lora text-xl text-[#392C35]">
          ¿Te gustaría alcanzar nuevos objetivos y obtener un mayor
          reconocimiento en tu profesión?
        </p>
      </div>

      <div className="relative py-16 my-32">
        <BackgroundSection />
        <SectionSliderPosts
          postCardName="card9"
          heading="Comienza tu experiencia aquí"
          subHeading="Estos son los cursos más elegidos entre profesionales de la salud"
          sliderStype="style2"
          posts={courses}
          uniqueSliderClass="pageHome-section6"
        />
      </div>
    </div>
  );
};

export default SingleContent;
