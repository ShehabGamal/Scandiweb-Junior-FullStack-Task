import React, { Component } from "react";
import "./ProductListingPageStyle.css";
import PLPProductInStock from "../sub-components/PLPProductInStock.js";
import PLPProductOutStock from "../sub-components/PLPProductOutStock.js";

class ProductListingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopItems: [],
    };
  }

  componentDidMount() {
    fetch("http://shehab-gamal334.serv00.net:38837/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          "{ getProducts { id name currency_symbol amount attributes { id name value } gallery in_stock category { name } } }",
      }),
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          shopItems: data.data.getProducts,
        })
      );
  }

  renderProductsByCategory = () => {
    const { activeCategory, toggleProduct} = this.props;
    const { shopItems } = this.state;

    let filteredShopItems = [];
    switch (activeCategory) {
      case "all":
        filteredShopItems = shopItems;
        break;
      default:
        filteredShopItems = shopItems.filter(
          (item) => item.category?.name === activeCategory
        );
        break;
    }

    return filteredShopItems.map((shopitem, index) =>
      shopitem.in_stock ? (
        <PLPProductInStock
          key={shopitem.id}
          toggleProduct={toggleProduct}
          shopitem={shopitem}
          index={index}
          handleQuickShop={this.handleQuickShop}
        />
      ) : (
        <PLPProductOutStock key={shopitem.id} shopitem={shopitem} index={index} />
      )
    );
  };

  handleQuickShop = (id) => {
    const { shopItems } = this.state;
    const { handleCartOpen,handleCountChange} = this.props;
    const cartItems =
      JSON.parse(localStorage.getItem("cart-items")) || [];

    const [shopitem] = shopItems.filter((item) => {
      return item.id === id;
    });

    const preferences = {};
    [...shopitem.attributes].reverse().forEach((header) => {
      if (header) {
        preferences[header.name] = header.value;
      }
    });

    const newItem = {
      name: shopitem.name || "",
      amount: shopitem.amount || 0,
      symbol: shopitem.currency_symbol || "",
      gallery: shopitem.gallery || [],
      quantity: 1,
      attributes: shopitem.attributes || [],
      headers:
        shopitem.attributes
          .map((header) => header.name)
          .filter((value, index, array) => array.indexOf(value) === index) ||
        [],
      preferences: preferences||{},
    };

    const itemIndex = cartItems.findIndex(
      (item) =>
        item.name === newItem.name&&
        JSON.stringify(item.preferences) ===
          JSON.stringify(newItem.preferences)
    );

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      cartItems.push(newItem);
    }

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
    handleCartOpen();
    handleCountChange();
  };

  render() {
    const { activeCategory, cartState } = this.props;

    return (
      <div
        className={`shop-page ${cartState ? "disabled" : ""}`}
        style={{
          opacity: cartState ? 0.5 : 1,
          pointerEvents: cartState ? "none" : "auto",
        }}
      >
        <h1 className="active-category">{activeCategory.toUpperCase()}</h1>

        <div className="shop-listing">{this.renderProductsByCategory()}</div>
      </div>
    );
  }
}

export default ProductListingPage;
