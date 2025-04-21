// 'use client'

// type RecoveryPasswordSentProps = {
//   onContinue?: () => void
// }

// export default function RecoveryPasswordSent({ onContinue }: RecoveryPasswordSentProps) {
//   return (
//     <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 py-10 z-[10] relative overflow-visible max-w-[1600px] h-screen md:h-full flex md:items-center justify-center">
//       <section
//         className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
//         style={{ fontFamily: 'Raleway, sans-serif' }}
//       >
//         <div className="flex justify-center">
//           <div className="rounded-full w-44 mx-auto h-auto p-6">
//             <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
//           </div>
//         </div>

//         <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-2">Correo enviado</h2>
//         <p className="text-sm text-gray-600 max-w-md mx-auto">
//           Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.
//         </p>

//         {onContinue && (
//           <button
//             onClick={onContinue}
//             className="mt-6 bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-[20px]"
//           >
//             Continuar
//           </button>
//         )}
//       </section>
//     </div>
//   )
// }

"use client";

import { useState } from "react";

export default function NewPasswordForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState(true); // Estado inicial con pantalla de "Correo enviado"

  const handleRedirect = () => {
    window.location.href = "/home";
  };

  interface RecoveryPasswordSentProps {
    onContinue: () => void
  }

  if (emailSent) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 py-10 z-[10] relative overflow-visible max-w-[1600px] h-screen md:h-full flex md:items-center justify-center">
        <section
          className="w-full max-w-[1632px] relative z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          <div className="flex justify-center w-full animate-pulse">
            <div className="w-44 mx-auto h-auto p-6">
              <img src="/images/emails/email-icon.svg" alt="Correo enviado" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 md:mb-2">
            Correo enviado
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Revisa tu bandeja de entrada, spam o correos no deseados y sigue los
            pasos detallados.
          </p>

          <button
            onClick={() => setEmailSent(false)}
            className="mt-6 bg-[#9200ad] hover:bg-purple-800 text-white py-3 px-6 rounded-full"
          >
            Continuar
          </button>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] mx-auto md:px-4 min-h-fit h-[550px] flex md:items-center justify-center">
        <section
          className="w-full max-w-[1632px] absolute top-0 z-[1] mx-auto px-4 py-6 sm:py-12 text-center"
          style={{ fontFamily: "Raleway, sans-serif" }}
        >
          <button className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6e737c] hover:bg-gray-100 transition absolute">
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
          <div className="flex justify-center w-full animate-pulse">
            <div className="w-44 mx-auto h-auto p-6">
              <img src="/images/emails/email-icon-check.svg" alt="Correo enviado" />
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 md:mb-6 mb-2">
            ¡Listo!
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-4">
            Ya confirmaste tu e-mail. En breve recibirás un correo con tus
            credenciales de <strong>Medical & Scientific Knowledge</strong>.
          </p>

          <button
            onClick={handleRedirect} // redirige al home
            className="mt-6 bg-[#9200ad] hover:bg-purple-800 text-white py-3 px-6 rounded-full"
          >
            Seguir navegando
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-3xl shadow-md -mt-[40px] md:-mt-20 md:mb-24 p-4 sm:p-20 pb-[80px] md:pb-0 z-[10] relative overflow-visible max-w-[1600px] min-h-fit h-[550px] flex md:items-center justify-center">
      <section
        className="w-full max-w-[1632px] absolute md:top-0 z-[1] mx-auto px-4 md:py-12"
        style={{ fontFamily: "Raleway, sans-serif" }}
      >
        <button className="md:top-10 md:left-8 top-5 left-5 flex z-10 items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-[#6e737c] hover:bg-gray-100 transition absolute">
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
        <div className="text-center mt-16 mb-6">
          <h1 className="text-2xl md:text-3xl md:pb-6 mb-2 font-semibold text-gray-900">
            Cambiar contraseña
          </h1>
          <p className="text-base md:text[18px] text-gray-500">
            Elige una nueva clave para iniciar sesión
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="max-w-md mx-auto space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] text-left pl-2 mb-2">
              Nueva contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresar nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border mb-6 border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.92012 12.7132C2.78394 12.4975 2.71584 12.3897 2.67772 12.2234C2.64909 12.0985 2.64909 11.9015 2.67772 11.7766C2.71584 11.6103 2.78394 11.5025 2.92012 11.2868C4.04553 9.50484 7.3954 5 12.5004 5C17.6054 5 20.9553 9.50484 22.0807 11.2868C22.2169 11.5025 22.285 11.6103 22.3231 11.7766C22.3517 11.9015 22.3517 12.0985 22.3231 12.2234C22.285 12.3897 22.2169 12.4975 22.0807 12.7132C20.9553 14.4952 17.6054 19 12.5004 19C7.3954 19 4.04553 14.4952 2.92012 12.7132Z"
                    stroke="#6E737C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.5004 15C14.1573 15 15.5004 13.6569 15.5004 12C15.5004 10.3431 14.1573 9 12.5004 9C10.8435 9 9.5004 10.3431 9.5004 12C9.5004 13.6569 10.8435 15 12.5004 15Z"
                    stroke="#6E737C"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={password.trim() === ""}
            className={`w-full text-white py-3 px-4 rounded-[38px] transition ${
              password.trim() !== ""
                ? "bg-[#9200ad] hover:bg-purple-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </div>
  );
}
