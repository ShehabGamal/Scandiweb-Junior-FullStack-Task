import React, { Component } from "react";
import "./ProductDetailsPageStyle.css";
import Gallery from "../sub-components/Gallery";
import PDPColorAttribute from "../sub-components/PDPColorAttribute";
import PDPRegularAttribute from '../sub-components/PDPRegularAttribute'
class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopitem: [],
      attributes: [],
      headers: [],
      preferences: {},
    };
  }

  componentDidMount() {
    const { currentItem } = this.props;

    if (currentItem) {
      fetch("http://shehab-gamal334.serv00.net:38837/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{getProductById(id:"${currentItem}"){ id name  description brand amount gallery currency_symbol attributes { id name value }}}`,
        }),
      })
        .then((res) => res.json())
        .then((data) =>
          this.setState({
            shopitem: data.data.getProductById,
            attributes: data.data.getProductById.attributes,
            headers: data.data.getProductById.attributes
              .map((value) => {
                return value.name;
              })
              .filter((value, index, array) => {
                return array.indexOf(value) === index;
              }),
          })
        )
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }

  removeHTMLTags(htmlString) {
    const parser = new DOMParser();

    const doc = parser.parseFromString(htmlString, "text/html");

    const textContent = doc.body.textContent || "";

    return textContent.trim();
  }

  handleSelection = (header, preference) => {
    this.setState((prevState) => ({
      preferences: {
        ...prevState.preferences,
        [header]: preference,
      },
    }));
  };

  handleAddToCart = () => {
    const { shopitem, attributes, preferences } = this.state;
    const cartItems = JSON.parse(localStorage.getItem("cart-items")) || [];

    const newItem = {
      name: shopitem.name,
      amount: shopitem.amount,
      symbol: shopitem.currency_symbol,
      gallery: shopitem.gallery,
      quantity: 1,
      attributes: attributes || [],
      headers:
        attributes
          .map((value) => {
            return value.name;
          })
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          }) || [],
      preferences: preferences || {},
    };

    const productIndex = cartItems.findIndex(
      (item) =>
        item.name === newItem.name &&
        JSON.stringify(item.preferences) ===
          JSON.stringify(newItem.preferences) &&
        JSON.stringify(item.attributes) === JSON.stringify(newItem.attributes)
    );
    if (
      (newItem.attributes.length > 0 &&
        Object.keys(newItem.preferences).length > 0) ||
      (newItem.attributes.length === 0 &&
        Object.keys(newItem.preferences).length === 0)
    ) {
      if (productIndex !== -1) {
        cartItems[productIndex].quantity += 1;
      } else {
        cartItems.push(newItem);
      }
    }

    localStorage.setItem("cart-items", JSON.stringify(cartItems));
  };
  handleAttributeDisplay = () => {
    const { attributes, headers, preferences } = this.state;
    return (
      <div className="attributes-section">
        {headers.map((header, headerIndex) => (
          <div
            className="attributes-container"
            data-testid={`product-attribute-${header
              .toLowerCase()
              .replaceAll(" ", "-")}${
              preferences[header]
                ? `-${preferences[header].toLowerCase().replaceAll(" ", "-")}`
                : "" 
            }`}
          >{header==='Color'?
            <PDPColorAttribute
                header={header}
                attributes={attributes}
                preferences={preferences}
                headerIndex={headerIndex}
                handleSelection={this.handleSelection}
              />:
              <PDPRegularAttribute
                header={header}
                attributes={attributes}
                preferences={preferences}
                headerIndex={headerIndex}
                handleSelection={this.handleSelection}
              />
              }
          </div>
        ))}
      </div>
    );
  };
  render() {
    const { shopitem } = this.state;
    const { cartState, handleCartOpen, handleCountChange } = this.props;

    return (
      <div
        className={`PDP-container ${cartState ? "disabled" : ""}`}
        style={{
          opacity: cartState ? 0.5 : 1,
          pointerEvents: cartState ? "none" : "auto",
        }}
      >
        <Gallery id={shopitem.id} />

        <div className="shop-item-info">
          <div className="shop-item-name">{shopitem.name}</div>

          {this.handleAttributeDisplay()}

          <div className="shop-item-amount">
            <div className="shop-item-price-header">PRICE:</div>

            <div className="shop-item-charge">
              {this.state.shopitem.currency_symbol}
              {this.state.shopitem.amount}
            </div>
          </div>

          <button
            className="add-to-cart"
            disabled={
              !(
                this.state.preferences &&
                Object.keys(this.state.preferences).length ===
                  this.state.headers.length
              )
            }
            data-testid="add-to-cart"
            onClick={() => {
              this.handleAddToCart();
              handleCartOpen();
              handleCountChange();
            }}
          >
            Add to cart
          </button>

          <div
            className="shop-item-description"
            data-testid="product-description"
          >
            {this.removeHTMLTags(this.state.shopitem.description)}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetailsPage;
