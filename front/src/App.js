import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";

function App() {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    {/* HOME ROUTE */}
                    <Route path="/" component={HomeScreen} exact></Route>

                    {/* PRODUCTS ROUTE */}
                    <Route path="/product/:id" component={ProductScreen}>
                        {/* <ProductScreen /> 
                        non posso usare questa notazione, perche' non mi prende l'id dall'url
                        */}
                    </Route>
                </Container>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
