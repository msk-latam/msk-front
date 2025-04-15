"use client";

import { useState } from "react";

type RegisterFormProps = {
  onBack: () => void;
};

export default function RegisterForm({ onBack }: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    email.trim() !== "" &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    password.trim() !== "";

  if (submitted) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 p-4 md:mb-20 z-[10] relative overflow-visible max-w-[1400px] mx-auto
 h-screen md:h-auto">
        <div className="text-center py-20">
          <div className="flex justify-center w-full animate-pulse">
            <div className="w-44 mx-auto h-auto p-6">
              <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">¡Listo!</h2>
          <p className="text-sm text-gray-600 max-w-md md:pb-6 mx-auto">
            Recibirás en tu casilla de e-mail un correo de verificación. <br />
            Revisa tu bandeja de entrada, spam o correos no deseados.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:p-0 md:mb-20 z-[10] relative overflow-visible mx-auto">
      {/* Botón de volver */}
      <button
        onClick={onBack}
        className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition absolute"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 1L1 6L5 11"
            stroke="#1F2937"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <section
        className="w-full max-w-[1632px] h-fit relative z-8 mx-auto px-6 pt-[84px] pb-28 md:py-16 md:px-9"
        style={{ fontFamily: "Raleway, sans-serif" }}
      >
        <div className="text-center mb-6">
          <h1 className="md:text-[34px] text-2xl md:mb-6 mb-2 font-semibold text-gray-900">
            Crear cuenta
          </h1>
          <p className="text-base md:text-[18px] text-gray-500 mt-1">
            Registrate y disfruta al máximo de nuestra propuesta académica
          </p>
        </div>

        <form
          className="max-w-md mx-auto space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Ingresar e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full text-base rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Nombre/s
            </label>
            <input
              type="text"
              placeholder="Ingresar nombre/s"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1 w-full text-base rounded-2xl border border-gray-300 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Apellido/s
            </label>
            <input
              type="text"
              placeholder="Ingresar apellido/s"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 w-full text-base rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresar contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full text-base rounded-2xl border border-gray-300 p-2 focus:ring-4 focus:border-[#DBDDE2] focus:ring-[#F5E6F7] focus:border-1"
            />
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`w-full text-white py-2 px-4 rounded-[38px] transition ${
              isValid
                ? "bg-[#9200ad] hover:bg-purple-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Crear
          </button>

          <p className="text-xs text-center text-gray-500">
            Al registrarte, aceptás las{" "}
            <a href="#" className="text-[#9200ad] underline">
              condiciones de privacidad
            </a>{" "}
            y los{" "}
            <a href="#" className="text-[#9200ad] underline">
              términos y condiciones
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <hr className="w-full border-[#6E737C]" />
            <span
              className=" px-2 py-0.5 bg-white text-[#6E737C]"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "22px",
                letterSpacing: "0.5%",
              }}
            >
              o
            </span>
            <hr className="w-full border-[#6E737C]" />
          </div>

          {/* Botones sociales */}
          <div className="space-y-4">
            <button className="w-full border border-gray-300 rounded-[38px] py-2 flex items-center justify-center gap-2">
              Crear con Google
              <img src="/icons/google.svg" alt="Google" className="h-5 w-5" />
            </button>
            <button className="w-full border border-gray-300 rounded-[38px] py-2 flex items-center justify-center gap-2">
              Crear con Facebook
              <img
                src="/icons/facebook.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
            </button>
            <button className="w-full border border-gray-300 rounded-[38px] py-2 flex items-center justify-center gap-2">
              Crear con Apple
              <img src="/icons/apple.svg" alt="Apple" className="h-5 w-5" />
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <button
              type="button"
              onClick={onBack}
              className="text-[#9200ad] underline"
            >
              Inicia sesión aquí
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}
