import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="align-items-center">
        {/* Left Column: Image */}
        <Col md={6} className="d-none d-md-block text-center">
          <img
            src="/images/placeholder.png" // Replace with your actual image path
            alt="Register"
            className="img-fluid form-image"
            style={{ maxWidth: "70%", height: "auto", opacity: 0.3 }}
          />
        </Col>

        {/* Right Column: Form */}
        <Col xs={12} md={6}>
          <div className="form-container">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
