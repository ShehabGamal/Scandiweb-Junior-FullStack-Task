import React, { Component } from "react";
import "./Header.css";
import Logo from "../Assets/logo.svg";
import EmptyCart from "../Assets/emptycart.svg";
import CartOverlay from "./CartOverlay";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const {
      categories,
      activeCategory,
      handleCategorySelect,
      handleCartOpen,
      cartState,
      handleCountChange,
    } = this.props;

    return (
      <header>
        <nav>
          {categories.map((category, index) => (
            <Link
              key={index}
              data-testid={
                category.name === activeCategory
                  ? "active-category-link"
                  : "category-link"
              }
              onClick={() => {
                handleCategorySelect(category.name);
              }}
              to={`/${category.name}`}
            >
              {category.name.toUpperCase()}
            </Link>
          ))}
        </nav>

        <img src={Logo} alt="logo" />

        <div className="cart">
          <button data-testid="cart-btn" onClick={handleCartOpen}>
            <img src={EmptyCart} alt="empty-cart" />
            {JSON.parse(localStorage.getItem("cart-count")) > 0 ? (
              <span>{JSON.parse(localStorage.getItem("cart-count"))}</span>
            ) : (
              ""
            )}
          </button>
        </div>

        {cartState && (
          <CartOverlay
            handleCountChange={handleCountChange}
            handleCartOpen={handleCartOpen}
          />
        )}
      </header>
    );
  }
}

export default Header;
