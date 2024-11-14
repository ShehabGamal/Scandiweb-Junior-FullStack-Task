import React, { Component } from "react";
import "../sub-components/CartSizeAttribute.css";

class SizeAttribute extends Component {
  renderSizeAttribute = () => {
    const { item, header } = this.props;
    const display = item.attributes
      ? item.attributes
          .filter((attribute) => attribute.name === header)
          .map((attribute) => (
            <div
              key={attribute.value}
              className={`size-attribute${
                item.preferences && item.preferences[header] === attribute.value
                  ? "-current"
                  : ""
              }-selection`}
              data-test-id={`cart-item-attribute-${header.toLowerCase()}-${
                attribute.value
              }${
                item.preferences && item.preferences[header] === attribute.value
                  ? "-selected"
                  : ""
              }`}
            >
              {attribute.value}
            </div>
          ))
      : "";
    return display;
  };
  render() {
    const { header, headerIndex } = this.props;

    return (
      <>
        <div
          data-testid={`cart-item-attribute-${header.toLowerCase()}`}
          className="size-attribute-cover"
          key={headerIndex}
        >
          <div className="size-attribute-header">{header}</div>

          <div className="size-attribute-variations">
            {this.renderSizeAttribute()}
          </div>
        </div>
      </>
    );
  }
}
export default SizeAttribute;
