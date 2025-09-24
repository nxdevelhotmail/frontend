import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import Message from "../components/Message";
import { addToBag, removeFromBag } from "../actions/bagActions";

const ShoppingBag = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get("qty")) || 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { bagItems } = useSelector((state) => state.bag);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (id) {
      dispatch(addToBag(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromBagHandler = (productId) => {
    dispatch(removeFromBag(productId));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=shipping"); // 👈 Redirect to login if not authenticated
    }
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Your Shopping Bag</h1>
        {bagItems.length === 0 ? (
          <Message variant="info">
            Your shopping bag is empty. <Link to="/">Go Home</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {bagItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>IDR&nbsp;{item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToBag(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromBagHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({bagItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h2>
              IDR&nbsp;
              {bagItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="w-100"
                disabled={bagItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default ShoppingBag;
