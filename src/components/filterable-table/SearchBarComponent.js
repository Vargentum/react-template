'use strict';

import React from 'react';

require('styles//SearchBar.styl');

class SearchBarComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="searchbar-component">
        <input type="search"
               value={this.props.filterText}
               onChange={this.props.handleSearch}/>
        <label>
          <input type="checkbox"
                 onChange={this.props.handleCheck}
                 checked={this.props.inStockOnly} />
          <span>Stock items only</span>
        </label>
      </div>
    );
  }
}

SearchBarComponent.displayName = 'SearchBarComponent';

SearchBarComponent.propTypes = {
  filterText: React.PropTypes.string,
  inStockOnly: React.PropTypes.bool,
  handleSearch: React.PropTypes.func,
  handleCheck: React.PropTypes.func
};
SearchBarComponent.defaultProps = {
  filterText: '',
  inStockOnly: false,
};

export default SearchBarComponent;
