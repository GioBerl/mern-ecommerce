import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { Link } from "react-router-dom";
import {
    Col,
    Row,
    ListGroup,
    Image,
    Form,
    Button,
    Card,
} from "react-bootstrap";
import Message from "../components/Message";

function CartScreen({ match, location, history }) {
    //*-------------match---------------------
    //console.log(match); //?   {path: "/cart/:id?", url: "/cart/5fe1d4be89f5360269386619", isExact: true, params: {id: "5fe1d4be89f5360269386619"}}
    //*---------------------------------------

    //*-------------location---------------------
    //console.log(location); //?   {pathname: "/cart/5fe1d4be89f5360269386619", search: "?qty=1", hash: "", state: undefined, key: "rbgm89"}
    //*------------------------------------------

    const productId = match.params.id; //ES 5fe1d4be89f5360269386619 se ci arrivi dal link add to cart, se invece ci arrivi dal link della nav quindi senza passare un id dara' undefined

    const qty = location.search ? Number(location.search.split("=")[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        // se nell'url ho l'id del prodotto faccio il dispatch dell'action addToCart
        if (productId) {
            //l'action addToCart fara' la richiesta al server, aggiornera' lo state e salvera' cartItems nel localStorage
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
        console.log("remove");
    };

    const checkoutHandler = () => {
        //faccio il redirect, se sono loggato a shipping, altrimenti alla pagina di login
        history.push("/login?redirect=shipping");
    };

    return (
        <Row>
            <Col md={7}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>{" "}
                    </Message>
                ) : (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image
                                            fluid
                                            rounded
                                            src={item.image}
                                            alt={item.name}
                                        ></Image>
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                    </Col>
                                    <Col md={2}>&euro;{item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            size="sm"
                                            as="select"
                                            value={item.qty}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.product,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[
                                                ...Array(
                                                    item.countInStock
                                                ).keys(),
                                            ].map((x) => (
                                                <option key={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type="button"
                                            variant="light"
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.product
                                                )
                                            }
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
            <Col md={5}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.qty,
                                    0
                                )}
                                )
                            </h2>
                            {cartItems.map((item) => (
                                <p>
                                    &euro;{item.price}X{item.qty}
                                </p>
                            ))}
                            <hr />
                            &euro;
                            {cartItems
                                .reduce(
                                    (acc, item) => acc + item.qty * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type="button"
                                className="btn-block"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    );
}

export default CartScreen;
