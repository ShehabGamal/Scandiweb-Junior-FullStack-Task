import React, { Component } from "react";
import CartRegularAttribute from "./CartRegularAttribute";
import CartSizeAttribute from "./CartSizeAttribute";
import CartColorAttribute from "./CartColorAttribute";

class AttributesSection extends Component {
  renderCartOverlay = () => {
    const { item } = this.props;

    if (item.headers && item.headers.length > 0) {
      return item.headers.map((header, headerIndex) => {
        switch (header) {
          case "Color":
            return (
              <CartColorAttribute key={headerIndex} header={header} item={item} />
            );
          case "Size":
            return (
              <CartSizeAttribute key={headerIndex} header={header} item={item} />
            );
          default:
            return (
              <CartRegularAttribute key={headerIndex} header={header} item={item} />
            );
        }
      });
    }
    return null;
  };
  render() {
    return <>{this.renderCartOverlay()}</>;
  }
}
export default AttributesSection;
