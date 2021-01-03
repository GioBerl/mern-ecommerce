import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
    //!qui e' dove ci sono gli state
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

//dal localStorage mi prendo cartItems (se esiste, senno un array vuoto) e lo passo all'initial state
const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

//initial state e' dove mettero' quello che voglio caricare quando lo store viene generato
const initialState = {
    cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
