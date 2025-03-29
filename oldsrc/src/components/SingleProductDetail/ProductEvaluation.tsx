import { Evaluation } from "@/data/types";
import React, { FC } from "react";

interface Props {
  evaluations: Evaluation;
}

const ProductEvaluation: FC<Props> = ({ evaluations }) => {
  const formattedEvs: any[] = [];
  Object.keys(evaluations).map((key, index) => {
    if (key != "data") formattedEvs.push(evaluations[index]);
  });
  const evaluationList = formattedEvs;

  return (
    <div className="course-learn-wrapper">
      <div className="course-learn">
        <div className="course-leranm-tittle">
          <h4 className="mb-15 font-bold text-xl poppins-bold">
            Cómo evaluamos
          </h4>
        </div>

        <div className="grid grid-col-2 grid-flow-col">
          <div className="course-leran-text f-left">
            <ul>
              {evaluationList?.map((evaluation, index) => {
                return (
                  <li key={`ev_${index}`}>
                    <img src="/images/vectors/isotipo.svg" width="20" alt="" />{" "}
                    {evaluation.methodology}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEvaluation;
