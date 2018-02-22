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
        context: { store },
        checkState,
        props: { action },
      } = this;

      console.log(store);

      if (checkState()) {
        this.setState({ valid: true });
      }

      store.dispatch(action);
      this.setState({ valid: false });
    }

    checkState = () => {
      const {
        context: { store },
        props: {
          selector,
          validateState,
        },
      } = this;

      return validateState(selector(store.getState()));
    }

    render() {
      const {
        state: { valid },
        props: {
          altComponent: Alt,
          ...passThroughProps
        },
      } = this;

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
