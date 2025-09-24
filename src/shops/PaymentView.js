import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/bagActions";

function PaymentView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bag = useSelector((state) => state.bag);
  const shippingInfo = bag?.shippingInfo || {}; // 👈 Safe fallback
  const paymentMethodFromStore = bag?.paymentMethod || "PayPal"; // 👈 Safe fallback
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStore);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch save payment method action here
    dispatch(savePaymentMethod(paymentMethod));
    // Navigate to the next step (e.g., place order)
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Stripe"
              id="Stripe"
              name="paymentMethod"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </div>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentView;
