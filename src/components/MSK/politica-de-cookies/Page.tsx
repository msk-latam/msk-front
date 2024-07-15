import React, { FC } from "react";
import PagePoliticaDeCookiesComponent from "@/components/MSK/politica-de-cookies/Page";
import { isProduction } from "@/utils/isProduction";
export async function generateMetadata() {
  return {
    title: "Política de cookies | MSK",
    robots: isProduction ? {
      index: true,
      follow: true,
    }: undefined,
  };
}
const PagePoliticaDeCookies: FC = () => {
  return <PagePoliticaDeCookiesComponent/>;
};

export default PagePoliticaDeCookies;