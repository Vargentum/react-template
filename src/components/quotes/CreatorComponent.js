'use strict';

import React from 'react';

require('styles/quotes/Creator.styl');

class CreatorComponent extends React.Component {

  r_field (title, handleChange, type, name) {
    return (
      <label>
        <span>{title}</span>
        <input type={type} name={name} onChange={handleChange} />
      </label>
      )
  }

  render() {
    let inputsTpl = {
      quantity: {
        handleChange: () => {},
        name: 'quantity',
        type: 'radio',
        titles: ['10', '20', '40']
      },
      category: {
        handleChange: () => {},
        name: 'category',
        type: 'checkbox',
        titles: this.props.categories
      }
    }


    return (
      <div className="creator-component">

        {_.mapValues(inputsTpl, tpl => {
          return tpl.titles.map(title => {
            this.r_field(title, {tpl})
          })
        })}

      </div>
    );
  }
}

CreatorComponent.displayName = 'QuotesCreatorComponent';

// Uncomment properties you need
// CreatorComponent.propTypes = {};
// CreatorComponent.defaultProps = {};

export default CreatorComponent;
