import React, { useEffect } from "react";
// import products from "../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
// import axios from "axios"; adesso la request sara' effettuata dall'action listProducts dentro productActions.js
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomeScreen() {
    //* -------------REDUX-------------------
    //productList e' il nome del reducer assegnato allo store che ritorna un oggetto con tre possibili property: loading products error, quindi lo posso destrutturare
    const productList = useSelector((state) => state.productList);
    const { loading, products, error } = productList;
    //posso usare la truthiness di loading per generare lo spinner quando sta caricando i dati
    const dispatch = useDispatch();
    //* -----------------------------------------
    //! -------------useState-------------------
    // usando redux non mi serve piu uno state 'locale'
    // const [products, setProducts] = useState([]);
    //! -----------------------------------------

    //* -------------useEffect-------------------
    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);
    //* -----------------------------------------

    return (
        <>
            <h1 className="text-center">Latest Products</h1>
            {loading ? (
                <Loader>carico i dati...</Loader>
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Row className="text-center m-auto">
                    {products.map((product) => (
                        <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
}

export default HomeScreen;
