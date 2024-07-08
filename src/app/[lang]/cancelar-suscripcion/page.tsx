import React, { FC } from "react";
import PageCancelarSuscripcionComponent from "@/components/MSK/cancelar-suscripcion/Page";
export async function generateMetadata() {
  return {
    title: "Cancelar inscripción",
  };
}
const PageCancelSubscription: FC = () => {
  return <PageCancelarSuscripcionComponent/>;
};

export default PageCancelSubscription;