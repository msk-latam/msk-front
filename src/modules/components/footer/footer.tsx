"use client";

import useFooter from "@/hooks/useFooter";
import { usePathname } from "next/navigation";
import { getSocialIcon } from "./SocialIcons";

const Footer = () => {
  const pathname = usePathname();
  const pathSegments = pathname?.split("/").filter(Boolean);

  const lang =
    pathSegments?.[0] && pathSegments[0].length === 2 ? pathSegments[0] : "ar";

  const isDemoMode = true; // Cambiar a false para producción
  const { data } = useFooter(lang);

  const buildFooterLink = (path: string) => {
    const domain = isDemoMode
      ? "https://msklatam.tech"
      : "https://msklatam.com";

    if (lang === "ar") {
      return `${domain}/${path.replace(/^\//, "")}`;
    }

    return `${domain}/${lang}/${path.replace(/^\//, "")}`;
  };
  console.log(data);
  return (
    <footer className="bg-black w-full md:px-6 py-10 pb-24 md:py-14 text-sm">
      <div className="overflow-visible max-w-[1600px] mx-auto md:px-4 flex flex-col-reverse md:flex-row justify-between items-start gap-10 md:gap-16 min-h-[400px] md:min-h-[250px]">
        {/* BLOQUE IZQUIERDO */}
        <div className="w-full md:w-1/2 text-center md:px-20 md:text-left flex flex-col items-center md:items-start gap-4 md:gap-6 text-white font-inter">
          <svg
            width="141"
            height="77"
            viewBox="0 0 141 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_266_2898)">
              <path
                d="M43.8027 33.5014C47.4193 33.5014 51.8213 34.8412 54.0172 40.4827C56.2905 35.9705 60.336 33.5014 65.6577 33.5014C74.1 33.5014 78.285 38.9324 78.285 47.1098V67.3403H73.4593V49.081C73.4593 42.1716 71.1188 37.5208 64.8723 37.5208C57.9232 37.5208 55.438 43.6808 55.438 49.7894V67.3403H50.6123V48.0954C50.6123 41.6788 49.0623 37.5208 42.5937 37.5208C37.985 37.5208 32.9475 41.6274 32.9475 50.4208V67.3608H28.1167V41.5915C28.1167 39.8256 28.0443 36.5865 27.8325 34.3278H32.4412C32.5858 36.0886 32.7253 38.5577 32.7253 39.9745H32.87C33.922 38.0052 35.4976 36.3603 37.4252 35.2189C39.3529 34.0776 41.5587 33.4835 43.8027 33.5014Z"
                fill="white"
              />
              <path
                d="M103.121 42.1719C101.7 39.4256 98.652 37.5211 94.963 37.5211C91.4858 37.5211 87.9363 38.9995 87.9363 42.6545C87.9363 45.7345 90.4215 47.1615 95.8827 48.3011C103.689 49.9233 107.378 52.8133 107.378 57.9621C107.378 65.5029 100.992 68.1825 94.8907 68.1825C89.8532 68.1825 84.8157 66.2062 81.7622 61.7659L85.5958 58.9477C86.5744 60.5049 87.9326 61.7918 89.5447 62.6891C91.1567 63.5864 92.9706 64.0651 94.8183 64.081C98.9517 64.081 102.625 62.6026 102.625 58.3009C102.625 54.8461 99.148 53.4396 92.8085 51.9561C88.9025 51.0423 83.2967 49.3483 83.2967 43.0754C83.2967 36.4021 89.1143 33.4863 95.149 33.4863C99.7577 33.4863 104.656 35.6731 106.784 39.4102L103.121 42.1719Z"
                fill="white"
              />
              <path
                d="M116.601 49.2246H116.813L132.142 34.338H139.097L122.351 49.4351L140.796 67.3402H133.703L116.813 49.9998H116.601V67.3402H111.775V14.0459H116.601V49.2246Z"
                fill="white"
              />
              <path
                d="M17.1943 29.4873L33.1697 20.3243L31.3045 17.1211L17.184 25.2215L3.06351 17.1211L1.20351 20.3243L17.1788 29.4873L17.184 29.4976V29.4924L17.1892 29.4976L17.1943 29.4873Z"
                fill="#9200AD"
              />
              <path
                d="M24.2365 17.8702L27.7602 12.9627L24.6033 10.7246L21.1365 15.5551C22.3268 16.0939 23.3847 16.884 24.2365 17.8702Z"
                fill="#9200AD"
              />
              <path
                d="M17.4992 14.6828C18.1216 14.6832 18.7426 14.7416 19.354 14.8573V8.83594H15.324V14.9241C16.038 14.765 16.7674 14.6841 17.4992 14.6828Z"
                fill="#9200AD"
              />
              <path
                d="M13.6087 15.4114L9.992 10.6631L6.892 12.9834L10.5087 17.783C11.3549 16.7767 12.4132 15.9671 13.6087 15.4114Z"
                fill="#9200AD"
              />
            </g>
            <defs>
              <clipPath id="clip0_266_2898">
                <rect
                  width="140"
                  height="77"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <p className="md:text-[20px] text-sm font-inter font-light leading-tight max-w-xs md:max-w-none">
            Una propuesta moderna que desafía <br /> a expandir las metas
            profesionales
          </p>
          <p className="md:text-[20px] text-sm font-inter text-white">
            © 2025 • Medical&Scientific Knowledge S.L.
          </p>

          {/* Redes sociales */}
          {data?.sections?.redes_sociales && (
            <div className="flex gap-1">
              {Object.entries(data.sections.redes_sociales).map(([name, url]) =>
                url ? (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSocialIcon(name)}
                  </a>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* BLOQUE DERECHO */}
        <div className="w-full md:w-1/2 grid grid-cols-2 mx-auto gap-x-4 gap-y-2 md:px-0 px-9 font-inter text-sm md:text-base text-[#AEB1B9] mt-30 md:mt-10">
          <div className="space-y-2">
            <a
              href={buildFooterLink("/contacto/")}
              className="hover:underline block"
            >
              Contacto
            </a>
            <a
              href={buildFooterLink("/bases-promocionales/")}
              className="hover:underline block"
            >
              Bases promocionales
            </a>
            <a
              href={buildFooterLink("/politica-de-privacidad/")}
              className="hover:underline block"
            >
              Política de privacidad
            </a>
            <a
              href={buildFooterLink("/politica-de-cookies/")}
              className="hover:underline block"
            >
              Política de cookies
            </a>
            <a
              href={buildFooterLink("/terminos-y-condiciones/")}
              className="hover:underline block"
            >
              Términos y condiciones
            </a>
          </div>

          <div className="space-y-2">
            <a
              href={buildFooterLink("/mision/")}
              className="hover:underline block"
            >
              Nuestra misión
            </a>
            <a
              href={buildFooterLink("/nosotros/")}
              className="hover:underline block"
            >
              Quiénes somos
            </a>
            <a
              href={buildFooterLink("/conviertete-en-partner/")}
              className="hover:underline block"
            >
              Conviértete en partner
            </a>
            <a
              href={buildFooterLink("/ayuda/")}
              className="hover:underline block"
            >
              Centro de ayuda
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
