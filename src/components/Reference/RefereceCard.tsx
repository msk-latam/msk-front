import { FC } from "react";
import starIcon from "/public/images/icons/star.svg";
import googleIcon from "/public/images/icons/googleIcon.svg";
import Image from "next/image";
import { removeFirstSubdomain } from "@/utils/removeFirstSubdomain";

const ReferenceCard: FC<{ reference: any; className?: string }> = ({
  reference,
  className,
}) => {
  const stars = Array.from({ length: Number(reference.numero) }, (_, index) => (
    <Image key={index} src={starIcon.src} width={19} height={19} alt="Star" />
  ));

  const personReferenceImage = removeFirstSubdomain(reference.imagen);

  return (
    <div
      className={`px-10 p-6 bg-white transition-all hover:shadow-xl rounded-xl ${className}`}
    >
      <div className="flex items-center mb-4">
        <Image
          src={personReferenceImage}
          width={38}
          height={38}
          alt={reference.titulo}
          className="mr-3"
        />
        <div>
          <h4 className="text-[18px] text-[#392C35] text-left mb-1">
            {reference.titulo}
          </h4>
          <div className="flex">{stars}</div>
        </div>
        <Image
          src={googleIcon.src}
          alt="Google icon"
          width={22}
          height={22}
          className="ml-auto mr-3"
        />
      </div>
      <p className="text-violet-wash text-left text-sm">
        {reference.parrafo}
      </p>
    </div>
  );
};

export default ReferenceCard;
