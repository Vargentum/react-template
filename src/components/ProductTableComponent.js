'use strict';

import React from 'react';

require('styles//ProductTable.styl');

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <th>Test</th>
      </tr>
    );
  }
}


class ProductTableComponent extends React.Component {
  render() {
    return (
      <table className="producttable-component">
        <ProductCategoryRow />
      </table>
    );
  }
}

ProductTableComponent.displayName = 'ProductTableComponent';

// Uncomment properties you need
// ProductTableComponent.propTypes = {};
// ProductTableComponent.defaultProps = {};

export default ProductTableComponent;
