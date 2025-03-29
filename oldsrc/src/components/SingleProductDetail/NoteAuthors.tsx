"use client";
import React, { FC, useContext, useState } from "react";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
import { CountryContext } from "@/context/country/CountryContext";
interface Props {
  instructor: any;
}

const NoteAuthors: FC<Props> = ({ instructor }) => {
  const [displayBiography, setDisplayBiography] = useState(false);
  const { state } = useContext(CountryContext);
  const triggerDisplayBiography = () => {
    setDisplayBiography(!displayBiography);
  };
  const instructorName = { __html: instructor.name };
  return (
    <div className="course-instructors">
      <div className="instructors-heading">
        <div className="instructor-avatar">
          {instructor.avatar ? <img src={instructor.avatar} alt="img" /> : null}
        </div>
        <div className="instructors-body">
          <h5 dangerouslySetInnerHTML={instructorName}></h5>
          {instructor.specialties && instructor.specialties.length && (
            <p className="instructors-note-specialty text-primary font-semibold mt-2 text-sm cursor-pointer">
              Licenciado
            </p>
          )}
          <p className="instructors-description lg:pr-20">
            {instructor.description}
          </p>
        </div>
      </div>
      {displayBiography &&
      (instructor.specialties.length || instructor.centres.length) ? (
        <div className="intructors-content">
          {instructor.specialties.length ? (
            <div>
              <h5 className="mb-2">Especialidad</h5>
              <ul>
                {instructor.specialties.map(
                  (specialty: string, index: number) => {
                    return (
                      <li key={`spec_${index}`}>
                        <i className={`${fai.fa} ${fai["fa-circle"]}`}></i>
                        {specialty}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          ) : (
            <></>
          )}

          {instructor.centres.length ? (
            <div>
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
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NoteAuthors;
