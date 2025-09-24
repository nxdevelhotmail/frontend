import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderView() {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bag);
  const { bagItems, shippingInfo, paymentMethod } = bag;
  const taxRate = 0.11;

  const itemsPrice = bagItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((taxRate * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  if (!paymentMethod) {
    navigate("/payment");
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, success]);

  // Define the placeOrderHandler function
  const placeOrderHandler = () => {
    // TODO: Implement order placement logic here
    dispatch(
      createOrder({
        orderItems: bagItems,
        shippingAddress: shippingInfo,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
      })
    );
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {shippingInfo.address}, {shippingInfo.city}{" "}
                {shippingInfo.postalCode}, {shippingInfo.province},{" "}
                {shippingInfo.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {bagItems.length === 0 ? (
                <Message>Your bag is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {bagItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/IDR&nbsp;{item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x IDR&nbsp; {item.price} = IDR&nbsp;
                          {(item.qty * item.price).toLocaleString("de-DE", {
                            minimumFractionDigits: 2,
                          })}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>
                    IDR&nbsp;
                    {bagItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    IDR&nbsp;
                    {shippingPrice.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax ({(taxRate * 100).toFixed(0)}%)</Col>
                  <Col>
                    IDR&nbsp;
                    {taxPrice.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                    })}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong style={{ fontSize: "1.2rem" }}>Total</strong>
                  </Col>
                  <Col>
                    <strong style={{ fontSize: "1.2rem" }}>
                      IDR&nbsp;
                      {Number(totalPrice).toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                      })}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={bagItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
export default PlaceOrderView;
