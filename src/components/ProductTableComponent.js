'use strict';

import React from 'react';
import _ from 'lodash'
import cls from "classnames";

require('styles//ProductTable.styl');



class ProductTableComponent extends React.Component {

  r_categoryItems(items) {
    return _.map(items, i => {
      let mod  = i.stocked ? "is-stocked" : "";
      return (
        <tr className={mod} key={i.name}>
          <td>{i.name}</td>
          <td>{i.price}</td>
        </tr>
      )
    })
  }

  r_categoryName(name) {
    return (
      <tr key={name}>
        <td className="category"
            colSpan="2">{name}</td>
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
          {_.chain(this.props.data)
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
