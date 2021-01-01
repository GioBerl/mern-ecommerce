import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    productDetailsReducer,
    productListReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
    //!qui e' dove ci sono gli state
    productList: productListReducer,
    productDetails: productDetailsReducer,
});
//initial state e' dove mettero' quello che voglio caricare quando lo store viene generato
const initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
