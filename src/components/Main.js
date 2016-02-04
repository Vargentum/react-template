require('normalize.css');
require('styles/App.css');

import React from 'react';
// import FilterableProductTableComponent from 'components/filterable-table/FilterableProductTableComponent.js';
import Quotes from 'components/quotes/FamousQuotesComponent'

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Famous quotes</h1>
        {/*<FilterableProductTableComponent/>*/}
        <Quotes  />

      </div>
    );
  }
}

// AppComponent.defaultProps = {};

export default AppComponent;
