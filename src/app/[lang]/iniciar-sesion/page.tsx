import React, { FC } from "react";
import PageIniciarSesionComponent from "@/components/MSK/iniciar-sesion/Page";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { IS_PROD, SITE_URL } from "@/contains/constants";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "Iniciar Sesión | MSK",
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/iniciar-sesion`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
  };
}
const PageGracias: FC = () => {
  return <PageIniciarSesionComponent />;
};

export default PageGracias;
