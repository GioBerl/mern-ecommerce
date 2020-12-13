import React from "react";
import products from "../products";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";

//!tramite props.match posso identificare l'id del prodotto
function ProductScreen(props) {
    //* pagina del singolo prodotto, quindi trovo il prodotto con id uguale a quello dell'url
    const product = products.find((p) => p._id === props.match.params.id);
    // console.log(typeof props.match.params.id); //string
    return (
        <>
            <Link to="/">
                <Button className="rounded my-3" variant="dark">
                    Go Back
                </Button>
            </Link>
            <Row>
                <Col md={6}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        rounded
                    />
                </Col>

                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews}reviews`}
                            />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: &euro; {product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4>Description</h4>
                            <p>{product.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>&euro; {product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        {product.countInStock
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Button
                                        className="btn-block rounded"
                                        disabled={product.countInStock === 0}
                                    >
                                        add to cart
                                    </Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;
