'use strict';

import React from 'react';

require('styles/quotes/Creator.styl');

class CreatorComponent extends React.Component {


  r_field (title, {checked, disabled}, {handler, type, name}) {
    debugger
    return (
      <label className="creator-component__field" key={title}>
        <input type={type}
               onChange={_.partial(handler, title)} 
               checked={checked} 
               disabled={disabled || false}/>
        <span>{title}</span>
      </label>
      )
  }

  r_fieldSet (title, fields) {
    return (
      <fieldset key={title} className="creator-component__fset">
        <h3 className="creator-component__fset_title">{title}</h3>
        {fields}
      </fieldset>
    )
  }

  render() {
    let inputsTpl = {
      quantities: {
        handler: this.props.onQuantityUpdate,
        type: 'radio',
        items: this.props.quantities,
      },
      categories: {
        handler: this.props.onCategoryUpdate,
        type: 'checkbox',
        items: this.props.categories
      }
    }

    let form = _(inputsTpl)
                .mapValues(tpl => {
                  return _.map(
                    tpl.items, 
                    (entry, title) => this.r_field(title, entry, tpl)
                  )
                })
                .map((v, k) => this.r_fieldSet(k, v))
                .value()

    return (
      <div className="creator-component">
        {form}
        <button onClick={this.props.action}>Reload Quotes</button>
      </div>
    );
  }
}

CreatorComponent.displayName = 'QuotesCreatorComponent';

// Uncomment properties you need
// CreatorComponent.propTypes = {};
// CreatorComponent.defaultProps = {};

export default CreatorComponent;
