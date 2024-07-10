"use client";
import React, { FC } from "react";
import ContainerSecondary from "@/components/ContainerSecondary";
import { WpContentData } from "@/data/types";
import ReferenceSlider from "@/components/Reference/ReferenceSlider";
import ReferenceCard from "@/components/Reference/RefereceCard";

const CommentReferences: FC<{ content: WpContentData }> = ({ content }) => {
  return (
    <ContainerSecondary contentAttribute={content?.recomendaciones}>
      <div className="flex flex-col  lg:grid lg:grid-cols-[30%_65%] lg:gap-x-8 lg:items-stretch justify-center mt-6 sm:mt-12">
        <div className="flex justify-center items-center flex-col bg-[#F6F7F8] border border-[#6474A6] rounded-xl py-4 px-4 mb-8 md:mb-0 mx-4">
          {content?.recomendaciones.items_1.map((cri, index) => (
            <div key={index} className="mb-5">
              <h4 className="!font-lora-italic font-normal text-[30px] md:text-[36px] text-[#392C35]">
                {cri.titulo}
              </h4>
              <p className="text-[18px] text-[#8D929E] max-w-[228px]">
                {cri.parrafo}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
          {content?.recomendaciones.items_2.map((cri, index) => (
            <ReferenceCard key={index} reference={cri} />
          ))}
        </div>

        <ReferenceSlider references={content?.recomendaciones.items_2} />
      </div>
    </ContainerSecondary>
  );
};

export default CommentReferences;
