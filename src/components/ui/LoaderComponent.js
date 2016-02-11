'use strict';

import React from 'react';

require('styles/ui/Loader.styl');

class LoaderComponent extends React.Component {
  render() {
    return (
      <div className="ui-loader">
        {_.times(5, (n) => {
          return <div key={n} className="ui-loader__dot" />
        })}
      </div>
    );
  }
}

LoaderComponent.displayName = 'UiLoaderComponent';

// Uncomment properties you need
// LoaderComponent.propTypes = {};
// LoaderComponent.defaultProps = {};

export default LoaderComponent;
