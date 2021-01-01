// https://expressjs.com/it/guide/routing.html (express.Router)
import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";
//! semplice Middleware per gestire le eccezioni all'interno di route express asincrone e passarle ai gestori di errori express.

const router = express.Router();

// *@description     Fetch all products
// *@route           GET /api/products
// *@access          Public
router.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await Product.find({});
        // throw new Error("some error");
        res.json(products);
    })
);

//* @description    Fetch single product
//* @route          GET /api/products/:id
//* @access         Public
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        // const product = products.find((p) => p._id === req.params.id);
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            //dopo aver impostato il nostro custom error handler posso semplicemente sollevare l'errore
            //* viene sollevato quando il formato Object.id e' valido, ma quell'id non esiste
            res.status(404);
            throw new Error("Product not found");
            // {
            //     "message": "Product not found",
            //
            //solo in development mode avremo anche:
            //     "stack": "Error: Product not found\n ..."
            // }
        }
    })
);

export default router;
