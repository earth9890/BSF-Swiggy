import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${
            currentPage === i ? "bg-gray-300" : "bg-white hover:bg-gray-200"
          } text-gray-800 font-bold py-2 px-4 rounded mx-1`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="mt-4 flex justify-center">
      {totalPages > 1 && renderPageNumbers()}
    </div>
  );
};

export default Pagination;
