import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function (WrappedComponent) {
  class R2HOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        valid: false,
      };
    }

    componentDidMount() {
      const {
        selector,
        validateState,
      } = this.props;
      const { store } = this.context;

      console.log(store);
      const selectedState = selector(store.getState());

      if (validateState(selectedState)) {
        this.setState({
          valid: true,
        });
      }

      this.setState({ valid: false });
    }

    checkState = () => {
      const { store } = this.context;
      const { selector, validateState } = this.props;

      return validateState(selector(store.getState()));
    }

    render() {
      const { valid } = this.state;
      const { altComponent: Alt, ...passThroughProps } = this.props;

      console.log(this.props);

      if (valid) {
        return (
          <WrappedComponent
            {...passThroughProps}
          />
        );
      }

      if (Alt) return <Alt />;
      return null;
    }
  }

  R2HOC.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  R2HOC.propTypes = {
    selector: PropTypes.func.isRequired,
    action: PropTypes.shape({
      type: PropTypes.string,
      payload: PropTypes.object,
    }).isRequired,

    validateState: PropTypes.func,
    altComponent: PropTypes.node,
  };

  R2HOC.defaultProps = {
    validateState: state => !!state,
    altComponent: null,
  };

  return R2HOC;
}
