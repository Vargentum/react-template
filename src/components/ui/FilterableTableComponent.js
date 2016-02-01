'use strict';

import React from 'react';
import classnames from 'classnames'

require('styles/ui/FilterableTable.styl');

class FilterableTableComponent extends React.Component {

  r_head() {
    let tpl = _.first(this.props.data)
    let cells = _.map(tpl, (val, key) => <th key={key}>{key}</th>)
    return (
      <thead>
        <tr>
          {cells}
        </tr>
      </thead>
    )
  }


  r_body() {
    let rows = _.map(this.props.data, (row, i) => {
      let cells = _.map(row, (cell, i) => <td key={i}>{cell}</td>)
      return (<tr key={i}>{cells}</tr>)
    })

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }


  render() {

    let cls = this.props.mod.split(',').reduce((prev, next) => {
      prev[`ui-filterable-table--${next.trim()}`] = true
      return prev
    }, {'ui-filterable-table': true})

    return (
      <table className={classnames(cls)}>
        {this.r_head()}
        {this.r_body()}
      </table>
    );
  }
}

FilterableTableComponent.displayName = 'UiFilterableTableComponent';

// Uncomment properties you need
// FilterableTableComponent.propTypes = {};
FilterableTableComponent.defaultProps = {
  data: [],
  mod: ''
};

export default FilterableTableComponent;
