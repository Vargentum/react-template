'use strict';

import React from 'react';
import _ from 'lodash'
// import cls from "classnames";

require('styles//ProductTable.styl');



class ProductTableComponent extends React.Component {

  constructor(props) {
    super(props)
  }

  r_categoryItems(items) {
    return _.map(items, i => {
      let mod  = i.stocked ? 'is-stocked' : '';
      let shouldExpensiveHide = this.props.inStockOnly && !i.stocked
      return (
        shouldExpensiveHide ? null
          :
          <tr className={mod} key={_.uniqueId(`${i.name}_`)}>
            <td>{i.name}</td>
            <td>{`$${i.price}`}</td>
          </tr>
      )
    })
  }

  r_categoryName(name) {
    return (
      <tr key={name}>
        <td className="category" colSpan="2">{name}</td>
      </tr>
    )
  }

  render() {
    const products = this.props.products

    let addArrowTo = (t) => {
      if (t !== products.orderBy) return ''
      return `is-${products.orderType}`
    }

    return (
      <table className="producttable-component">
        <thead>
          <tr>
            {['name', 'price'].map((name) => {
              return (
                <th 
                  className={addArrowTo(name)}
                  onClick={_.partial(this.props.handleSort, name)}>
                    {_.capitalize(name)}
                </th>  
              )
            })}
          </tr>
        </thead>
        <tbody>
          {_.chain(products.items)
              .filter(item => new RegExp(this.props.filterText, 'i').test(item.name))
              .groupBy(item => item.category)
              .map((items, name) => {
                return (
                  [
                    this.r_categoryName(name),
                    this.r_categoryItems(items)
                  ]
                )
              })
              .value()
          }
        </tbody>
      </table>
    );
  }
}

ProductTableComponent.displayName = 'ProductTableComponent';

// Uncomment properties you need
// ProductTableComponent.propTypes = {};
// ProductTableComponent.defaultProps = {};

export default ProductTableComponent;
