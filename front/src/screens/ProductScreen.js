import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

//!tramite props.match posso identificare l'id del prodotto
//!props.history ---> https://reactrouter.com/web/api/history
//!entrambi fanno parte di react router
function ProductScreen({ match, history }) {
    //! pagina del singolo prodotto, quindi trovo il prodotto con id uguale a quello dell'url (NON SERVE DOPO CHE IMPOSTO BACKEND)
    // const product = products.find((p) => p._id === props.match.params.id);
    // console.log(typeof props.match.params.id); //string

    // const [product, setProduct] = useState({}); con redux non mi serve il locale state

    //qui setto la quantita per la select
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;

    //* -------------useEffect-------------------
    //dispatch dell'action per il singolo prodotto
    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match]);
    //* -----------------------------------------

    function addToCartHandler() {
        history.push(`/cart/${match.params.id}?qty=${qty}`); // es ---> http://localhost:3000/cart/5fe1d4be89f5360269386618?qty=8
    }

    return (
        <>
            <Link to="/">
                <Row>
                    <Col md={3}>
                        <Button
                            className="rounded btn-sm my-3 w-100"
                            variant="outline-dark"
                        >
                            <i className="fas fa-arrow-left"></i> Go Back
                        </Button>
                    </Col>
                </Row>
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger"> {error} </Message>
            ) : (
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

                    <Col className="mt-3" md={6}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>
                                                &euro; {product.price}
                                            </strong>
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
                                {/* se ho almeno un prodotto mostro la select con la quantita' da poter acquistare */}
                                {/* creo dinamicamente le option dal numero di prodotti in stock */}
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row className="d-flex align-items-center">
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control
                                                    size="sm"
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option key={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                        <Button
                            variant="warning"
                            className="btn-block rounded mx-auto mt-3"
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                        >
                            add to cart
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProductScreen;
