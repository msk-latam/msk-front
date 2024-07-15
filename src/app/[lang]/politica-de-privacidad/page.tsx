import React, { FC } from "react";
import PagePoliticsPrivacyComponent from "@/components/MSK/politica-de-privacidad/Page";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { SITE_URL } from "@/contains/constants";
import { isProduction } from "@/utils/isProduction";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "Política de Protección de Datos | MSK",
    alternates: isProduction ? {
      canonical: `${SITE_URL}/${currentCountry}/politica-de-privacidad`,
    }: undefined,
    robots: isProduction ? {
      index: true,
      follow: true,
    }: undefined,
  };
}
const PagePoliticsPrivacy: FC = () => {
  return <PagePoliticsPrivacyComponent/>;
};

export default PagePoliticsPrivacy;