import React, { FC } from "react";
import PagePoliticsPrivacyComponent from "@/components/MSK/politica-de-privacidad/Page";
import { Props } from "@/app/layout";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { IS_PROD, SITE_URL } from "@/contains/constants";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  return {
    title: "Política de Protección de Datos | MSK",
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/politica-de-privacidad`,
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
const PagePoliticsPrivacy: FC = () => {
  return <PagePoliticsPrivacyComponent />;
};

export default PagePoliticsPrivacy;
