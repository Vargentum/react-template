require('normalize.css');
require('styles/App.css');
import FilterableProductTableComponent from 'components/FilterableProductTableComponent.js';
import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>Simple Table</h1>
        <FilterableProductTableComponent/>
      </div>
    );
  }
}

// AppComponent.defaultProps = {};

export default AppComponent;
