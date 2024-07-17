import React, { FC } from "react";
import PagePoliticaDeCookiesComponent from "@/components/MSK/politica-de-cookies/Page";
import { IS_PROD } from "@/contains/constants";
export async function generateMetadata() {
  return {
    title: "Política de cookies | MSK",
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
  };
}
const PagePoliticaDeCookies: FC = () => {
  return <PagePoliticaDeCookiesComponent />;
};

export default PagePoliticaDeCookies;
