import React from 'react';


const Pagination = ({ currentPage, prevPage, nextPage, onPrevious, onNext }) => {
  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${!prevPage ? 'disabled' : ''}`}>
            <button className="page-link" onClick={onPrevious}>Previous</button>
          </li>
          <li className={`page-item ${!nextPage ? 'disabled' : ''}`}>
            <button className="page-link" onClick={onNext}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;