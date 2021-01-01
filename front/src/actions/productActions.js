import axios from "axios";
import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
} from "../constants/productCostants";

//* ACTION PER TUTTI I PRODOTTI
// listProducts sara' attivato in HomeScreen
export const listProducts = () => async (dispatch) => {
    try {
        //mando la request, quindi nel reducer ora avro loading=true
        dispatch({ type: PRODUCT_LIST_REQUEST });
        //aspetto di ricevere i dati
        const { data } = await axios.get("/api/products");
        //una volta ricevuti mando la conferma di ricezione e i dati ricevuti o in caso di errore nel catch la risposta di un errore e l'errore ricevuto
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

//*ACTION PER I SINGOLI PRODOTTI
// listProductDetails sara' attivato in productScreen
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
