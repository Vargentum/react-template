'use strict';

import React from 'react';

require('styles/quotes/Creator.styl');

class CreatorComponent extends React.Component {
  render() {
    return (
      <div className="creator-component">
        Please edit src/components/quotes//CreatorComponent.js to update this component!
      </div>
    );
  }
}

CreatorComponent.displayName = 'QuotesCreatorComponent';

// Uncomment properties you need
// CreatorComponent.propTypes = {};
// CreatorComponent.defaultProps = {};

export default CreatorComponent;
