"use client";
import React, { FC } from "react";
import { parseHtml } from "@/utils/parseHTML";
import { stripHtmlTags } from "@/lib/pageHeadUtils";

const Phrase: FC<{ content: string }> = ({ content }) => {
  return (
    <div className="font-lora-italic p-4 text-[18px] border border-[#EBEFF4] rounded-lg text-center mb-[50px] sm:mb-[96px] text-[#8D929E]">
      {stripHtmlTags(content)}
    </div>
  );
};

export default Phrase;
