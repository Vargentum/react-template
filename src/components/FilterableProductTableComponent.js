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
  }

  filterProducts(evt) {
    this.setState({
      filterText: evt.currentTarget.value
    });    
  }

  toggleStockVisibity() {
    this.setState({
      inStockOnly: !this.state.inStockOnly
    });
  }


  render() {
    return (
      <div className="filterableproducttable-component">
        <SearchBarComponent
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          handleSearch={this.filterProducts.bind(this)}
          handleCheck={this.toggleStockVisibity.bind(this)}/>

        <ProductTableComponent
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          data={this.props.data}/>
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
