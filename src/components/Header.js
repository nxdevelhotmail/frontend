import React from "react";
import logo from "../chalogo.png";
import Menu from "./Menu";
import {
  Container,
  Navbar,
  Nav,
  Col,
  Form,
  Button,
  Row,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions"; // Import the logout action

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    // Dispatch logout action here
    dispatch(logout());
    localStorage.removeItem("userInfo");
    window.location.href = "/login"; // Redirect to login page after logout
  };
  return (
    <header>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        variant="light"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <div class="opacity-75">
              <img src={logo} alt="..." width={150} /> <b>COLLECTION</b>
            </div>
          </Navbar.Brand>

          <div style={{ position: "relative", width: "600px" }}>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  paddingRight: "45px", // space for icon
                  borderRadius: "50px",
                  border: "2px solid #ccc",
                }}
              />
              <Button
                type="submit"
                style={{
                  position: "absolute",
                  right: "5px",
                  top: "5px",
                  width: "30px",
                  height: "30px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50px",
                }}
                variant="light"
              >
                <i className="fa fa-search" />
              </Button>
            </Form>
          </div>

          <div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link as={Link} to="/bag">
                  <i class="fa-solid fa-bag-shopping"></i> Bag
                </Nav.Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="username">
                    console.log(userInfo.name);
                    <LinkContainer to="/profile" className="text-dark">
                      <NavDropdown.Item>Full Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="text-dark"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link as={Link} to="/login">
                    <i class="fa-solid fa-user"></i> Sign In
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
      <Menu />
    </header>
  );
}

export default Header;
