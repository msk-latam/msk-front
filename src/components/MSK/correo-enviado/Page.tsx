"use client";
import LayoutPage from "@/components/MSK/LayoutPage";
import { FC } from "react";
export interface PageEmailSentProps {
  className?: string;
}

const PageEmailSent: FC<PageEmailSentProps> = ({ className = "" }) => {
  let subHeading = "";
  let message = "";
  const queryParams = new URLSearchParams(location.search);
  const origin = queryParams.get("origen");

  switch (origin) {
    case "trial":
      subHeading =
        "Gracias por interesarte en <b>Medical & Scientific Knowledge</b>";
      message =
        "Recibirás en tu casilla de e-mail un correo de verificación. \n" +
        "<b>Revisa tu bandeja de entrada, spam o correos no deseados.</b>\n" +
        "Una vez terminado la verificacion obtendras el Trial";
      break;

    default:
      subHeading =
        "Gracias por interesarte en <b>Medical & Scientific Knowledge</b>";
      message =
        "Recibirás en tu casilla de e-mail un correo de verificación. Revisa tu bandeja de entrada, spam o correos no deseados.";
      break;
  }

  return (
    <div
      className={`nc-PageEmailSent animate-fade-down ${className}`}
      data-nc-id="PageEmailSent"
    >
      <LayoutPage subHeading="" heading=" ">
        <div className="thank-you-wrp py-16">
          <h1 className="text-center thank-you-title text-size-[24px]">
            ¡Listo!
          </h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-center text-natural-600 md:px-20 px-8">
              {message}
            </p>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageEmailSent;
