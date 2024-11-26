import React, { Component } from "react";
import Header from "./components/Header";
import "./App.css";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      activeCategory:
        JSON.parse(localStorage.getItem("activeCategory")) || "all",
      cartState: false,
      currentItem: null,
    };
  }

  componentDidMount() {
    fetch("http://shehab-gamal334.serv00.net:38837/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "{ getCategories { name } }",
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          categories: data.data.getCategories,
        })
      )
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  handleCategorySelect = (category) => {
    localStorage.setItem("activeCategory", JSON.stringify(category));
    this.setState({ activeCategory: category });
  };

  toggleCart = () => {
    this.setState({ cartState: !this.state.cartState });
  };
  toggleProduct = (currentItem) => {
    this.setState({ currentItem });
  };
  handleCountChange = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];
    const cartCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("cart-count", JSON.stringify(cartCount));
  };
  render() {
    return (
      <>
        <Router>
          <Header
            categories={this.state.categories}
            activeCategory={this.state.activeCategory}
            handleCategorySelect={this.handleCategorySelect}
            handleCartOpen={this.toggleCart}
            cartState={this.state.cartState}
            handleCountChange={this.handleCountChange}
          />

          <Routes>
            <Route path="/" element={<Navigate to="/all" />} />
            <Route
              path="/:category"
              exact
              element={
                <ProductListingPage
                  activeCategory={this.state.activeCategory}
                  toggleProduct={this.toggleProduct}
                  cartState={this.state.cartState}
                  handleCartOpen={this.toggleCart}
                  handleCountChange={this.handleCountChange}
                />
              }
            />

            <Route
              path="/:category/product/:id"
              exact
              element={
                <ProductDetailsPage
                  currentItem={this.state.currentItem}
                  cartState={this.state.cartState}
                  handleCartOpen={this.toggleCart}
                  handleCountChange={this.handleCountChange}
                />
              }
            />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
