import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
//? LinkContainer e' essenzialmente come Link, ma mi permette di wrappare i components di bootstrap
import { LinkContainer } from "react-router-bootstrap";

function Header() {
    return (
        <header>
            {/* Set collapseOnSelect to make the Navbar collapse automatically when the user selects an item */}
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    {/* HOME ROUTE */}
                    <LinkContainer to="/">
                        <Navbar.Brand>MY-SHOP</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* CART ROUTE */}
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="fas fa-shopping-cart"></i>
                                    Cart
                                </Nav.Link>
                            </LinkContainer>

                            {/* LOGIN ROUTE */}
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <i className="fas fa-user"></i>Sign In
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default Header;
