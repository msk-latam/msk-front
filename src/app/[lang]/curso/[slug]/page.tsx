import SingleProductDetail from "@/components/SingleProductDetail/SingleProductDetail";
import React, { FC } from "react";
import ssr from "@/services/ssr";
import PageHeadServer from "@/components/Head/PageHeadServer";

interface PageCourseProps {
  params: any;
}
export const runtime = "edge";

type Props = {
  params: { slug: string; lang: string };
};
export async function generateMetadata({ params }: Props) {
  const { product: courseMetaData } = await ssr.getSingleProduct(
    params.slug,
    params.lang
  );
  return {
    title: courseMetaData?.ficha.title,
    description: courseMetaData?.excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_URL}/blog`,
    },
    schemaJson: "Course",
    schemaJsonData: courseMetaData,
  };
}

const PageSingleProduct: FC<PageCourseProps> = async ({ params }) => {
  const { product } = await ssr.getSingleProduct(params.slug, params.lang);
  return (
    <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        {product ? (
          <SingleProductDetail product={product} country={params.country} />
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default PageSingleProduct;
