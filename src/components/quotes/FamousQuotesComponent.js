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
  categories: ['famous', 'movies']
}


const categoryRequestDispatcher = function(params) {
  let {url, headers} = CONFIG
  let dispatchUrl = ({k, v}) => {
    if (_.isEmpty(v)) return url;
    return v.forEach(ct => url += `/?${k}=${v}`)
  }
  return {
    url: dispatchUrl(params),
    headers: headers
  }
}


class FamousQuotesComponent extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'FamousQuotesComponent';

      this.state = {
        quotes: [],
        categories: CONFIG.categories
      }

      let dispatcher = categoryRequestDispatcher({
        cat: this.state.cat
      })


      let getQuote = (resolve, reject) => {
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
          (response) => {
            this.setState({
              quotes: update(this.state.quotes, {$push: response})
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
               <Creator handleAdd={function() {}}
                        handleCategoryUpdate={function() {}} 
                        {...this.state}/>
             </div>
    }
}

export default FamousQuotesComponent;
