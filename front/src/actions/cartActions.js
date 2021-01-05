import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartCostants";

//action per aggiungere un prodotto al carrello
//id e url li prendo dall' url di cartScreen
export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty,
        },
    });

    //salvo lo state nel localStorage cosi anche se chiudo la pagina mi rimane salvato
    //!ricorda che i metodi di localStorage accettano solo stringhe
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};
