import { FC } from "react";
import StoreLayout from "@/components/MSK/StoreLayout";
import StoreContent from "@/components/MSK/Store/StoreContent";
import { cookies } from "next/headers";
import { Metadata } from "next";
import ssr from "@/services/ssr";
import { slugifySpecialty } from "@/lib/Slugify";
import { IS_PROD, SITE_URL } from "@/contains/constants";

type Props = {
  params: { lang: string; page: string; title?: string; filters?: string };
  searchParams: { page: string; especialidad?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  const page = Number(searchParams.page);

  const nextPrevUrls =
    page > 1
      ? [
          {
            rel: "next",
            url: `${SITE_URL}/${currentCountry}/tienda/?page=${page + 1}`,
          },
          {
            rel: "prev",
            url: `${SITE_URL}/${currentCountry}/tienda/?page=${page - 1}`,
          },
        ]
      : [
          {
            rel: "next",
            url: `${SITE_URL}/${currentCountry}/tienda/?page=2`,
          },
        ];
  const storeSpecialties = await ssr.getSpecialtiesStore(
    currentCountry || "int"
  );
  let urlSpecialty = storeSpecialties?.find(
    (specialty: any) =>
      slugifySpecialty(specialty.name) === searchParams.especialidad
  );

  const filteredParams = Object.entries(searchParams).reduce(
    (acc, [key, value]) => {
      if (key !== "page" && key !== "lang" && value !== undefined) {
        acc[key] = value.toString();
      }
      return acc;
    },
    {} as Record<string, string>
  );

  const queryString = new URLSearchParams(filteredParams).toString();

  return {
    title: urlSpecialty ? `Cursos de ${urlSpecialty.name}` : "Tienda | MSK",
    alternates: IS_PROD
      ? {
          canonical: `${SITE_URL}/${currentCountry}/tienda/${
            queryString ? `?${queryString}` : ""
          }`,
        }
      : undefined,
    robots: IS_PROD
      ? {
          index: true,
          follow: true,
        }
      : undefined,
    icons: {
      other: nextPrevUrls,
    },
  };
}

export interface PageStoreProps {
  className?: string;
  params?: any;
}

const PageStore: FC<PageStoreProps> = ({ className = "", params }) => {
  const currentCountry = params.lang || cookies().get("country")?.value;

  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      <StoreLayout
        subHeading=""
        headingEmoji=""
        heading="Tienda"
        country={currentCountry}
      >
        <section className=" text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreContent />
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
