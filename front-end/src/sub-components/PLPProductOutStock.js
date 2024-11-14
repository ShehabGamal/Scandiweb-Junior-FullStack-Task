import { Component } from "react";
import "./PLPProductOutStock.css";

class ProductOutStock extends Component {
  render() {
    const { shopitem, index } = this.props;
    return (
      <div className="product-holder">
        <div
          id={shopitem.id}
          key={index}
          data-testid={`product-${shopitem.id}`}
          className="outStockItemCover"
        >
          <div className="outStockTag">
            <h2>Out Of Stock</h2>
          </div>

          <img
            src={shopitem.gallery
              .split(" ")
              .map((url) => url.trim())[0]
              .replace(/[[\]"]/g, "")
              .slice(0, -1)}
            alt={shopitem.id}
            className="outStockThumbnail"
          />

          <p className="outStockBadge">
            {" "}
            {shopitem.name}
            <br />
            <b>
              {shopitem.currency_symbol}
              {shopitem.amount}
            </b>
          </p>
        </div>
      </div>
    );
  }
}
export default ProductOutStock;
