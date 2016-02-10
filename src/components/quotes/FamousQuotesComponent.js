'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'
import Q from 'q'

import FilterableTable from 'components/ui/FilterableTableComponent'
import Creator from 'components/quotes/CreatorComponent'

require('styles/quotes/FamousQuotes.styl');

const CONFIG = {
  url: "https://andruxnet-random-famous-quotes.p.mashape.com",
  headers: {
    "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  },
  categories: {
    famous: {checked: true},
    movies: {checked: true}
  },
  quantities: {
    10: {checked: true},
    15: {checked: false},
    25: {checked: false}
  }
}


const urlDispatcher = function(params) {
  let dispatch = (acc, param, name) => {
      _.forIn(param, (v, k) => {
        if (!v.checked) return
        acc += `/?${name}=${k}`
      })
      return acc
    }
  return _.reduce(params, dispatch, CONFIG.url)
}




class FamousQuotesComponent extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'FamousQuotesComponent';

      this.state = {
        quotes: [],
        categories: CONFIG.categories,
        quantities: CONFIG.quantities,
      }

      let getQuote = (url, resolve, reject) => {
        qwest.get(url, null, {
          headers: CONFIG.headers
        })
        .then((xhr, response) => {
          resolve(JSON.parse(response))
        }).then((xhr, error) => {
          reject(error)
        })
      }


      this.getQuotes = (n) => {
        let url = urlDispatcher({
          cat: this.state.categories
        })

        let quotes = _.times(n, () => {
          return Q.promise((resolve, reject) => {
            getQuote(
              url,
              (response) => {
                resolve(response)
              },
              (error) => {
                reject(error)
              }
            )
          })
        })

        Q.all(quotes).then(
          (quotes) => {
            this.setState({quotes});
          },
          (error) => {
            console.log("No quotes!!!!")
          }
        )
      }


      this.handleSort = (type) => {
        let order = this.state.order === 'asc' ? 'desc' : 'asc'

        this.setState({
          quotes: _.sortByOrder(this.state.quotes, type ,order),
          order: order,
          orderBy: type
        });
      }


      this.handleRadioSelection = (col, entry) => {
        this.setState({
          [col]: update(this.state[col], {$apply: (col) => {
            return _.mapValues(col, ({checked}, k) => {
              return {checked: k === entry}
            })
          }}) 
        });
      }


      this.handleCheckboxSelection = (col, entry) => {
        let clone = _.clone(this.state[col])
           ,checkedQ = _.reduce(clone, (acc, {checked}) => checked ? ++acc : acc, 0)
           ,checkedS = clone[entry].checked

        // prevent disabling last checkbox
        if (checkedQ <= 1 && checkedS) return
        
        this.setState({
          [col]: update(this.state[col], {[entry]: {checked: {$set: !checkedS}}})
        });
      }
    }


    componentDidMount() {
      this.getQuotes(10)
    }


    render() {
      let quantity = _.findKey(this.state.quantities, ({checked}) => checked)

      return <div className="famousquotes-component">
               <Creator onQuantityUpdate={_.partial(this.handleRadioSelection, "quantities")}
                        onCategoryUpdate={_.partial(this.handleCheckboxSelection, "categories")}
                        action={_.partial(this.getQuotes, quantity)}
                        {...this.state}/>
               <FilterableTable mod="quotes"                        
                           data={this.state.quotes}
                           handleSort={this.handleSort}
                           {...this.state} />
             </div>
    }
}

export default FamousQuotesComponent;
