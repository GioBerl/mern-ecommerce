import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        //individual review rating
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const productSchema = mongoose.Schema(
    {
        //voglio sapere quale user ha creato il product (admin)
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        //reviews sara' un array di review objects, quindi lo metto metto in uno schema a parte
        reviews: [reviewSchema],
        //average rating di tutte le reviews
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
