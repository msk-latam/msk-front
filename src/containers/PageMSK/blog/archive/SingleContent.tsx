import { FC, useEffect, useRef } from "react";
import SingleAuthor from "./SingleAuthor";
import { useLocation } from "react-router";
import { FetchPostType } from "data/types";

export interface SingleContentProps {
  data: FetchPostType | any;
}

const SingleContent: FC<SingleContentProps> = ({ data }) => {
  const { author } = data;
  const commentRef = useRef<HTMLDivElement>(null);
  //
  const location = useLocation();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const htmlElement = document.createElement("div");
    htmlElement.innerHTML = data.content;
    if (textRef.current) {
      textRef.current.innerHTML = "";
      textRef.current.appendChild(htmlElement);
    }
    //  SCROLL TO COMMENT AREA
    // if (location.hash !== "#comment") {
    //   return;
    // }
    // if (location.hash === "#comment") {
    //   setTimeout(() => {
    //     if (commentRef.current) {
    //       commentRef.current.scrollIntoView();
    //     }
    //   }, 500);
    // }
  }, [location]);

  return (
    <div className="nc-SingleContent space-y-10">
      {/* ENTRY CONTENT */}
      <div
        id="single-entry-content"
        className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
      >
        {/* THIS IS THE DEMP CONTENT */}
        {/* IF YOUR DATA IS JSON, YOU CAN USE render with html-react-parser (https://www.npmjs.com/package/html-react-parser) */}
        <div ref={textRef} />
      </div>

      {/* TAGS */}
      {/* <div className="max-w-screen-md mx-auto flex flex-wrap">
        {tags.map((item) => (
          <Tag hideCount key={item.id} tag={item} className="mr-2 mb-2" />
        ))}
      </div> */}

      {/* AUTHOR */}
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      <div className="max-w-screen-md mx-auto ">
        <SingleAuthor author={author} />
      </div>

      {/* COMMENT FORM */}
    </div>
  );
};

export default SingleContent;
