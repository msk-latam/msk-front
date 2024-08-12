import CancelTrialModal from "components/ModalCancelTrial/CancelTrial";
import NcLink from "components/NcLink/NcLink";
import { UserCourseProgress } from "data/types";
import {
  getStatusIcon,
  hasText,
  statusCourse,
  statusOrdenVenta,
} from "logic/account";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import ButtonActivateOrRegister from "./ButtonActivateOrRegister";

interface ProductAccountButtonProps {
  product: UserCourseProgress;
  onRequest: boolean;
  isRunning: boolean;
  onClick: () => void;
}

const ProductAccountButton: FC<ProductAccountButtonProps> = ({
  product,
  onRequest,
  isRunning,
  onClick,
}) => {
  const [showCancelTrial, setShowCancelTrial] = useState(false)
  const { status } = product;
  const { isDisabled } = statusCourse(status);
  const statusOV = statusOrdenVenta(product?.ov, status);
  const textStatus = statusOV.isDisabled ? statusOV.disabledText : statusOV.hasText
  const iconStatus = getStatusIcon(textStatus, product?.ov);


  return (
    <div className="course-2-footer text-grey-course">
      <div className="coursee-clock">
        <img
          src={iconStatus}
          alt={textStatus as string}
        />
        <span className="ml-2">
          {textStatus === "" ? status : textStatus} 
          {statusOV.hasText === 'Prueba' && 
          <div className="ml-1 inline-block">
           - <Link 
            to="#" 
            onClick={()=> setShowCancelTrial(true)} 
            className="underline text-violet-custom hover:text-violet-custom"> 
            Dar de baja
           </Link>
          </div>
          }
        </span>
      </div>

      <ButtonActivateOrRegister
      isDisabledActivate={isDisabled || statusOV.isDisabled}
      handleActivateClick={onClick}
      whenActivate={onRequest || isRunning || (typeof status === 'string' && status.includes("Listo para enrolar"))}
      status={status}
      productSlug={product.slug}
      />
      
      <CancelTrialModal 
      isOpenProp={showCancelTrial} item={product} 
      onCloseModal={() => setShowCancelTrial(false)}
      />
    </div>
  );
};

export default ProductAccountButton;
