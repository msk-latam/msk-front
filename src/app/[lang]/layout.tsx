import ".././globals.css";
import "@/styles/index.scss";
import { Poppins } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import GoogleCaptchaWrapper from "@/context/google/Recaptcha";
import DataProvider from "@/context/data/DataProvider";
import UTMProvider from "@/context/utm/UTMProvider";
import CountryProvider from "@/context/country/CountryProvider";
import AuthProvider from "@/context/user/AuthProvider";
import { StoreFiltersProvider } from "@/context/storeFilters/StoreFiltersProvider";
import Header from "@/components/Header/Header";
import Script from "next/script";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const runtime = "edge";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  
  return {
    title: {
      default: "MSK | Cursos de medicina para expandir tus metas profesionales",
      template: "MSK | %s",
    },
    description: "Cursos de medicina para expandir tus metas profesionales",
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}/${currentCountry}`),
    alternates: {
      canonical: "/",
    },
  };
}

interface LayoutProps {
  params: { country: string };
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: LayoutProps) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <GoogleCaptchaWrapper>
            <DataProvider>
              <UTMProvider>
                <CountryProvider>
                  <AuthProvider>
                    <StoreFiltersProvider>
                      <Header />
                      {children}
                      <Script strategy="beforeInteractive" src="https://sdk.rebill.to/v2/rebill.min.js" />
                      <Footer />
                    </StoreFiltersProvider>
                  </AuthProvider>
                </CountryProvider>
              </UTMProvider>
            </DataProvider>
          </GoogleCaptchaWrapper>
        </div>
      </body>
    </html>
  );
}