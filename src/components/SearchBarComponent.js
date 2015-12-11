'use strict';

import React from 'react';

require('styles//SearchBar.styl');

class SearchBarComponent extends React.Component {

  render() {
    return (
      <div className="searchbar-component">
        <input type="search"
               value={this.props.filterText}
               onChange={this.props.handleSearch}/>

        <input type="checkbox"
               onChange={this.props.handleCheckbox}
               checked={this.props.inStockOnly} />
      </div>
    );
  }
}

SearchBarComponent.displayName = 'SearchBarComponent';

// Uncomment properties you need
// SearchBarComponent.propTypes = {};
// SearchBarComponent.defaultProps = {};

export default SearchBarComponent;
