import React, { FC } from "react";
import PageIniciarSesionComponent from "@/components/MSK/iniciar-sesion/Page";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { SITE_URL } from "@/contains/constants";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "Iniciar Sesión",
    alternates: {
      canonical: `${SITE_URL}/${currentCountry}/iniciar-sesion`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
const PageGracias: FC = () => {
  return <PageIniciarSesionComponent/>;
};

export default PageGracias;