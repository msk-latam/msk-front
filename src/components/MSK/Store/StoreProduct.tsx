import { FC, useContext } from "react";
import { FetchCourseType, ResourceFilter } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import Badge from "@/components/Badge/Badge";
import NcLink from "@/components/NcLink/NcLink";
import Image from "next/image";
import clockIcon from "/public/images/icons/clock.svg";
import { removeFirstSubdomain } from "@/utils/removeFirstSubdomain";
import { useStoreFilters } from "@/context/storeFilters/StoreProvider";

interface Props {
  product: FetchCourseType;
  className?: string;
  hoverEffect?: boolean;
  kind: string;
}

const StoreProduct: FC<Props> = ({
  product,
  className,
  hoverEffect = false,
  kind,
}) => {
  const imageURL = removeFirstSubdomain(product.thumbnail.high);
  const { storeFilters } = useStoreFilters();
  const { addFilter, removeFilter, clearFilters } = useStoreFilters();

  const handleBadgeClick = () => {
    const resource = {
      id: 2,
      name: "Guías profesionales",
      slug: "guias-profesionales",
    };
    const resourceExists = storeFilters.resources.filter(
      (item: ResourceFilter) => {
        return item.id == resource.id;
      }
    );
    if (resourceExists.length) {
      removeFilter("resources", resource);
    } else addFilter("resources", resource);
  };
  return (
    <div className={`protfolio-course-2-wrapper ${className}`}>
      <div className="student-course-img">
        <NcLink href={`/curso/${product.slug}`}>
          <Image
            src={imageURL}
            className="transition-all"
            width={1000}
            height={1000}
            alt={`${product.title}`}
          />
        </NcLink>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={kind === "course"}
                isEbook={kind === "downloadable"}
              />
              <NcLink href={`/curso/${product.slug}`}>
                <h3 className="">{product.title}</h3>
              </NcLink>

              <div className="course-action">
                <NcLink
                  href={`/curso/${product.slug}`}
                  className="view-details-btn"
                >
                  Ver más
                </NcLink>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <NcLink href={`/curso/${product.slug}`} className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </NcLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <div className="course-title-categories">
            <div className="flex flex-wrap gap-1">
              {product.duration ? null : (
                <Badge
                  onClick={handleBadgeClick}
                  icon="elearning"
                  color="emerald-post"
                  name="Guía profesional"
                  href={`/tienda?recurso=guias-profesionales`}
                  textSize="text-xs sm:text-xs"
                />
              )}
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={true}
                textSize="text-xs sm:text-xs"
                onStore
              />
            </div>

            <div className="portfolio-course-2 line-clamp-3">
              <NcLink href={`/curso/${product.slug}`}>
                <h3 className="font-bold text-sm">{product.title}</h3>
              </NcLink>
            </div>
          </div>

          {product.lista_de_cedentes ? (
            <p className="text-sm">{product.lista_de_cedentes[0].post_title}</p>
          ) : null}
        </div>
      </div>

      <div className="course-2-footer">
        {product.duration ? (
          <div className="coursee-clock">
            <Image
              src={clockIcon.src}
              width={clockIcon.width}
              height={clockIcon.height}
              className="mr-2"
              alt="clock icon"
            />
            <span>{product.duration} horas</span>
          </div>
        ) : (
          <div></div>
        )}

        <NcLink
          href={`/curso/${product.slug}`}
          className="course-network text-primary font-bold text-sm"
        >
          Descubrir
        </NcLink>
      </div>
    </div>
  );
};

export default StoreProduct;
