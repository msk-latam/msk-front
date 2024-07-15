import React, { FC } from "react";
import PageTerminosCondicionesComponent from "@/components/MSK/terminos-y-condiciones/Page";
import { SITE_URL } from "@/contains/constants";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "MSK | Términos y Condiciones",
    alternates: {
      canonical: `${SITE_URL}/${currentCountry}/terminos-y-condiciones`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
const PageTerminosCondiciones: FC = () => {
  return <PageTerminosCondicionesComponent/>;
};

export default PageTerminosCondiciones;