import React, { FC } from "react";
import PagePoliticaDeCookiesComponent from "@/components/MSK/politica-de-cookies/Page";
export async function generateMetadata() {
  return {
    title: "MSK | Política de cookies",
    robots: {
      index: true,
      follow: true,
    },
  };
}
const PagePoliticaDeCookies: FC = () => {
  return <PagePoliticaDeCookiesComponent/>;
};

export default PagePoliticaDeCookies;