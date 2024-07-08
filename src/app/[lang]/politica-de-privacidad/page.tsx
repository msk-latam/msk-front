import React, { FC } from "react";
import PagePoliticsPrivacyComponent from "@/components/MSK/politica-de-privacidad/Page";
export async function generateMetadata() {
  return {
    title: "Política de Protección de Datos",
  };
}
const PagePoliticsPrivacy: FC = () => {
  return <PagePoliticsPrivacyComponent/>;
};

export default PagePoliticsPrivacy;