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
    famous: {checked: true, disabled: false},
    movies: {checked: true, disabled: false}
  },
  quantities: {
    10: {checked: true},
    15: {checked: false},
    25: {checked: false}
  }
}


const categoryRequestDispatcher = function(params) {
  let {url, headers} = CONFIG
  let dispatch = (prev, next, name) => {
    _(next)
      .filter(({checked}) => checked)
      .forEach((i, val) => {
        prev+= `/?${name}=${val}`
      })
    return prev
  }
  return {
    url: _.reduce(params, dispatch, url),
    headers: headers
  }
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

      let dispatcher = categoryRequestDispatcher({
        cat: this.state.categories,
        foo: [1,2,3],
        bar: [1,2,3]
      })


      let getQuote = (resolve, reject) => {
        console.log(dispatcher.url)
        qwest.get(dispatcher.url, null, {
          headers: dispatcher.headers
        })
        .then((xhr, response) => {
          resolve(JSON.parse(response))
        }).then((xhr, error) => {
          reject(error)
        })
      }


      this.getQuotes = (n) => {
        let quotes = _.times(n, () => {
          return Q.promise((resolve, reject) => {
            getQuote(
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

      this.handleRadioSelection = (col, title) => {
        this.setState({
          [col]: update(this.state[col], {$apply: (col) => {
            return _.mapValues(col, ({checked}, k) => {
              return {checked: k === title}
            })
          }}) 
        });
      }


      this.handleCheckboxSelection = (col, title) => {
        let checked = this.state[col][title].checked
        this.setState({
          [col]: update(this.state[col], {$apply: (col) => {
            return _(col)
              .mapValues((entry, k) => {
                entry
              })
              .mapValues
          }}) 
        });


      }
    }


    componentDidMount() {
      this.getQuotes(10)
    }


    render() {
      let quantity = _.findKey(this.state.quantities, ({checked}) => checked)

      return <div className="famousquotes-component">
               <FilterableTable mod="quotes"                        
                           data={this.state.quotes}
                           handleSort={this.handleSort}
                           {...this.props} />
               <Creator onQuantityUpdate={_.partial(this.handleRadioSelection, "quantities")}
                        onCategoryUpdate={_.partial(this.handleCheckboxSelection, "categories")}
                        action={_.partial(this.getQuotes, quantity)}
                        {...this.state}/>
             </div>
    }
}

export default FamousQuotesComponent;
