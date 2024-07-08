import React, { FC, ReactNode, useEffect } from "react";
import { PostDataType, TaxonomyType } from "@/data/types";
// import { changeCurrentPage } from "@/app/pages/pages";
// import SingleHeader from "../PageMSK/mission/SingleHeader";
import { removeUrlParams } from "@/lib/removeUrlParams";
import { CommentType } from "@/components/CommentCard/CommentCard";
import { useAppDispatch } from "@/hooks/hooks";
import SingleHeader from "../Blog/Post/PostSingleHeader";
import SingleContent from "./Single";
import Head from "next/head";
import PageHeadServer from "@/components/Head/PageHeadServer";

const SINGLE: SinglePageType = {
  id: "eae0212192f63287e0c212",
  featuredImage: "/images/misc/mission.png",
  title: "Nuestra misión",
  desc: "Medical & Scientific Knowledge es una propuesta moderna que desafía a expandir las metas profesionales. Nuestra presencia en Latinoamérica y España promueve la difusión de un nuevo concepto en e-learning que transforma la experiencia de aprendizaje a distancia del personal de la salud hispanoparlante, con orientación hacia los resultados y el éxito profesional.",
  date: "May 20, 2021",
  href: "/single/this-is-single-slug",
  commentCount: 14,
  viewdCount: 2378,
  readingTime: 6,
  bookmark: { count: 3502, isBookmarked: false },
  like: { count: 773, isLiked: true },
  author: {
    id: 10,
    firstName: "Mimi",
    lastName: "Fones",
    displayName: "Fones Mimi",
    email: "mfones9@canalblog.com",
    avatar: "",
    count: 38,
    href: "/author/the-demo-author-slug",
    desc: "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
    jobName: "Author Job",
  },
  articles: [
    {
      title: null,
      content:
        '<span style="font-weight: 400;">MSK cuenta con una</span><b> tecnología sólida y un equipo experimentado</b><span style="font-weight: 400;"> para garantizar la </span><b>visibilidad de cada proyecto</b><span style="font-weight: 400;">. </span>\r<br>\r<br><span style="font-weight: 400;">Nuestros partners tendrán sus cursos en nuestro catálogo online y contarán con </span><b>ventajas como soporte personalizado</b><span style="font-weight: 400;"> y acceso a datos exclusivos de rendimiento. Asimismo, a través de una presencia multiplataforma, alcanzarán a nuestra </span><b>audiencia de más de 60.000 profesionales de la salud</b><span style="font-weight: 400;"> en toda la región, pudiendo así incrementar el tráfico y convertir sus formaciones en tendencia.</span>\r<br>\r<br><span style="font-weight: 400;">A continuación le brindamos información sobre algunos de nuestros </span><b>principales partners.</b>\r<br>\r<br><b>Tropos Formación</b>\r<br>\r<br><span style="font-weight: 400;">Esta compañía, abocada a la formación contínua, está conformada por </span><b>profesionales de amplia trayectoria profesional en la docencia, la investigación y la actividad clínica</b><span style="font-weight: 400;">, en cada una de sus especialidades. </span>\r<br>\r<br><span style="font-weight: 400;">Por otra parte, desarrolla programas en los que se ofrecen </span><b>contenidos significativos, tests, simulacros y ejercicios prácticos.</b>\r<br>\r<br><span style="font-weight: 400;">También, promueve una </span><b>metodología de aprendizaje</b><span style="font-weight: 400;"> en donde</span><span style="font-weight: 400;"> se reconoce que </span><b>cada estudiante tiene un proceso de asimilación y aprendizaje distinto</b><span style="font-weight: 400;">. Por eso, gracias a la </span><b>flexibilidad de los programas,</b><span style="font-weight: 400;"> pueden decidir cómo optimizar su proceso de aprendizaje, </span><b>adaptándolo a sus circunstancias personales</b><span style="font-weight: 400;"> para cumplir satisfactoriamente con sus propios objetivos.</span>\r<br>\r<br><b>Adult Clinical Cardiology Self-Assessment Program (ACCSAP)</b>\r<br>\r<br><span style="font-weight: 400;">Con el aval del Colegio Norteamericano de Cardiología (</span><a class="font-lora" href="<span style="font-weight: 400;">ACC</span>"><span style="font-weight: 400;">ACC</span></a><span style="font-weight: 400;">), este programa permite </span><b>perfeccionar y adquirir nuevos conocimientos sobre patología cardiovascular</b><span style="font-weight: 400;">. Se caracteriza por tener una modalidad de </span><b>cursada 100% </b><b><i>online</i></b><b>, estar disponible las 24 horas del día</b><span style="font-weight: 400;"> y contar con la posibilidad de ser iniciado en cualquier momento del año.</span>\r<br>\r<br><span style="font-weight: 400;">El contenido incluye </span><b>material de lectura descargable </b><span style="font-weight: 400;">(250 horas estimadas). Y explora otros recursos, tales como </span><b>audios o videos educacionales</b><span style="font-weight: 400;">. Allí participan reconocidos expertos mundiales en cardiología. Además, brinda actividades, tales como </span><b>cuestionarios, más de 500 casos clínicos y evaluaciones al final de cada módulo</b><span style="font-weight: 400;">, que permiten fijar lo aprendido.</span>\r<br>\r<br><span style="font-weight: 400;">En sus 10 módulos se abordan </span><b>patologías prevalentes</b><span style="font-weight: 400;">, tales como la insuficiencia cardíaca, las </span><a class="font-lora" href="<span style="font-weight: 400;">arritmia</span>"><span style="font-weight: 400;">arritmia</span></a><span style="font-weight: 400;">s o la </span><a class="font-lora" href="<span style="font-weight: 400;">enfermedad coronaria</span>"><span style="font-weight: 400;">enfermedad coronaria</span></a><span style="font-weight: 400;">, entre muchas otras. Por otro lado, </span><b>repara en aspectos relacionados con la calidad de atención médica y la seguridad de los pacientes</b><span style="font-weight: 400;"> que consultan por dolencias cardíacas.</span>\r<br>\r<br><b>COLMED 3</b>\r<br>\r<br><span style="font-weight: 400;">El Colegio de Médicos de la Provincia de Buenos Aires (Distrito III) es una institución ampliamente reconocida a nivel nacional. Brinda </span><b>información actualizada y asesoramiento técnico y legal </b><span style="font-weight: 400;">para las/os profesionales médicos. Además, ofrece cursos para diversas especialidades. </span>\r<br>\r<br><b>Océano Medicina</b>\r<br>\r<br><span style="font-weight: 400;">Parte del Grupo Océano,</span><b> Océano Medicina cuenta con programas de formación para todas las especialidades médicas.</b><span style="font-weight: 400;"> Sus principales beneficios radican en un </span><b>sistema evaluativo a distancia</b><span style="font-weight: 400;"> y </span><b>contenidos en línea actualizados de forma permanente</b><span style="font-weight: 400;">. Dichos contenidos son respaldados por prestigiosas instituciones académicas para la mejora de las competencias clínicas, la optimización de los procedimientos médicos, la posología de cada diagnóstico y la calidad en la atención de los pacientes.</span>',
    },
  ],
  categories: [
    {
      id: 1,
      name: "Garden",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGdhcmRlbmluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 13,
      color: "pink",
      taxonomy: "category",
    },
    {
      id: 2,
      name: "Jewelry",
      href: "/archive/the-demo-archive-slug",
      thumbnail:
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjV8fGpld2Vscnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
      count: 16,
      color: "red",
      taxonomy: "category",
    },
  ],
  postType: "standard",
  tags: [],
  content: "",
  comments: [],
};

export interface PageSingleTemp3SidebarProps {
  className?: string;
}

export interface ThemesToSeeType {
  id?: string;
  title?: string;
  type?: string;
  content?: string;
  introduction?: string;
}

export interface SinglePageType extends PostDataType {
  id: string;
  tags: TaxonomyType[];
  featuredImage: string;
  content: string | ReactNode;
  comments: CommentType[];
  excerpt?: string;
  contenido?: string;
  articles:
    | Array<{
        title: string | null;
        content: string;
      }>
    | [];
  reading_time?: string;
  terminos?: Array<{ titulo: string; descripcion: string }>;
  themes_to_se?: ThemesToSeeType[];
  authors?: any[];
  featured_text_field?: string;
  suggest_content?: {
    description: string;
    link: {
      title: string;
      url: string;
      target: string;
    };
  };
}

export async function generateMetadata() {
  return {
    title: "Misión",
  };
}

const PageSingleTemp3Sidebar: FC<PageSingleTemp3SidebarProps> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();

  // UPDATE CURRENTPAGE DATA IN PAGEREDUCERS
  // useEffect(() => {
  //   dispatch(changeCurrentPage({ type: "/single/:slug", data: SINGLE }));
  //   return () => {
  //     dispatch(changeCurrentPage({ type: "/", data: {} }));
  //   };
  // }, []);

  const isDevEnvironment = window.location.hostname === "dev.msklatam.com";
  const canonicalUrl = removeUrlParams(window.location.href);

  return (
    <>
      <div
        className={`nc-PageSingleTemp3Sidebar  animate-fade-down ${className}`}
        data-nc-id="PageSingleTemp3Sidebar"
      >
        <header className="relative pt-16 z-10 md:py-20 lg:py-14 bg-neutral-900 dark:bg-black">
          {/* SINGLE HEADER */}
          <div className="dark container relative z-10">
            <div className="max-w-screen-md">
              <SingleHeader
                hiddenDesc
                metaActionStyle="style2"
                pageData={SINGLE}
              />
            </div>
          </div>

          {/* FEATURED IMAGE */}
          <div className="mt-0 absolute top-0 right-0 bottom-0 w-1/2 lg:w-2/5 2xl:w-1/3">
            <div className=" block absolute top-0 left-0 bottom-0 from-neutral-900 dark:from-black bg-gradient-to-r w-full"></div>
            <img
              className="mission-image"
              src="/images/misc/mission.png"
              alt=""
            />
          </div>
        </header>

        {/* SINGLE MAIN CONTENT */}
        <div className="container flex flex-col my-10 lg:flex-row">
          <div className="w-full">
            <SingleContent data={SINGLE} />
          </div>
        </div>

        {/* RELATED POSTS */}
        {/* <SingleRelatedPosts /> */}
      </div>
    </>
  );
};

export default PageSingleTemp3Sidebar;
