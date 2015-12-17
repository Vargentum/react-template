'use strict';

import React from 'react';
import qwest from 'qwest'

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
      </div>
    );
  }
}


class FamousQuotesComponentContainer extends React.Component {
    constructor(props) {
      super(props);
      this.displayName = 'FamousQuotesComponentContainer';

      this.state = {
        quotes: {}
      }
    }

    componentDidMount() {
      qwest.get("https://andruxnet-random-famous-quotes.p.mashape.com", null, {
        headers: {
          "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })
      .then((xhr, response) => {
        console.log(response)
      })
      .catch((xhr, response, e) => {
        console.log(e.name)
      })
      .complete((xhr, response) => {
        console.log("Completed!11")
      })
    }

/*
cat={category}

*/
    render() {
      return <div>
               <FamousQuotesComponent quotes={this.state.quotes} />
             </div>
    }
}

export default FamousQuotesComponentContainer;
