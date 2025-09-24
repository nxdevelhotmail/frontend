import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProductDetails } from "../actions/productActions";

function ProductEditView() {
  const { id: productId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category: "",
    countInStock: 0,
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (!product || String(product._id) !== String(productId)) {
      dispatch(listProductDetails(productId));
    } else {
      setFormData({
        name: product.name ?? "",
        price: product.price ?? 0,
        image: product.image ?? "",
        brand: product.brand ?? "",
        category: product.category ?? "",
        countInStock: product.countInStock ?? 0,
        description: product.description ?? "",
      });
    }
  }, [dispatch, productId, product]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      // TODO: Dispatch update product action here
      console.log("Submitting:", formData);
    },
    [formData]
  );

  return (
    <>
      <Button
        className="btn btn-light my-3"
        onClick={() => navigate("/admin/productlist")}
      >
        Go Back
      </Button>
      <h1>Edit Product</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !product || String(product._id) !== String(productId) ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="my-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="my-2">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="brand" className="my-2">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={formData.brand}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="my-2">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock" className="my-2">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={formData.countInStock}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="my-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>
        </Form>
      )}
    </>
  );
}

export default ProductEditView;
