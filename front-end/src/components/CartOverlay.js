import React, { Component } from "react";
import "./CartOverlay.css";
import AttributesSection from "../sub-components/AttributesSection.js";
class CartOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cart-items")) || [],
    };
  }
  handlePlaceOrder = () => {
    const { handleCartOpen, handleCountChange } = this.props;
    const { cartItems } = this.state;

    let products = [];
    let total = 0;

    cartItems.forEach((item) => {
      total += item.quantity * item.amount;

      const itemDescription = [
        `product: ${item.name}`,
        `price: ${item.amount}`,
        `quantity: ${item.quantity}`,
        ...item.headers.map(
          (header) => `${header}: ${item.preferences[header]}`
        ),
      ].join(", ");

      products.push(itemDescription);
    });
    if (products.length > 0) {
      fetch("http://shehab-gamal334.serv00.net:38837/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation {
          createOrder(items: "${products.join("; ")}", total_price: ${total}) {
            items
            total_price
          }
        }`,
        }),
      })
        .then(() => {
          localStorage.setItem("cart-items", JSON.stringify([]));
          localStorage.setItem("cart-count", 0);
          handleCountChange();
          handleCartOpen();
          this.setState({ cartItems: [] });
        })
        .catch((error) => console.error("Error placing order:", error));
    }
  };
  handelIncrement = (name, selected) => {
    const { handleCountChange } = this.props;
    const { cartItems } = this.state;
    const increment = cartItems
      ? cartItems.map((item) => {
          const isMatchingItem =
            JSON.stringify(Object.values(selected)) ===
              JSON.stringify(Object.values(item.preferences)) &&
            item.name === name;
          if (isMatchingItem) {
            item.quantity++;
          }

          return item;
        })
      : "";

    localStorage.setItem("cart-items", JSON.stringify(increment));

    this.setState({
      cartItems: increment,
    });
    handleCountChange();
  };

  handelDecrement = (name, selected) => {
    const { cartItems } = this.state;
    const { handleCountChange } = this.props;
    const decrement = cartItems
      ? cartItems.map((item) => {
          const isMatchingItem =
            JSON.stringify(Object.values(selected)) ===
              JSON.stringify(Object.values(item.preferences)) &&
            item.name === name;
          if (isMatchingItem && item.quantity > 1) {
            item.quantity--;
          }

          return item;
        })
      : "";

    localStorage.setItem("cart-items", JSON.stringify(decrement));

    this.setState({
      cartItems: decrement,
    });
    handleCountChange();
  };

  render() {
    const { cartItems } = this.state;
    return (
      <div className="cart-container" data-testid="cart-overlay">
        <div className="cart-items">
          <div className="cart-count">
            <b>My Bag</b>:{" "}
            {`${(() => {
              const cartCount =
                JSON.parse(localStorage.getItem("cart-count")) || 0;
              return cartCount ? cartCount : 0;
            })()} ${(() => {
              const cartCount =
                JSON.parse(localStorage.getItem("cart-count")) || 0;
              return cartCount === 1 ? "Item" : "items";
            })()}`}
          </div>

          {cartItems && cartItems.length > 0
            ? cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="cart-item-cover">
                    <div className="cart-item-name">{item.name}</div>

                    <div
                      className="cart-item-amount"
                      data-testid="cart-item-amount"
                    >
                      {item.symbol}
                      {item.amount}
                    </div>

                    <AttributesSection item={item} />
                  </div>
                  <div className="change-quantity">
                    <button
                      className="change-quantity-button"
                      id={item.name}
                      onClick={(e) => {
                        this.handelIncrement(e.target.id, item.preferences);
                      }}
                      data-testid="cart-item-amount-increase"
                    >
                      +
                    </button>
                    <h3 data-testid="cart-item-amount">{item.quantity}</h3>
                    <button
                      className="change-quantity-button"
                      id={item.name}
                      onClick={(e) => {
                        this.handelDecrement(e.target.id, item.preferences);
                      }}
                      data-testid="cart-item-amount-decrease"
                    >
                      -
                    </button>
                  </div>
                  <img
                    className="cart-item-image"
                    alt="cart-image"
                    src={item.gallery
                      .split(" ")
                      .map((url) => url.trim())[0]
                      .replace(/[[\]"]/g, "")
                      .slice(0, -1)}
                  />
                </div>
              ))
            : ""}
          <div className="total-amount-section" data-testid="cart-total">
            <div className="total-header" data-testid="cart-total">
              Total
            </div>
            <div className="total-charge" data-testid="cart-total">
              
              {cartItems.length > 0 && cartItems
                ? `$${cartItems
                    .reduce((total, item) => {
                      return item.quantity * item.amount + total;
                    }, 0)
                    .toFixed(2)}`
                : ""}
            </div>
          </div>
          <button className="place-order" onClick={this.handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default CartOverlay;
