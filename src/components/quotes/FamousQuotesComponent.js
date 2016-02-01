'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'
import Q from 'q'

require('styles/quotes/FamousQuotes.styl');


class FamousQuotesComponent extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'QuotesFamousQuotesComponent';

  }


  render() {
    return (
      <div className="famousquotes-component">
        hello quotes
        <ul>
          {this.props.quotes.map(
            q => <li key={_.uniqueId('quote-')}>
                    <p>{q.quote}</p>
                    <p>{q.author} - {q.category}</p>
                 </li>
          )}
        </ul>        
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

      this.getQuote = (resolve, reject) => {
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


      this.getQuotes = n => {

        let quotes = _.times(n, () => {
          return Q.promise((resolve, reject) => {
            this.getQuote(
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
          })
      }
    }




    componentDidMount() {
      this.getQuotes(10)
    }


    render() {
      // this.state.quotes
      return <div>
               <FamousQuotesComponent {...this.state} />
             </div>
    }
}

export default FamousQuotesComponentContainer;
