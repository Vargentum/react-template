'use strict';

import React from 'react';
import SearchBarComponent from 'components/SearchBarComponent';
import ProductTableComponent from 'components/ProductTableComponent';

require('styles//FilterableProductTable.styl');


class FilterableProductTableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inStockOnly: false,
      filterText: ''
    }

    this.filterProducts = (evt) => {
      this.setState({
        filterText: evt.currentTarget.value
      });    
    }

    this.toggleStockVisibity = () => {
      this.setState({
        inStockOnly: !this.state.inStockOnly
      });
    }    
  }



  render() {

    const products = [
      {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
      {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
      {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
      {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
      {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
      {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
    ]

    return (
      <div className="filterableproducttable-component">
        <SearchBarComponent
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleSearch={this.filterProducts}
          handleCheck={this.toggleStockVisibity}/>

        <ProductTableComponent
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={products}/>
      </div>
    );
  }
}

FilterableProductTableComponent.displayName = 'FilterableProductTableComponent';

FilterableProductTableComponent.propTypes = {
  data: React.PropTypes.array
};
FilterableProductTableComponent.defaultProps = {
  data: []
};

export default FilterableProductTableComponent;
