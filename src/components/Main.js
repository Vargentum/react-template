require('normalize.css');
require('styles/App.css');
import FilterableProductTableComponent from "components/FilterableProductTableComponent.js";
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello Table</h1>
        <FilterableProductTableComponent data={this.props.productTableData} />
      </div>
    );
  }
}

AppComponent.defaultProps = {
  productTableData: [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ]
};

export default AppComponent;
