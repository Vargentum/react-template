'use strict';

import React from 'react';
import _ from 'lodash';
import update from 'react-addons-update'

require('styles//CreateProductForm.styl');

class CreateProductFormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      name:     '',
      category: '',
      price:    0,
      stocked:  false
    }

    this.handleInputChange = (type, valueType, evt) => {
      this.setState({
        [type]: evt.currentTarget[valueType]
      });
    }

    this.handleSave = (evt) => {
      evt.preventDefault()
      this.props.onCreate(this.state)
    }
  }


  render() {
    return (
      <form className="createproductform-component">
        <p><input type="text"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={_.partial(this.handleInputChange, 'name', 'value')}/>
        </p>
        <p><input type="number"
                  placeholder="Price"
                  value={this.state.price}
                  onChange={_.partial(this.handleInputChange, 'price', 'value')}/>
        </p>
        <p><input type="text"
                  placeholder="Category"
                  value={this.state.category}
                  onChange={_.partial(this.handleInputChange, 'category', 'value')}/>
        </p>
        <label>
          <input type="checkbox"
                 checked={this.state.stocked}
                 onChange={_.partial(this.handleInputChange, 'stocked', 'checked')}/>
          Stocked item
        </label>
        <button onClick={this.handleSave}>Add item</button>
      </form>
    );
  }
}

CreateProductFormComponent.displayName = 'CreateProductFormComponent';

// Uncomment properties you need
// CreateProductFormComponent.propTypes = {};
// CreateProductFormComponent.defaultProps = {};

export default CreateProductFormComponent;
