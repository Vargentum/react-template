'use strict';

import React from 'react';
import SearchBarComponent from "components/SearchBarComponent";
import ProductTableComponent from "components/ProductTableComponent";

require('styles//FilterableProductTable.styl');


class FilterableProductTableComponent extends React.Component {
  render() {
    return (
      <div className="filterableproducttable-component">
        <SearchBarComponent {...this.props} />
        <ProductTableComponent {...this.props} />
      </div>
    );
  }
}

FilterableProductTableComponent.displayName = 'FilterableProductTableComponent';

// Uncomment properties you need
// FilterableProductTableComponent.propTypes = {};
// FilterableProductTableComponent.defaultProps = {};

export default FilterableProductTableComponent;
