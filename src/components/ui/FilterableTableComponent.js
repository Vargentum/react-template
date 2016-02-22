'use strict';

import React from 'react';
import classnames from 'classnames'
import _ from 'lodash'

require('styles/ui/FilterableTable.styl');


class FilterableTableComponent extends React.Component {

  constructor(props) {
    super(props)

    this.r_head = () => {
      let {data, order, orderBy} = this.props.data
      let isOrderEqual = (type, key) => order === type && orderBy === key
      let tpl = _.first(data)
      let cells = _.map(tpl, (val, key) => {
        let cls = {
          'is-asc': isOrderEqual('asc', key),
          'is-desc': isOrderEqual('desc', key),
          'is-clickable': !!this.props.onThClick
        }

        return (
          <th key={key}
              className={classnames(cls)}
              onClick={_.partial(this.props.onThClick, key)}>{key}</th>
        )
      })
      return (
        <thead>
          <tr>
            {cells}
          </tr>
        </thead>
      )
    }


    this.r_body = () => {
      let {data} = this.props.data
      let rows = _.map(data, (row, i) => {
        let cells = _.map(row, (cell, i) => <td key={i}>{cell}</td>)
        return (<tr key={i}
                    onClick={_.partial(this.props.onTrClick, i)}>{cells}</tr>)
      })

      return (
        <tbody>
          {rows}
        </tbody>
      )
    }

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


FilterableTableComponent.defaultProps = {
  data: [],
  mod: ''
};

export default FilterableTableComponent;
