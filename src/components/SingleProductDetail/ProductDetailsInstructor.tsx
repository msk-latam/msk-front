import React, { FC } from "react";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
interface Props {
  instructor: any;
}

const ProductDetailsInstructor: FC<Props> = ({ instructor }) => {
  return (
    <div className="course-instructors">
      <div className="instructors-heading">
        <div className="instructors-img w-img">
          <img src={instructor.img} alt="img not found" />
        </div>
        <div className="instructors-body">
          <h5>{instructor.name}</h5>
          <p className="mt-2">{instructor.role}</p>
          <p className="text-primary font-semibold mt-2 text-sm">
            Ver biografía
          </p>
        </div>
      </div>
      <div className="intructors-content">
        <h5 className="mb-2">Especialidad</h5>
        <ul>
          {instructor.specialties.map((specialty: string, index: number) => {
            return (
              <li key={`spec_${index}`}>
                <i className={`${fai.fa} ${fai["fa-circle"]}`}></i>
                {specialty}
              </li>
            );
          })}
        </ul>
        <h5 className="mt-4 mb-2">Hospitales / Centros</h5>
        <ul>
          {instructor.centres.map((specialty: string, index: number) => {
            return (
              <li key={`spec_${index}`}>
                <i className={`${fai.fa} ${fai["fa-circle"]}`}></i>
                {specialty}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailsInstructor;
