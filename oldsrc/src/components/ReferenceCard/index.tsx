import { FC } from 'react'
import starIcon from "/images/icons/star.svg";
import googleIcon from "/images/icons/googleIcon.svg";

const ReferenceCard: FC<{reference: any;}> = ({reference}) => {

    const stars = Array.from({ length: Number(reference.numero) }, (_, index) => (
        <img key={index} src={starIcon} alt="" />
      ));

  return (
    <div className=" px-10 p-6 bg-white transition-all hover:shadow-xl rounded-xl">
        <div className="flex items-center mb-4">
            <img src={reference.imagen} alt={reference.titulo} className="mr-3" />
            <div >
                <h4 className="text-lg text-[#392C35] text-left">{reference.titulo}</h4>
                <div className="flex">
                    {stars}
                </div>
            </div>
                <img src={googleIcon} className="ml-auto mr-3" />
        </div>
        <p className="text-violet-wash text-left text-sm">{reference.parrafo}</p>
    </div>
  )
}

export default ReferenceCard