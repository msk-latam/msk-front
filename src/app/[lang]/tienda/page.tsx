import { FC } from "react";
import StoreLayout from "@/components/MSK/StoreLayout";
import StoreContent from "@/components/MSK/Store/StoreContent";
import { cookies } from "next/headers";
import { Metadata } from "next";
import ssr from "@Services/ssr";
import { slugifySpecialty } from "@/lib/Slugify";

type Props = {
  params: { lang: string; page: string; title?: string; filters?: string };
  searchParams: { page: string; especialidad?: string };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const currentCountry = params.lang || cookies().get("country")?.value;
  const nextPrevUrls =
    Number(searchParams.page) > 1
      ? [
          {
            rel: "next",
            url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=3`,
          },
          {
            rel: "prev",
            url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=1`,
          },
        ]
      : [
          {
            rel: "next",
            url: `${process.env.NEXT_PUBLIC_URL}/${currentCountry}/tienda/?page=2`,
          },
        ];
  const storeSpecialties = await ssr.getSpecialtiesStore(
    currentCountry || "int"
  );
  let urlSpecialty = storeSpecialties?.find(
    (specialty: any) =>
      slugifySpecialty(specialty.name) === searchParams.especialidad
  );
  return {
    title: urlSpecialty ? `Cursos de ${urlSpecialty.name}` : "Tienda",
    alternates: {
      canonical: "/tienda",
    },
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
  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      <StoreLayout subHeading="" headingEmoji="" heading="Tienda">
        <section className="container text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreContent />
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
