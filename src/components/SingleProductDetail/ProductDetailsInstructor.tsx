import React, { FC, useContext, useState } from "react";
import Image from "next/image";
import { removeFirstSubdomain } from "@/utils/removeFirstSubdomain";
// import fai from "../../styles/fai/fontAwesome5Pro.module.css";
interface Props {
  instructor: any;
  country?: string;
}

const ProductDetailsInstructor: FC<Props> = ({ instructor, country }) => {
  const [displayBiography, setDisplayBiography] = useState(false);
  const triggerDisplayBiography = () => {
    setDisplayBiography(!displayBiography);
  };
  const instructorName = { __html: instructor.name };

  return (
    <div className="course-instructors">
      <div className="instructors-heading">
        <div className="instructors-img">
          <Image
            src={removeFirstSubdomain(instructor.image)}
            alt={`${instructor.name} picture`}
            className="animate-fade"
            width={130}
            height={130}
          />
        </div>
        <div className="instructors-body ">
          <h3
            dangerouslySetInnerHTML={instructorName}
            className="animate-fade font-poppins"
          ></h3>
          <p className="mt-2 animate-fade font-poppins text-violet-wash text-[14px]">
            {instructor.description}
          </p>
          {instructor.specialties.length || instructor.centres.length ? (
            <p
              onClick={triggerDisplayBiography}
              className="text-primary font-semibold mt-2 text-sm cursor-pointer animate-fade"
            >
              Ver biografía
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      {displayBiography ? (
        <div className="intructors-content">
          {instructor.specialties.length ? (
            <div>
              <h5 className="mb-2">Especialidad</h5>
              <ul>
                {instructor.specialties.map(
                  (specialty: string, index: number) => {
                    return (
                      <li key={`spec_${index}`}>
                        {/* <i className={`${fai.fa} ${fai["fa-circle"]}`}></i> */}
                        {specialty}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : null}

          {instructor.centres.length ? (
            <div>
              <h5 className="mt-4 mb-2">Hospitales / Centros</h5>
              <ul>
                {instructor.centres.map((specialty: string, index: number) => {
                  return (
                    <li key={`spec_${index}`}>
                      {/* <i className={`${fai.fa} ${fai["fa-circle"]}`}></i> */}
                      {specialty}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductDetailsInstructor;
