'use strict';

import React from 'react';
import SearchBar from 'components/SearchBarComponent';
import ProductTable from 'components/ProductTableComponent';
import CreateForm from 'components/CreateProductFormComponent';

require('styles//FilterableProductTable.styl');


class FilterableProductTableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inStockOnly: false,
      filterText: '',
      products: [
        {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
        {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
        {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
        {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
        {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
        {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
      ]
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

    this.addProduct = (p) => {
      let products = Array.prototype.slice.apply(this.state.products)
      products.push(p)

      this.setState({
        products: products
      });
    }
  }
  

  render() {

    return (
      <div className="filterableproducttable-component">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleSearch={this.filterProducts}
          handleCheck={this.toggleStockVisibity}/>

        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.state.products}/>

        <CreateForm onCreate={this.addProduct} />
      </div>
    );
  }
}

FilterableProductTableComponent.displayName = 'FilterableProductTableComponent';

// FilterableProductTableComponent.propTypes = {};
// FilterableProductTableComponent.defaultProps = {};

export default FilterableProductTableComponent;
