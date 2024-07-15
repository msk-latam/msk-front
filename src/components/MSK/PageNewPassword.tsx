import React, { FC, useState } from "react";
import LayoutPage from "@/components/MSK/LayoutPage";
import Input from "@/components/Input/Input";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import api from "@/services/api";
import { useRouter } from "next/router";

export interface PageNewPasswordProps {
  className?: string;
}

export interface BodyNewPassword {
  password: string;
  validator: string;
}
export async function generateMetadata() {
  return {
    title: "Cambia tu contraseña | MSK",
  };
}

const PageNewPassword: FC<PageNewPasswordProps> = ({ className = "" }) => {
  const router = useRouter();
  const { token } = router.query; // Access token from the router query
  // console.log(decodeURIComponent(token as string));

  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const jsonData: BodyNewPassword = {
      password: "",
      validator: decodeURIComponent(token as string),
    };

    formData.forEach((value, key, parent) => {
      if (key === "password") {
        jsonData.password = value as string;
      }
    });

    const { data, status } = await api.postNewPassword(jsonData);
    if (status === 200) {
      // console.log(data);
      setTimeout(() => {
        router.push("/gracias?origen=new-password");
      }, 1500);
    } else {
      // console.log("Error:", data.error);
      setError(data.error);
    }
  };

  return (
    <div
      className={`nc-PageForgotPass animate-fade-down ${className}`}
      data-nc-id="PageForgotPass"
    >
      <LayoutPage
        heading="Cambiar contraseña"
        subHeading="Te enviaremos un correo para que puedas crear una nueva"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6"
            action="#"
            method="post"
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Nueva contraseña
              </span>
              <Input
                type="password"
                placeholder="Ingresar nueva contraseña"
                className="mt-1"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Confirmar</ButtonPrimary>
          </form>

          {/* ==== */}
          {/* <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Volver a {` `}
            <NcLink to="/iniciar-sesion" className="underline">
              Iniciar sesión
            </NcLink>
          </span> */}
          <p className="text-red-500 text-center">{error}</p>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageNewPassword;
