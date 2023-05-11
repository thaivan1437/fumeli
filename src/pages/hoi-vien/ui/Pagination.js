import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  let pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
      if (i > 3 && i >= endPage) {
        pages.shift();
      }
    }
    if (startPage > 1) {
      pages = [1, 2, "...", ...pages];
    } else if (endPage < totalPages) {
      pages = [...pages, "...", totalPages];
    }
  }

  const handleChangePage = (data) => {
    if (data !== "prev" && data !== "next" && data !== "...") {
      setCurrentPage(data);
    } else if (data === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (data === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex justify-center my-6">
      <div className="flex border-y py-2 border-white [&>button]:border [&>button]:border-[#E88F08] [&>button]:rounded-full [&>button]:w-9 [&>button]:h-9 [&>button:hover]:bg-white [&>button:hover]:border [&>button:hover]:border-white [&>button:hover]:text-[#E88F08] [&>button:disabled]:bg-gray-500 [&>button:disabled]:border-none [&>button]:flex [&>button]:justify-center [&>button]:items-center [&>button:disabled]:pointer-events-none">
        <button
          className=""
          onClick={() => handleChangePage("prev")}
          disabled={currentPage === 1}
        >
          <ArrowBackIosNewIcon className="text-[13px] p-0 m-0" />
        </button>

        {/* Create a button for each page */}
        <div className="flex mx-2 [&>*]:mx-2">
          {pages.map((page) => (
            <button
              className={`w-9 h-9 rounded-full disabled:pointer-events-none ${
                currentPage === page
                  ? "border border-[#E88F08] text-[#FFBD59]"
                  : "hover:border hover:border-white"
              }`}
              onClick={() => handleChangePage(page)}
              key={page}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          className=""
          onClick={() => handleChangePage("next")}
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosIcon className="text-[13px]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
