import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import { listProducts } from "../actions/productActions";

const HomeRunaway = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get("search") || "";

  const { loading, error, products, page, pages } = useSelector((state) => state.productList);
  console.log(keyword);
  useEffect(() => {
    
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <main>
      <h1 className="text-center py-3">🛍️ Happy Shopping!</h1>
      <h3 className="mb-4">Just Coming In...</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message variant="info">No products found.</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </div>

      )}
    </main>
  );
};

export default HomeRunaway;
