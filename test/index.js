import React from 'react';
import 'jsdom-global/register';
import { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import R2D2HOC from '../src/index';

Enzyme.configure({ adapter: new Adapter() });

const defaultStore = (state = {}) => ({
  subscribe: () => () => console.log('Unsubscribed'), // eslint-disable-line
  getState: () => state,
  dispatch: () => {},
});

const defaultProps = () => ({
  selector: store => store,
  action: { type: 'TEST' },
  altComponent: () => <div>Loading...</div>,
});

const child = () => {
  const Header = () => <h1>Title</h1>;
  Header.displayName = 'Header';
  return Header;
};

const customMount = (component, store) => mount(
  component,
  { context: { store: store || defaultStore() } },
);

const customShallow = (component, store) => shallow( // eslint-disable-line
  component,
  { context: { store: store || defaultStore() } },
);

const mountWrapper = ({
  R2D2 = R2D2HOC(child()),
  store = defaultStore(),
  props = defaultProps(),
} = {}) => customMount(<R2D2 {...props} />, store);


describe('HOC', () => {

  describe('General', () => {
    it('import should return something', () => {
      expect(R2D2HOC).to.be.ok;
      expect(R2D2HOC).to.be.a('function');
    });

    it('should return a component with wrapped displayName', () => {
      const wrapper = mountWrapper();

      expect(wrapper.name()).to.equal(`R2D2(${child().displayName})`);
    });

    it('should have access to the store through context', () => {
      const store = defaultStore();
      const wrapper = mountWrapper({ store });

      expect(wrapper.instance().context.store).to.equal(store);
    });
  });

  describe('Validation', () => {
    it('should be valid with default validation on default store', () => {
      const wrapper = mountWrapper();

      expect(wrapper.state('valid')).to.be.true;
    });

    it('should validate the state on mount and fail if store is undefined', () => {
      const wrapper = mountWrapper({
        store: defaultStore(null),
      });

      expect(wrapper.state('valid')).to.be.false;
    });
  });

  describe('Selection', () => {
    it('select the correct part of store using custom selector', () => {
      const customState = 'This is test state';
      const customSelector = state => state.test;

      const store = defaultStore({ test: customState, other: false });
      const props = {
        ...defaultProps(),
        selector: customSelector,
      };

      const wrapper = mountWrapper({ store, props });

      expect(wrapper.prop('selector')).to.equal(customSelector);
      expect(wrapper.state('data')).to.equal(customState);
    });

    it('custom selected state validity to be true', () => {
      const customState = 'This is test state';
      const customSelector = state => state.test;

      const store = defaultStore({ test: customState, other: false });
      const props = {
        ...defaultProps(),
        selector: customSelector,
      };

      const wrapper = mountWrapper({ store, props });

      expect(wrapper.prop('selector')).to.equal(customSelector);
      expect(wrapper.state('valid')).to.be.true;
    });

    it('new selector prop passed down, selects new state', () => {
      const customState1 = 'Selector 1 State';
      const customSelector1 = state => state.one;

      const customState2 = 'Selector 2 State';
      const customSelector2 = state => state.two;

      const store = defaultStore({ one: customState1, two: customState2 });
      const props = {
        ...defaultProps(),
        selector: customSelector1,
      };

      const wrapper = mountWrapper({ store, props });

      expect(wrapper.prop('selector')).to.equal(customSelector1);
      expect(wrapper.state('valid')).to.be.true;
      expect(wrapper.state('data')).to.equal(customState1);

      wrapper.setProps({
        ...props,
        selector: customSelector2,
      });

      expect(wrapper.prop('selector')).to.equal(customSelector2);
      expect(wrapper.state('valid')).to.be.true;
      expect(wrapper.state('data')).to.equal(customState2);
    });

    it('new selector prop passed down, validity changes', () => {
      const customState1 = 'Selector 1 State';
      const customSelector1 = state => state.one;

      const customState2 = false;
      const customSelector2 = state => state.two;

      const store = defaultStore({ one: customState1, two: customState2 });
      const props = {
        ...defaultProps(),
        selector: customSelector1,
      };

      const wrapper = mountWrapper({ store, props });

      expect(wrapper.prop('selector')).to.equal(customSelector1);
      expect(wrapper.state('data')).to.equal(customState1);
      expect(wrapper.state('valid')).to.be.true;

      wrapper.setProps({
        ...props,
        selector: customSelector2,
      });

      expect(wrapper.prop('selector')).to.equal(customSelector2);
      expect(wrapper.state('data')).to.equal(customState2);
      expect(wrapper.state('valid')).to.be.false;
    });
  });

  describe('Dispatch', () => {
    // TODO: Add tests
  });

});

