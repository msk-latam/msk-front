import React, { FC } from "react";
import PageIniciarSesionComponent from "@/components/MSK/iniciar-sesion/Page";
export async function generateMetadata() {
  return {
    title: "Iniciar Sesión",
  };
}
const PageGracias: FC = () => {
  return <PageIniciarSesionComponent/>;
};

export default PageGracias;