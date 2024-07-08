import React, { FC, useEffect, useState } from "react";
import fai from "../../../styles/fai/fontAwesome5Pro.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { updateQueryString } from "@/utils/updateQueryString";

interface Props {
  totalPages: number;
  currentPage: number;
  urlTrack?: boolean;
  onPageChange: (page: number) => void;
}

const StorePagination: FC<Props> = ({
  totalPages,
  onPageChange,
  currentPage,
  urlTrack = false,
}) => {
  const [pages, setPages] = useState<number[]>([]);
  const searchParams = useSearchParams();

  const searchParamsObject = Object.fromEntries(searchParams);

  // Convertimos el objeto JavaScript en una cadena de consulta (query string)
  const queryString = Object.entries(searchParamsObject)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  useEffect(() => {
    const newPages = [];
    for (let i = 1; i <= totalPages; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [totalPages]);

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
                {urlTrack ? (
                  <Link
                    href={updateQueryString("/tienda", queryString, {
                      key: "page",
                      value: `${
                        currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ""
                      }`,
                    })}
                  >
                    <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                  </Link>
                ) : (
                  <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                )}
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
                  {urlTrack ? (
                    <Link
                      href={updateQueryString("/tienda", queryString, {
                        key: "page",
                        value: `${page}`,
                      })}
                    >
                      {page < 10 ? `0${page}` : page}
                    </Link>
                  ) : (
                    <>{page < 10 ? `0${page}` : page}</>
                  )}
                </li>
              );
            })}
            {totalPages > 1 && currentPage < totalPages ? (
              <li
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer hidden sm:block"
              >
                {urlTrack ? (
                  <Link
                    href={updateQueryString("/tienda", queryString, {
                      key: "page",
                      value: `${currentPage + 1}`,
                    })}
                  >
                    <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                  </Link>
                ) : (
                  <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                )}
              </li>
            ) : null}
          </ul>

          <div className="flex sm:hidden mx-auto justify-center mt-2">
            {currentPage > 1 ? (
              <li
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer"
              >
                {urlTrack ? (
                  <Link
                    href={`${
                      currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ""
                    }`}
                  >
                    <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                  </Link>
                ) : (
                  <i className={`${fai.fal} ${fai["fa-angle-left"]}`}></i>
                )}
              </li>
            ) : (
              ""
            )}

            {totalPages > 1 && currentPage < totalPages ? (
              <li
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
              >
                {urlTrack ? (
                  <Link
                    href={updateQueryString("/tienda", queryString, {
                      key: "page",
                      value: `${
                        currentPage - 1 > 1 ? `?page=${currentPage - 1}` : ""
                      }`,
                    })}
                  >
                    <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                  </Link>
                ) : (
                  <i className={`${fai.fal} ${fai["fa-angle-right"]}`}></i>
                )}
              </li>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default StorePagination;
