'use strict';

import React from 'react';
import _ from 'lodash'
// import cls from "classnames";

require('styles//ProductTable.styl');



class ProductTableComponent extends React.Component {

  r_categoryItems(items) {
    return _.map(items, i => {
      let mod  = i.stocked ? 'is-stocked' : '';
      let shouldExpensiveHide = this.props.inStockOnly && !i.stocked
      return (
        shouldExpensiveHide ? null
          :
          <tr className={mod} key={_.uniqueId(`${i.name}_`)}>
            <td>{i.name}</td>
            <td>{i.price}</td>
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
    return (
      <table className="producttable-component">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {_.chain(this.props.products)
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
