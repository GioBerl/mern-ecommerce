import { CART_ADD_ITEM } from "../constants/cartCostants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload; //oggetto con le property del prodotto e la quantita'

            //verifico che l'oggetto esista all'interno dell'array cartItems
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );

            //se c'e' gia' un prodotto che matcha in cartItems ritorno lo state esistente con il corretto cartItems mappando l'array cardItems e sostituendo solo il product che matcha con il mio existItems e lasciando gli altri invariati
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((p) =>
                        p.product === existItem.product ? item : p
                    ),
                };
            } //altrimenti (quindi se non esiste) ritorno lo state esistente aggiungendo il nuovo item
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }

        default:
            return state;
    }
};
