import { FC } from "react";

import { Props } from "@/app/layout";
import { Metadata } from "next";
import PageNewPassword from "@/components/MSK/PageNewPassword";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "Cambia tu contraseña | MSK",
  };
}
const PageServerNewPassword: FC = () => {
  return <PageNewPassword />;
};

export default PageServerNewPassword;
