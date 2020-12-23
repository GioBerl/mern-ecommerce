const PORT = process.env.PORT || 5000;

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
//! import products from "./data/products.js";
//!non mi serve piu una volta impostato il DB

import productRoute from "./routes/productRoute.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

//!CONNESSIONE AL DB
connectDB();

const app = express();

app.get("/", (req, res) => {
    res.send("Api is Running...");
});

// app.get("/api/products", (req, res) => {
//     res.json(products);
// });

// app.get("/api/products/:id", (req, res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(product);
// });

//vengono sostituiti dal router in productRouter

app.use("/api/products", productRoute);

//!errors middlewares
//https://expressjs.com/it/guide/using-middleware.html
//https://www.udemy.com/course/mern-ecommerce/learn/lecture/22484992#questions/12896694

//gestione errore 404 intercetto tutte le request che non matchano con la route /api/products, sollevo l'errore e imposto lo status a 404 quindi ad ES: /test mi sollevera' un errore con status 404 e passo l'errore al prossimo midlleware (che gestisce gli errori)
app.use(notFound);

//gestore degli errori
app.use(errorHandler);

app.listen(
    PORT,
    console.log(
        `server running in ${process.env.NODE_ENV.red} mode on port ${PORT}`
            .white.bold
    )
);
