'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'
import Q from 'q'

import FilterableTable from 'components/ui/FilterableTableComponent'

require('styles/quotes/FamousQuotes.styl');

const CONFIG = {
  url: "https://andruxnet-random-famous-quotes.p.mashape.com",
  headers: {
    "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
  }
}

const categoryRequestDispatcher = function(params) {
  let {url, headers} = CONFIG
  let doUrl = ({k, v}) => {
    if (_.isEmpty(v)) return url;
    return v.forEach(ct => url += `/?${k}=${v}`)
  }
  return {
    url: doUrl(_.isObject(params)),
    headers: headers
  }
}


class FamousQuotesComponent extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'FamousQuotesComponent';

      this.state = {
        quotes: [],
        cat: ['famous', 'movies']
      }

      let dispatcher = categoryRequestDispatcher({
        cat: ['famous', 'movies']
      })


      let getQuote = (resolve, reject) => {
        qwest.get(dispatcher.url, null, dispatcher.headers)
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
          (response) => {
            this.setState({
              quotes: response
            });
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
    }


    componentDidMount() {
      this.getQuotes(10)
    }


    render() {
      return <div className="famousquotes-component">
               <FilterableTable mod="quotes"                        
                           data={this.state.quotes}
                           handleSort={this.handleSort}
                           {...this.props} />
             </div>
    }
}

export default FamousQuotesComponent;
