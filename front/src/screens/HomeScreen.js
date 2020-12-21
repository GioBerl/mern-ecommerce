import React, { useState, useEffect } from "react";
// import products from "../products";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

function HomeScreen() {
    //! -------------useState-------------------
    const [products, setProducts] = useState([]);
    //! -----------------------------------------

    //* -------------useEffect-------------------
    useEffect(() => {
        const fetchProducts = async () => {
            //res.data
            //!attenzione: avrai problemi di cors risolti in proxy di package.json (front)
            const { data } = await axios.get("/api/products");

            setProducts(data);
        };

        fetchProducts();
    }, []);
    //* -----------------------------------------

    return (
        <>
            <h1 className="text-center">Latest Products</h1>
            <Row className="text-center m-auto">
                {products.map((product) => (
                    <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    );
}

export default HomeScreen;
