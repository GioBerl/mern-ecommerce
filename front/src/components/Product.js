import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

//* STRUTTURA OGGETTI DENTRO ARRAY products
// {
//     _id: "1",
//     name: "Airpods Wireless Bluetooth Headphones",
//     image: "/images/airpods.jpg",
//     description:
//         "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
//     brand: "Apple",
//     category: "Electronics",
//     price: 89.99,
//     countInStock: 10,
//     rating: 4.5,
//     numReviews: 12,
// }

function Product({ product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img
                    className="rounded"
                    src={product.image}
                    variant="top"
                />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">
                    <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Card.Text>

                <Card.Text as="h3">&euro; {product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Product;
