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


export const runtime = 'edge';
export const metadata = {
  title: "MSK Latam",
  description: "Una propuesta moderna para expandir tus metas profesionales",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

interface LayoutProps {
  params: { country: string };
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: LayoutProps) {
  return (
    <html lang="en" className={poppins.className}>
      <body className="">
        <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
          <GoogleCaptchaWrapper>
            <DataProvider>
              <UTMProvider>
                <CountryProvider>
                  <AuthProvider>
                    <StoreFiltersProvider>
                      <Header />
                      {children}
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