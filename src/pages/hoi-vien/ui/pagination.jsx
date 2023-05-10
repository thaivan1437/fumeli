import React from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  let pages = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    const startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, currentPage + 1)
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
      if (i > 3 && i >= endPage) {
        pages.shift()
      }
    }
    if (startPage > 1) {
      pages = [1, 2, '...', ...pages]
    } else if (endPage < totalPages) {
      pages = [...pages, '...', totalPages]
    }
  }

  const handleChangePage = (data) => {
    if (data !== 'prev' && data !== 'next' && data !== '...') {
      setCurrentPage(data)
    } else if (data === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (data === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="pagination">
      <div className="pagination__container">
        {/* Create a button for each page */}
        <div className="css__btn">
          {pages.map((page) => (
            <button
              className={`pagination__page ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => handleChangePage(page)}
              key={page}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pagination
