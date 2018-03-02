import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import R2D2 from '../src/';

Enzyme.configure({ adapter: new Adapter() });

class Provider extends React.Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return (
      <div>
        {...this.children}
      </div>
    );
  }
}

Provider.childContextTypes = {
  store: PropTypes.object,
};

Provider.propTypes = {
  store: PropTypes.object,
};

const getHOC = () => {
  const component = <div>Test</div>;
  const HOC = R2D2(component);

  return (
    <Provider store={{}}>
      <HOC />
    </Provider>
  );
};


describe('HOC', () => {
  it('should return something', () => {
    expect(R2D2).to.be.ok;
  });

  it('should return a component', () => {
    const HOC = getHOC();
    const wrapper = shallow(HOC);
    console.log(wrapper);
  });
});

