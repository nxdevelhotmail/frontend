import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const timer = useRef(null);
  const DEBOUNCE_MS = 400;

  // initialize from URL ?search=...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search") || "";
    setKeyword(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // debounced navigation as user types
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      const trimmed = keyword.trim();
      const path = trimmed ? `/?search=${encodeURIComponent(trimmed)}&page=1` : "/";
      // use replace to avoid filling history on each keystroke
      navigate(path, { replace: true });
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer.current);
  }, [keyword, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (timer.current) clearTimeout(timer.current);
    const trimmed = keyword.trim();
    navigate(trimmed ? `/?search=${encodeURIComponent(trimmed)}&page=1` : "/", { replace: true });
  };

  return (
    <Form onSubmit={submitHandler} className="position-relative" aria-label="Product Search Form">
      <Form.Control
        type="search"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        aria-label="Search Products"
        autoComplete="off"
        style={{
          width: "100%",
          height: "40px",
          fontSize: "16px",
          paddingRight: "45px",
          borderRadius: "50px",
          border: "2px solid #ccc",
        }}
      />
      <Button
        type="submit"
        variant="light"
        aria-label="Submit Search"
        title="Search"
        style={{
          position: "absolute",
          right: "10px",
          top: "5px",
          width: "30px",
          height: "30px",
          padding: "0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50px",
        }}
      >
        <i className="fa fa-search" aria-hidden="true" />
      </Button>
    </Form>
  );
};

export default SearchBox;
