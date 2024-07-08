import React, { FC } from "react";
import PagePoliticaDeCookiesComponent from "@/components/MSK/politica-de-cookies/Page";
export async function generateMetadata() {
  return {
    title: "Política de cookies",
  };
}
const PagePoliticaDeCookies: FC = () => {
  return <PagePoliticaDeCookiesComponent/>;
};

export default PagePoliticaDeCookies;