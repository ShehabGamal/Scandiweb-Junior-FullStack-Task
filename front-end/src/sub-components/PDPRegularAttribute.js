import React, { Component } from "react";
import "../sub-components/PDPAttributesStyle.css";

class PDPRegularAttribute extends Component {
    renderColorAttribute = () => {
        const { header, headerIndex, attributes, preferences ,handleSelection} = this.props;
       
        return (
          <>
            <div key={headerIndex} className="attribute-header">
              {header}
            </div>
      
            <div className="attributes-list">
              {attributes
                .filter((attribute) => attribute.name === header)
                .map((attribute) => (
                  <div
                    key={attribute.value}
                    className={`preference ${
                      preferences[header] === attribute.value
                        ?  "current"
                        : ""
                    }`}
                    onClick={() => handleSelection(header, attribute.value)}
                    data-testid={`product-attribute-${header
                      .toLowerCase()
                      .replaceAll(" ", "-")}-${attribute.value}`}
                  >
                  {attribute.value}
                  </div>
                ))}
            </div>
          </>
        );
      };
  render() {
   

    return (
      <>
        
            {this.renderColorAttribute()}
          
      </>
    );
  }
}
export default PDPRegularAttribute;
