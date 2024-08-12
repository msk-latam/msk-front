import { FC, useContext, useRef, useState } from "react";
import { User, UserCourseProgress } from "data/types";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import Badge from "components/Badge/Badge";
import { goToEnroll, goToLMS, statusCourse } from "logic/account";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import { CountryContext } from "context/country/CountryContext";
import ProductAccountButton from "./ProductAccountButton";
import InfoText from "components/InfoText/InfoText";
import { STATUS } from "data/statusCourses";
import useInterval from "hooks/useInterval";
import DateProductExpiration from "components/Account/DateProductExpiration";
import { AuthContext } from "context/user/AuthContext";

interface Props {
  product: UserCourseProgress;
  user: User;
  className?: string;
  hoverEffect?: boolean;
  isAccount?: boolean;
}

const ProductAccount: FC<Props> = ({
  product,
  user,
  className,
  hoverEffect = false,
}) => {
  const { isDisabled } = statusCourse(product?.status);
  const { isRunning, startWatch } = useInterval(user.email);
  const activeProductRef = useRef(
    product?.status !== "Inactivo" && product?.status !== "Expirado" && product?.status !== STATUS.SUSPEND
  );

  const showHelp = product.ov === "Baja" || product.ov === STATUS.SUSPEND || (isDisabled && !product.status?.includes(STATUS.TO_ENROLL));
  const showTip = product.status?.includes(STATUS.TO_ENROLL);

  const productExpiration = useRef(new Date(product.expiration));
  const productExpirationEnroll = useRef(new Date(product.limit_enroll));
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const { state } = useContext(CountryContext);
  const { state:authState } = useContext(AuthContext);

  const imageURL = product.thumbnail.high?.replace(`${"mx" || state.country}.`,"");

  const handleClick = async () => {
    if ((product.ov !== "Baja" && product.ov !== 'Trial suspendido') && activeProductRef.current) {
      setOnRequest(true);
      try {
        if (product.status === "Sin enrolar") {
          const response = await goToEnroll(product.product_code, user.email);

          if (response.data[0].code.includes("SUCCESS")) {
            const watching = await startWatch(product.product_code);
            console.log(!!watching, { watching });
            setOnRequest(!!watching);
          } else {
            setOnRequest(false);
          }
        } else {
          goToLMS(
            product.product_code,
            product.product_code_cedente as string,
            user.email
          );
          setOnRequest(false);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className={`protfolio-course-2-wrapper ${className}`}>
      <div className="student-course-img">
        <a onClick={handleClick}>
          <img src={imageURL} alt="course-img" />
        </a>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={true}
              />
              <a onClick={handleClick}>
                <h3>{product.title}</h3>
              </a>
              <div className="course-action">
                <a onClick={handleClick} className="view-details-btn">
                  Ver más
                </a>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <a onClick={handleClick} className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <div>
            <div className="flex gap-2 flex-wrap">
              {product.duration ? null : (
                <>
                  <Badge
                    icon="elearning"
                    color="emerald-post"
                    name="Guía profesional"
                    textSize="text-[11px]"
                  />
                </>
              )}
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={true}
                textSize="text-[11px]"
              />
            </div>
            <div className="portfolio-course-2 line-clamp-3">
              <a onClick={handleClick} className="">
                <h3 className="font-bold text-sm">{product.title}</h3>
              </a>
            </div>
          </div>
          <div>
            {(product.ov !== "Baja" && product.ov !== 'Trial suspendido') && (
              <>
                {product.expiration ? (
                  <DateProductExpiration
                    date={productExpiration.current}
                    text="Fecha de expiración"
                    user={authState.profile}
                    product={product}
                  />
                ) : (
                  <DateProductExpiration
                    date={productExpirationEnroll.current}
                    text="Fecha límite de activación"
                    user={authState.profile}
                    product={product}
                  />
                )}
              </>
            )}
            {showHelp && <CentroAyudaLink addClassNames="my-2" />}
            {showTip && (
              <InfoText
                addClassNames="mt-2"
                text="¿No ves resultados? Intenta refrescar la pantalla."
              />
            )}
          </div>
        </div>
      </div>
      {product ? (
        <ProductAccountButton
          product={product}
          onRequest={onRequest}
          isRunning={isRunning}
          onClick={handleClick}
        />
      ) : null}
    </div>
  );
};

export default ProductAccount;
