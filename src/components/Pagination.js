import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <ButtonGroup className="my-3">
      <Button
        variant="danger"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        variant="danger"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;