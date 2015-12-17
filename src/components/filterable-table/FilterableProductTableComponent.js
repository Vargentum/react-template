'use strict';

import React from 'react';
import update from 'react-addons-update';

import SearchBar from 'components/filterable-table/SearchBarComponent';
import ProductTable from 'components/filterable-table/ProductTableComponent';
import CreateForm from 'components/filterable-table/CreateProductFormComponent';

require('styles//FilterableProductTable.styl');


class FilterableProductTableComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inStockOnly: false,
      filterText: '',
      products: {
        items: [
          {category: 'Sporting Goods', price: 49.99, stocked: true, name: 'Football'},
          {category: 'Sporting Goods', price: 9.99, stocked: true, name: 'Baseball'},
          {category: 'Sporting Goods', price: 29.99, stocked: false, name: 'Basketball'},
          {category: 'Electronics', price: 99.99, stocked: true, name: 'iPod Touch'},
          {category: 'Electronics', price: 399.99, stocked: false, name: 'iPhone 5'},
          {category: 'Electronics', price: 199.99, stocked: true, name: 'Nexus 7'}
        ],
        orderType: '',
        orderBy: ''
      }
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
      this.setState({
        products: update(this.state.products, {items: {$push: [p]}})
      });
    }

    let sortProductsDecorator = () => {
      let order = 'asc';
      return (type) => {
        order === 'asc' ? order = 'desc' : order = 'asc';
        this.setState({
          products: {
            items: _.sortByOrder(this.state.products.items, type, order),
            orderType: order,
            orderBy: type
          }
        });
      }
    }

    this.sortProducts = sortProductsDecorator();
  }




  render() {

    return (
      <div className="filterableproducttable-component">
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleSearch={this.filterProducts}
          handleCheck={this.toggleStockVisibity} />

        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.state.products}
          handleSort={this.sortProducts} />

        <CreateForm handleSave={this.addProduct} />
      </div>
    );
  }
}

FilterableProductTableComponent.displayName = 'FilterableProductTableComponent';

// FilterableProductTableComponent.propTypes = {};
// FilterableProductTableComponent.defaultProps = {};

export default FilterableProductTableComponent;
