import React, { Component } from "react";
import "../sub-components/CartRegularAttribute.css";

class RegularAttribute extends Component {
  renderRegularAttribute = () => {
    const { item, header } = this.props;
    const display = item.attributes
      ? item.attributes
          .filter((attribute) => attribute.name === header)
          .map((attribute) => (
            <div
              key={attribute.value}
              className={`regular-attribute${
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
          className="regular-attribute-cover"
          key={headerIndex}
        >
          <div className="regular-attribute-header">{header}</div>

          <div className="regular-attribute-variations">
            {this.renderRegularAttribute()}
          </div>
        </div>
      </>
    );
  }
}
export default RegularAttribute;
