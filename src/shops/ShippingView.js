import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingInfo } from "../actions/bagActions";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bag = useSelector((state) => state.bag);
  const shippingInfo = bag?.shippingInfo || {}; // 👈 Safe fallback

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [province, setProvince] = useState(shippingInfo.province || "");
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "Indonesia");

  const provinces = [
    "Aceh",
    "Bali",
    "Bangka Belitung Islands",
    "Banten",
    "Bengkulu",
    "Central Java",
    "Central Kalimantan",
    "Central Papua",
    "Central Sulawesi",
    "East Java",
    "East Kalimantan",
    "East Nusa Tenggara",
    "Gorontalo",
    "Highland Papua",
    "Jakarta",
    "Jambi",
    "Lampung",
    "Maluku",
    "North Kalimantan",
    "North Maluku",
    "North Sulawesi",
    "North Sumatra",
    "Papua",
    "Riau",
    "Riau Islands",
    "South Kalimantan",
    "South Papua",
    "South Sulawesi",
    "South Sumatra",
    "Southeast Sulawesi",
    "West Java",
    "West Kalimantan",
    "West Nusa Tenggara",
    "West Papua",
    "West Sulawesi",
    "West Sumatra",
    "Yogyakarta",
  ];

  const [message, setMessage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !province || !postalCode) {
      setMessage("Please fill in all fields");
    } else {
      // Here you would typically dispatch an action to save the shipping info
      // For now, we'll just log it
      console.log({
        address,
        city,
        province,
        postalCode,
        country: "Indonesia", // Hardcoded for now
      });
      dispatch(
        saveShippingInfo({
          address,
          city,
          province,
          postalCode,
          country: "Indonesia", // Hardcoded for now
        })
      );
      setMessage("Shipping information saved successfully!");
      // Optionally, redirect to the next step
      navigate("/payment");
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h2 className="text-center mb-4">Shipping Information</h2>
      {message && <Message variant="danger">{message}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="province" className="mb-3">
          <Form.Label>Province</Form.Label>
          <Form.Select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            required
          >
            <option value="">Select Province</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="postalCode" className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your country"
            // value={country}
            value="Indonesia"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Save Shipping Information
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingView;
