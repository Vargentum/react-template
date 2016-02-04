/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import FamousQuotesComponent from 'components/quotes/FamousQuotesComponent.js';

describe('FamousQuotesComponent', () => {
    let component;

    beforeEach(() => {
      component = createComponent(FamousQuotesComponent);
    });

    it('should have its component name as default className', () => {
      expect(component.props.className).to.equal('famousquotes-component');
    });
});
