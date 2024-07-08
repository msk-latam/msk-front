import React, { FC } from "react";
import PageTerminosCondicionesComponent from "@/components/MSK/terminos-y-condiciones/Page";
export async function generateMetadata() {
  return {
    title: "Términos y Condiciones",
  };
}
const PageTerminosCondiciones: FC = () => {
  return <PageTerminosCondicionesComponent/>;
};

export default PageTerminosCondiciones;