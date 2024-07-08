import React, { FC } from "react";
import PageCrearCuentaComponent from "@/components/MSK/crear-cuenta/Page";
export async function generateMetadata() {
  return {
    title: "Crear Cuenta",
  };
}
const PageCrearCuenta: FC = () => {
  return <PageCrearCuentaComponent/>;
};

export default PageCrearCuenta;