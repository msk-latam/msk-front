import React, { FC } from "react";
import PageGraciasComponent from "@/components/MSK/gracias/Page";
export async function generateMetadata() {
  return {
    title: "MSK | Gracias",
  };
}
const PageGracias: FC = () => {
  return <PageGraciasComponent className={""}/>;
};

export default PageGracias;