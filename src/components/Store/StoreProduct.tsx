import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { FetchCourseType } from "data/types";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import Badge from "components/Badge/Badge";
import { CountryContext } from "context/country/CountryContext";

interface Props {
  product: FetchCourseType;
  className?: string;
  hoverEffect?: boolean;
}

const StoreProduct: FC<Props> = ({
  product,
  className,
  hoverEffect = false,
}): any => {
  const { state } = useContext(CountryContext);

  const imageURL = product.thumbnail.high
    .replace(`${state.country}.`, "")
    .replace("wpmsklatam", "wp.msklatam");

  return (
    <div className={`protfolio-course-2-wrapper ${className}`}>
      <div className="student-course-img">
        <Link to={`/curso/${product.slug}`}>
          <img src={imageURL} alt="course-img" />
        </Link>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
              />
              <Link to={`/curso/${product.slug}`}>
                <h3 className="">{product.title}</h3>
              </Link>
              {/* <div className="cart-lavel">
                <h5>
                  Nivel: <span>{product.level}</span>
                </h5>
                <p>{product.desc}</p>
              </div> */}
              {/* <div className="info-cart-text">
                <ul>
                  {product.list?.map((item: any, index) => {
                    return (
                      <li key={index}>
                        <i className="far fa-check"></i>
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div> */}
              <div className="course-action">
                <Link
                  to={`/curso/${product.slug}`}
                  className="view-details-btn"
                >
                  Ver más
                </Link>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <Link to={`/curso/${product.slug}`} className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <div className="flex flex-wrap gap-1">
            {product.duration ? null : (
              <>
                <Badge
                  icon="elearning"
                  color="emerald-post"
                  name="Guía profesional"
                  textSize="text-xs"
                />
              </>
            )}
            <CategoryBadgeList categories={product.categories} color="yellow" />
          </div>
          {/* <div className="portfolio-price">
            <span>${product.discount_price}</span>
            <del>${product.price}</del>
          </div> */}
          <div className="portfolio-course-2 line-clamp-3">
            <Link to={`/curso/${product.slug}`}>
              <h3 className="font-bold text-sm">{product.title}</h3>
            </Link>
          </div>
          {product.lista_de_cedentes ? (
            <p className="text-sm">{product.lista_de_cedentes[0].post_title}</p>
          ) : null}
        </div>
      </div>
      <div className="course-2-footer">
        {product.duration ? (
          <div className="coursee-clock">
            <i className="flaticon-clock"></i>
            <span>{product.duration} horas</span>
          </div>
        ) : (
          <div></div>
        )}

        <Link
          to={`/curso/${product.slug}`}
          className="course-network text-primary font-bold"
        >
          Descubrir
        </Link>
      </div>
    </div>
  );
};

export default StoreProduct;
