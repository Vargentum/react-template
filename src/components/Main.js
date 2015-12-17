require('normalize.css');
require('styles/App.css');
import FilterableProductTableComponent from 'components/filterable-table/FilterableProductTableComponent.js';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Famous quotes</h1>
        {/*<FilterableProductTableComponent/>*/}

        
      </div>
    );
  }
}

// AppComponent.defaultProps = {};

export default AppComponent;
