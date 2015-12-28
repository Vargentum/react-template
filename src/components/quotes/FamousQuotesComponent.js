'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'

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

      this.getQuotes = n => {
        while(n > 0){
          qwest.get("https://andruxnet-random-famous-quotes.p.mashape.com", null, {
            headers: {
              "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept": "application/json"
            }
          })
          .then((xhr, response) => {
            this.setState({
              quotes: update(this.state.quotes, {$push: [JSON.parse(response)]})
            });
          })
          .catch((xhr, response, e) => {
            console.log(e.name)
          })
          .complete((xhr, response) => {
            console.log(`Complete response ${n}`)
          }) 

          n-- 
        }
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
