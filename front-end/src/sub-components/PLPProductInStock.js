import { Component } from "react";
import "./PLPProductInStock.css";
import { Link } from "react-router-dom";
import EmptyCart from "../Assets/emptycart.svg";

class ProductInStock extends Component {
  render() {
    const { handleQuickShop, toggleProduct, shopitem, index } = this.props;
    return (
      <div className="product-holder">
        <Link
          key={index}
          to={`product/${shopitem.id}`}
          onClick={() => {
            toggleProduct(shopitem.id);
          }}
          className="PDPLink"
          data-testid={`product-${shopitem.name
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          <div id={shopitem.id} className="inStockItemCover">
            <img
              src={shopitem.gallery
                .split(" ")
                .map((url) => url.trim())[0]
                .replace(/[[\]"]/g, "")
                .slice(0, -1)}
              alt={shopitem.id}
              className="product-thumbnail"
            />

            <p className="product-badge">
              {" "}
              {shopitem.name}
              <br />
              <b>
                {shopitem.currency_symbol}
                {shopitem.amount}
              </b>
            </p>
          </div>
        </Link>
        <button
          className="quickshopBtn"
          onClick={() => {
            handleQuickShop(shopitem.id);
          }}
        >
          <img src={EmptyCart} alt="quick-shop" />
        </button>
      </div>
    );
  }
}
export default ProductInStock;
