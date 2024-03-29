import SingleProductDetail from "components/SingleProductDetail/SingleProductDetail";
import React, { useContext } from "react";
import LoadingText from "components/Loader/Text";
import { CountryContext } from "context/country/CountryContext";
import useSingleProduct from "hooks/useSingleProduct";
import PageHead from "containers/PageMSK/PageHead";
import {filterAllCoursesBySlug} from "logic/getCourses";
import { useParams } from "react-router-dom";
import JsonLd from "components/JsonLd/JsonLd";

const PageSingleProduct = () => {
  const { state } = useContext(CountryContext);

  const params = useParams();
  const jsonCourseSchema = filterAllCoursesBySlug(params.slug);

  const slug = window.location.href.split("/").pop() || "";
  const { product, loading } = useSingleProduct(slug, {
    country: state.country,
  });

  return (
    <>
      {jsonCourseSchema && (
        <JsonLd>{jsonCourseSchema}</JsonLd>
      )}
      <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
        <PageHead
          title={product?.ficha.title as string}
          description={product?.ficha.description}
        />

        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          {loading ? (
            <div className="container grid gap-16 py-16">
              <LoadingText />
              <LoadingText />
              <LoadingText />
            </div>
          ) : product ? (
            <SingleProductDetail product={product} />
          ) : null}
        </section>
      </div>
    </>
  );
};

export default PageSingleProduct;
