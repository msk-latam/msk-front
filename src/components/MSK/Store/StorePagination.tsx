import React, { FC, useEffect, useState } from "react";
import fai from "../../../styles/fai/fontAwesome5Pro.module.css";
import NcLink from "@/components/NcLink/NcLink";
import {
  keepOnlySpecifiedParams,
  removeUrlParams,
} from "@/lib/removeUrlParams";

interface Props {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const StorePagination: FC<Props> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const newPages = [];
    for (let i = 1; i <= totalPages; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [totalPages]);

  // const hasSearch = history.location.search;
  // const urlTrack = hasSearch ? `${keepOnlySpecifiedParams(hasSearch)}` : "?";

  return (
    <>
      {totalPages > 1 ? (
        <div className="edu-pagination mt-30 mb-20">
          <ul className="items-center">
            {currentPage > 1 ? (
              <li
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer hidden sm:block"
              >
                {/* <NcLink
                  to={`${urlTrack}${
                    currentPage - 1 > 1 ? `&page=${currentPage - 1}` : ""
                  }`}
                  colorClass=""
                > */}
                <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                {/* </NcLink> */}
              </li>
            ) : (
              ""
            )}
            {pages.map((page) => {
              return (
                <li
                  className={
                    currentPage == page
                      ? "text-red-500 font-bold pointer"
                      : "text-black-600 cursor-pointer"
                  }
                  key={`page_${page}`}
                  onClick={() => onPageChange(page)}
                >
                  {/* <NcLink
                    to={`${urlTrack}${page > 1 ? `&page=${page}` : ""}`}
                    colorClass=""
                  > */}
                  {page < 10 ? `0${page}` : page}
                  {/* </NcLink> */}
                </li>
              );
            })}
            {totalPages > 1 && currentPage < totalPages ? (
              <li
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer hidden sm:block"
              >
                {/* <NcLink to={`${urlTrack}&page=${currentPage + 1}`}> */}
                <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                {/* </NcLink> */}
              </li>
            ) : null}
          </ul>
          <div className="flex sm:hidden mx-auto justify-center mt-2">
            {currentPage > 1 ? (
              <li
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer"
              >
                <a>
                  <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                </a>
              </li>
            ) : (
              ""
            )}
            {totalPages > 1 && currentPage < totalPages ? (
              <li
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
              >
                <a>
                  <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                </a>
              </li>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StorePagination;