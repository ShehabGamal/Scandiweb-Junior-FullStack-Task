import React, { Component } from "react";
import "../sub-components/CartColorAttribute.css";

class ColorAttribute extends Component {
  renderColorAttribute = () => {
    const { item, header } = this.props;
    const display = item.attributes
      ? item.attributes
          .filter((attribute) => attribute.name === header)
          .map((attribute) => (
            <div
              key={attribute.value}
              className={`color-attribute${
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
              style={{ background: attribute.value }}
            ></div>
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
          className="color-attribute-cover"
          key={headerIndex}
        >
          <div className="color-attribute-header">{header}</div>

          <div className="color-attribute-variations">
            {this.renderColorAttribute()}
          </div>
        </div>
      </>
    );
  }
}
export default ColorAttribute;
