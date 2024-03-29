import { FC, useContext, useRef } from "react";
import Badge from "components/Badge/Badge";
import NcImage from "components/NcImage/NcImage";
import {
  colorStatus,
  goToEnroll,
  statusCourse,
  statusOrdenVenta,
} from "logic/account";
import ButtonAccessCourse from "./ButtonAccessCourse";
import { UserCourseProgress } from "data/types";
import InfoText from "components/InfoText/InfoText";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import DateProductExpiration from "./DateProductExpiration";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import ButtonOffTrial from "./ButtonOffTrial";
import { AuthContext } from "context/user/AuthContext";
import ButtonAccessOrSignCourse from "./ButtonAccessOrSignCourse";

interface MobileCourseItemProps {
  item: UserCourseProgress;
  email: string;
  goToLMS: (
    product_code: number,
    cod_curso: string,
    email: string
  ) => Promise<void>;
}

const MobileCourseItem: FC<MobileCourseItemProps> = ({
  item,
  email,
  goToLMS,
}) => {
  const { isDisabled } = statusCourse(item.status);
  const statusOV = statusOrdenVenta(item.ov);

  const isReadyToEnroll = item?.status?.includes("Listo para enrolar");
  const productExpiration = useRef(new Date(item.expiration));
  const productExpirationEnroll = useRef(new Date(item.limit_enroll));

  const trialName = item.ov.includes("suspendido") ? "Prueba cancelada" : "Prueba"
  const {state: authState} = useContext(AuthContext);

  return (
    <li className="my-account-courses-mobile">
      <div className="direct-info">
        <NcImage
          containerClassName="flex-shrink-0 h-[32px] w-[32px] rounded-lg overflow-hidden lg:h-14 lg:w-14"
          src={item.featured_image}
        />

        <span className="font-normal dark:text-neutral-300 text-[14px] leading-4 sm:leading-1">
          {item.title || "-"}
        </span>
        <div className="status-badge ml-auto">
          
          {item.ov.includes("Trial") ? (
          <CategoryBadgeList 
            categories={[trialName]} 
            isTrial={item.ov.includes("Trial")} 
            />
            ) : (
              <Badge
              name={statusOV.isDisabled ? statusOV.hasText : item?.status}
              color={colorStatus(
                statusOV.isDisabled ? statusOV.hasText : item?.status
              )}
              className="text-[14px]"
            />
          )}
        </div>
      </div>
      {item.ov !== "Baja" && (
        <>
          {item.expiration ? (
            <DateProductExpiration
              date={productExpiration.current}
              text="Fecha de expiración"
              product={item}
              user={authState.profile}
            />
          ) : (
            <DateProductExpiration
              date={productExpirationEnroll.current}
              text="Fecha límite de activación"
              product={item}
              user={authState.profile}
            />
          )}
        </>
      )}

      {(isDisabled && !isReadyToEnroll) ||
        (statusOV.isDisabled && <CentroAyudaLink />)}

      {isReadyToEnroll && (
        <InfoText text="¿No ves resultados? Intenta refrescar la pantalla." />
      )}
      <div className="w-full mt-1">
        <ButtonAccessOrSignCourse
          email={email}
          goToEnroll={goToEnroll}
          goToLMS={goToLMS}
          item={item}
        />
        {item.ov.includes("Trial") && 
         <>
         <br />
         <ButtonOffTrial 
            item={item} 
            email={email}
         />
         </>
         }
      </div>
    </li>
  );
};

export default MobileCourseItem;
