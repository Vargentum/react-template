'use strict';

import React from 'react';
import names from 'classnames';
import Loader from 'components/ui/LoaderComponent'

require('styles/ui/Area.styl');

class AreaComponent extends React.Component {

  render() {
    let {type, title, children} = this.props

    let cls = {
        "area-component": true,
        [`area-component--type-${type}`]: !!type
      }

    return (
      <div className={names(cls)}>
        {type === "loading" ?
          <Loader />
          :
          <div className="area-component__icon" />
        }
        <h2 className="area-component__title">{title}</h2>
        {children}
      </div>
    );
  }
}

AreaComponent.displayName = 'UiAreaComponent';

// Uncomment properties you need
// AreaComponent.propTypes = {};
// AreaComponent.defaultProps = {};

export default AreaComponent;
