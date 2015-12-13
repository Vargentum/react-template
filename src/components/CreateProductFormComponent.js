'use strict';

import React from 'react';
import _ from 'lodash';
import update from 'react-addons-update';

require('styles//CreateProductForm.styl');

const productTemplate = {
  name: '',
  category: '',
  price: 0
}

Object.defineProperty(productTemplate, 'stocked', {
  value: false,
  enumerable: false
})



class CreateProductFormComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      product: productTemplate,
      isValidForm: false
    }

    this.handleInputChange = (type, valueType, evt) => {
      let product = update(this.state.product, {
        [type]: {$set: evt.currentTarget[valueType]}
      })
      this.setState({
        product: product
      }, this.validateForm);
    }

    this.handleSave = (evt) => {
      evt.preventDefault()
      this.props.handleSave(this.state.product)
      this.resetForm()
    }

    this.resetForm = () => {
      this.setState({
        product: productTemplate,
        isValidForm: false
      });
    }

    this.validateForm = () => {
      let isValidForm = true
      for (let key in this.state.product) {
        if (!!this.state.product[key] === false) {
          isValidForm = false;
          break;
        }
      }
      this.setState({
        isValidForm: isValidForm
      });
    }
  }


  render() {
    return (
      <form className="createproductform-component">
        <p><input type="text"
                  placeholder="Name"
                  required
                  value={this.state.product.name}
                  onChange={_.partial(this.handleInputChange, 'name', 'value')}/>
        </p>
        <p><input type="number"
                  placeholder="Price"
                  required
                  value={this.state.product.price}
                  onChange={_.partial(this.handleInputChange, 'price', 'value')}/>
        </p>
        <p><input type="text"
                  required
                  placeholder="Category"
                  value={this.state.product.category}
                  onChange={_.partial(this.handleInputChange, 'category', 'value')}/>
        </p>
        <label>
          <input type="checkbox"
                 checked={this.state.product.stocked}
                 onChange={_.partial(this.handleInputChange, 'stocked', 'checked')}/>
          Stocked item
        </label>
        <button 
          disabled={!this.state.isValidForm}
          onClick={this.handleSave}>Add item</button>
      </form>
    );
  }
}

CreateProductFormComponent.displayName = 'CreateProductFormComponent';

// Uncomment properties you need
// CreateProductFormComponent.propTypes = {};
// CreateProductFormComponent.defaultProps = {};

export default CreateProductFormComponent;
