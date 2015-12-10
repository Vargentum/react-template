'use strict';

import React from 'react';

require('styles//FilterableProductTable.styl');
const SearchBarComponent = require('components/SearchBarComponent')
const ProductTableComponent = require('components/ProductTableComponent')


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
