import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, keyword = "" }) => {

  if (keyword) {
    keyword = keyword.split("?search=")[1];
  }

  if (!pages || pages <= 1) return null;

  const current = Number(page) || 1;

  return (
    <Pagination className="justify-content-center my-3">
      {[...Array(pages).keys()].map((x) => {
        const p = x + 1;
        const params = new URLSearchParams();
        params.set("page", p);
        if (keyword) params.set("search", keyword);
        const search = `?${params.toString()}`;

        // use `to.search` (or provide a full string) instead of putting `?` into pathname
        return (
          <Pagination.Item
            key={p}
            active={p === current}
            as={Link}
            to={{ pathname: "/", search }}
          >
            {p}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default Paginate;