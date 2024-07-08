import React, { FC } from "react";
import PageCorreoEnviadoComponent from "@/components/MSK/correo-enviado/Page";
export async function generateMetadata() {
  return {
    title: "Correo Enviado",
  };
}
const PageCorreoEnviado: FC = () => {
  return <PageCorreoEnviadoComponent/>;
};
export default PageCorreoEnviado;