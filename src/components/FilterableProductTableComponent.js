'use strict';

import React from 'react';
import SearchBarComponent from "components/SearchBarComponent";
import ProductTableComponent from "components/ProductTableComponent";

require('styles//FilterableProductTable.styl');


class FilterableProductTableComponent extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      inStockOnly: true,
      filterText: 'foot'
    }
  }


  render() {
    return (
      <div className="filterableproducttable-component">
        <SearchBarComponent 
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />
        
        <ProductTableComponent
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          data={this.props.data}/>
      </div>
    );
  }
}

FilterableProductTableComponent.displayName = 'FilterableProductTableComponent';

// Uncomment properties you need
// FilterableProductTableComponent.propTypes = {};
// FilterableProductTableComponent.defaultProps = {};

export default FilterableProductTableComponent;
