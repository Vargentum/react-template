'use strict';

import React from 'react';
import qwest from 'qwest'
import update from 'react-addons-update'
import _ from 'lodash'
import Q from 'q'

import {Tabs, TabList, Tab, TabPanel} from 'react-tabs'

import FilterableTable from 'components/ui/FilterableTableComponent'
import Area from 'components/ui/AreaComponent'
import Loader from 'components/ui/LoaderComponent'
import Creator from 'components/quotes/CreatorComponent'

require('styles/quotes/FamousQuotes.styl');

const CONFIG = {
  url: "https://andruxnet-random-famous-quotes.p.mashape.com",
  headers: {
    "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfrB5",
    // "X-Mashape-Key": "6ZxCnFvSUkmshFVDJrAg9TszqTEJp1OvHeIjsnwqQ4akuwfr",
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
    25: {checked: false},
    50: {checked: false}
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
        quotes: {
          data: [],
          order: null,
          orderBy: null
        },
        favorites: {
          data: [],
          order: null,
          orderBy: null
        },
        categories: CONFIG.categories,
        quantities: CONFIG.quantities,
        isLoading: true,
        isError: false
      }

      let getQuote = (url, resolve, reject) => {
        qwest
          .get(url, null, {
            headers: CONFIG.headers
          })
          .then((xhr, response) => {
            resolve(JSON.parse(response))
          })
          .catch((e, xhr, response) => {
            reject(e, response)
          })
      }


      this.getQuotes = (n) => {
        this.setState({
          isLoading: true,
          isError: false
        });

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

        Q.all(quotes)
          .then(quotes => {
            this.setState({
              quotes: update(this.state.quotes, {data: {$set: quotes}})
            });
          })
          .catch(error => {
            this.setState({
              isError: true 
            });
            throw new Error(error.name)
          })
          .finally(() => {
          this.setState({
            isLoading: false 
          });
        })
      }


      this.sort = (col, type) => {
        let currentCol = this.state[col]
        let order = currentCol.order === 'asc' ? 'desc' : 'asc'

        this.setState({
          [col]: {
            data: _.sortByOrder(currentCol.data, type ,order), 
            order: order,
            orderBy: type  
          } 
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


      this.translateQuote = (src, dest, idx) => {
        this.setState({
          [dest]: update(this.state[dest], {data: {$push: [this.state[src].data[idx]]}}),
          [src]: update(this.state[src], {data: {$splice: [[idx, 1]]}})
        });
      }

      this.isCategoryEmpty = cat => _.isEmpty(this.state[cat].data) && !this.state.isError
    }

    r_quotes(mod) {
      return <div>
              {this.isCategoryEmpty('quotes') ? 
                <Area type="empty" title="There is no quotes. Whould you add a bit?" />
                :
                <FilterableTable mod={`quotes, hoverable-rows, quotes-${mod}`}
                  data={this.state.quotes}
                  onThClick={_.partial(this.sort, 'quotes')}
                  onTrClick={_.partial(this.translateQuote, 'quotes', 'favorites')}
                  {...this.state} />
              }
            </div>


      
    }

    r_favorites(mod) {
      return <div>
              {this.isCategoryEmpty('favorites') ? 
                <Area type="empty" title="Would you like to add some favorites?">
                  You can add some quotes to this table by clicking onto them.
                </Area>
                :
                <FilterableTable mod={`favorites, hoverable-rows, favorites-${mod}`}
                   data={this.state.favorites}
                   onThClick={_.partial(this.sort, 'favorites')}
                   onTrClick={_.partial(this.translateQuote, 'favorites', 'quotes')}
                   {...this.state} />
              }
      </div>
    }


    r_tabs() {
      return <Tabs>
               <TabList>
                 <Tab>Quotes</Tab>
                 <Tab>Favotites</Tab>
               </TabList>
               <TabPanel>
                 {this.r_quotes('tabbed')}
               </TabPanel>
               <TabPanel>
                 {this.r_favorites('tabbed')}
               </TabPanel>
             </Tabs>
    }


    componentDidMount() {
      this.getQuotes(10)
    }

    render() {
      let quantity = _.findKey(this.state.quantities, ({checked}) => checked)
      let isRenderTabs = !this.state.isLoading && !this.state.isError

      return <div className="famousquotes-component">
               <Creator onQuantityUpdate={_.partial(this.handleRadioSelection, "quantities")}
                        onCategoryUpdate={_.partial(this.handleCheckboxSelection, "categories")}
                        action={_.partial(this.getQuotes, quantity)}
                        {...this.state}/>
               
               {isRenderTabs ? 
                 this.r_tabs() : null
               }
               {this.state.isLoading ? 
                 <Area type="loading" title="Loading... Please, be patient." /> : null             
               }
               {this.state.isError ? 
                 <Area type="error" title="Oops, there is an error here!">Try to reload the quotes</Area> : null
               }
             </div>
    }
}

export default FamousQuotesComponent;
