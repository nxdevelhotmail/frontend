import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages = 1, page = 1, keyword = "", isAdmin = false }) => {
  const extractSearchKeyword = (input) => {
    if (typeof input !== "string" || !input) return "";
    try {
      const query = input.includes("?") ? input.split("?")[1] : input;
      const params = new URLSearchParams(query);
      return params.get("search") || input;
    } catch {
      return "";
    }
  };

  const searchKeyword = extractSearchKeyword(keyword);
  const currentPage = Number(page);

  if (pages <= 1) return null;

  return (
    <Pagination className="justify-content-center my-3">
      {Array.from({ length: pages }, (_, i) => {
        const pageNumber = i + 1;
        const queryParams = new URLSearchParams({ page: pageNumber });
        if (searchKeyword) queryParams.set("search", searchKeyword);

        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            as={Link}
            to={{
              pathname: isAdmin ? "/admin/productlist" : "/",
              search: `?${queryParams.toString()}`,
            }}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default Paginate;
