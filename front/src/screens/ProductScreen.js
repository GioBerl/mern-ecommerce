import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import axios from "axios";

//!tramite props.match posso identificare l'id del prodotto
function ProductScreen({ match }) {
    //! pagina del singolo prodotto, quindi trovo il prodotto con id uguale a quello dell'url (NON SERVE DOPO CHE IMPOSTO BACKEND)
    // const product = products.find((p) => p._id === props.match.params.id);
    // console.log(typeof props.match.params.id); //string

    const [product, setProduct] = useState({});

    //* -------------useEffect-------------------
    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(
                `/api/products/${match.params.id}`
            );

            setProduct(data);
        };

        fetchProduct();
    }, [match]);
    //* -----------------------------------------

    return (
        <>
            <Link to="/">
                <Row>
                    <Col md={3}>
                        <Button
                            className="rounded btn-sm my-3 w-100"
                            variant="outline-dark"
                        >
                            <i class="fas fa-arrow-left"></i> Go Back
                        </Button>
                    </Col>
                </Row>
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

                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
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

                <Col className="mt-3">
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
                        </ListGroup>
                    </Card>
                    <Button
                        variant="warning"
                        className="btn-block rounded mx-auto mt-3"
                        disabled={product.countInStock === 0}
                    >
                        add to cart
                    </Button>
                </Col>
            </Row>
        </>
    );
}

export default ProductScreen;
