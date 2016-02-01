'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'
import Q from 'q'

import FilterableTable from 'components/ui/FilterableTableComponent'

require('styles/quotes/FamousQuotes.styl');



class FamousQuotesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'QuotesFamousQuotesComponent';

  }


  render() {
    return (
      <div className="famousquotes-component">
        <FilterableTable mod="quotes"                        
                         data={this.props.quotes}
                         {...this.props} />
      </div>
    );
  }
}


class FamousQuotesComponentContainer extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'FamousQuotesComponentContainer';

      this.state = {
        quotes: []
      }


      let getQuote = (resolve, reject) => {
        qwest.get("https://andruxnet-random-famous-quotes.p.mashape.com", null, {
          headers: {
            "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
          }
        }).then((xhr, response) => {
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
      return <div>
               <FamousQuotesComponent
                  handleSort={this.handleSort}
                  {...this.state} />
             </div>
    }
}

export default FamousQuotesComponentContainer;
