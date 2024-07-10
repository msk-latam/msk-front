"use client";
import { FC, ReactNode } from "react";
import { parseHtml } from "@/utils/parseHTML";
import { stripHtmlTags } from "@/lib/pageHeadUtils";

interface ContainerSecondaryProps {
  contentAttribute: { texto_1: string; texto_2: string };
  children?: ReactNode | null;
}

const ContainerSecondary: FC<ContainerSecondaryProps> = ({
  contentAttribute,
  children = null,
}) => {
  // @ts-ignore
  return (
    <div className="bg-[#F3F4F6] mt-8 p-4 py-16 md:container text-center md:rounded-[40px] mb-[96px]">
      <h2 className="text-[20px] md:text-[36px] mx-2 my-3 raleway font-normal text-[#392C35]">
        {stripHtmlTags(contentAttribute.texto_1)}
      </h2>
      <p className="text-[14px] md:text-[20px] mx-2 text-violet-wash">
        {stripHtmlTags(contentAttribute.texto_2)}
      </p>
      {children}
    </div>
  );
};

export default ContainerSecondary;
