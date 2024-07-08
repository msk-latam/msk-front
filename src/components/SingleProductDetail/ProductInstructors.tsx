"use client";
import { FC, useState } from "react";
import ProductDetailsInstructor from "./ProductDetailsInstructor";
import { FetchSingleProduct } from "@/data/types";
import StorePagination from "../MSK/Store/StorePagination";

interface Props {
  product: FetchSingleProduct;
  country?: string;
  isEbook?: boolean;
}

const ProductInstructors: FC<Props> = ({ product, country, isEbook }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.authors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(product.authors.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    // console.log(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <>
      {product.authors.length > 0 && !isEbook && (
        <h4 className="mt-6 font-bold pt-6 text-xl poppins-bold">
          Quiénes lo desarrollan
        </h4>
      )}

      {!isEbook && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          {currentItems.length > 0 &&
            currentItems.map((instructor, index) => {
              return (
                <ProductDetailsInstructor
                  instructor={instructor}
                  key={`inst_${index}`}
                  country={country}
                />
              );
            })}
        </div>
      )}
      {totalPages > 1 && !isEbook && (
        <div className="flex justify-center">
          <StorePagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ProductInstructors;
