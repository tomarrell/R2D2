import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function (WrappedComponent) {
  class R2HOC extends Component {
    constructor(props) {
      super(props);

      this.state = {
        valid: false,
        data: null,
      };
    }

    componentDidMount() {
      const { store } = this.context;
      const { action } = this.props;

      this.validateStore();
      this.updateSubscription();
      store.dispatch(action);
    }

    componentDidUpdate(prevProps) {
      const { selector: newSelector } = this.props;

      if (newSelector !== prevProps.selector) {
        if (this.validateStore()) {
          this.handleStoreChange();
          return;
        }

        this.updateSubscription();
      }
    }

    componentWillUnmount() {
      if (this._subscription) {
        this._subscription();
      }
    }

    getSelectedState = () => {
      const { store } = this.context;
      const { selector } = this.props;

      return selector(store.getState());
    }

    handleStoreChange = () => {
      this.setState({
        data: this.getSelectedState(),
      });
    }

    updateSubscription = () => {
      const { store } = this.context;

      this._subscription = store.subscribe(this.handleStoreChange);
    }

    validateStore = () => {
      const { validateStore } = this.props;

      const isStoreValid = validateStore(this.getSelectedState());

      this.setState({
        valid: isStoreValid,
      });

      return isStoreValid;
    }

    render() {
      const { valid, data } = this.state;
      const { altComponent: Alt, ...passThroughProps } = this.props;

      console.log(data);

      if (!Alt || valid) {
        return (
          <WrappedComponent
            {...passThroughProps}
            data={data}
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

    validateStore: PropTypes.func,
    altComponent: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  R2HOC.defaultProps = {
    validateStore: state => !!state,
    altComponent: null,
  };

  return R2HOC;
}
