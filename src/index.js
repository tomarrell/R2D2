import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function (WrappedComponent) {
  class R2D2 extends Component {
    constructor(props) {
      super(props);

      this.state = {
        valid: false,
        data: null,
      };
    }

    componentDidMount() {
      this.updateSubscription();
      const isValid = this.validateStore();

      if (!isValid) {
        this.dispatchAction();
      }
    }

    /*
     * Replace selector, action from
     * props should they change.
     */
    componentDidUpdate(prevProps) {
      const { selector: newSelector } = this.props;

      // If R2D2 receives a new selector, it will validate it again.
      if (newSelector !== prevProps.selector) {
        if (this.validateStore()) {
          this.handleStoreChange();
          return;
        }

        this.dispatchAction();
      }
    }

    /*
     * Unsubscribe from store.
     */
    componentWillUnmount() {
      if (this._subscription) {
        this._subscription();
      }
    }

    /*
     * Get new state using selector
     * from props.
     */
    getSelectedState = () => {
      const { store } = this.context;
      const { selector } = this.props;

      return selector(store.getState());
    }

    /*
     * Dispatch the passed through action
     * to Redux store.
     */
    dispatchAction = () => {
      const { action } = this.props;
      const { store } = this.context;

      store.dispatch(action);
    }

    /*
     * Handler to run when Redux store
     * is updated. Grab new selected state.
     */
    handleStoreChange = () => {
      this.setState({
        valid: this.validateStore(),
        data: this.getSelectedState(),
      });
    }

    /*
     * Setup or replace the store subscription
     * handler.
     */
    updateSubscription = () => {
      const { store } = this.context;

      if (this._subscription) {
        this._subscription();
      }

      this._subscription = store.subscribe(this.handleStoreChange);
    }

    /*
     * Check if the selected part of store
     * passes the validation function.
     */
    validateStore = () => {
      const { validateStore } = this.props;

      const selectedState = this.getSelectedState();
      const isStoreValid = validateStore(selectedState);

      this.setState({
        valid: isStoreValid,
        data: selectedState,
      });

      return isStoreValid;
    }

    render() {
      const { valid, data } = this.state;
      const { altComponent: Alt, ...passThroughProps } = this.props;

      if (valid) {
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

  R2D2.contextTypes = {
    store: PropTypes.object.isRequired,
  };

  R2D2.propTypes = {
    selector: PropTypes.func.isRequired,
    action: PropTypes.shape({
      type: PropTypes.string,
      payload: PropTypes.any,
    }).isRequired,

    validateStore: PropTypes.func,
    altComponent: PropTypes.oneOfType([
      PropTypes.func,
    ]),
  };

  R2D2.defaultProps = {
    validateStore: state => !!state,
    altComponent: null,
  };

  R2D2.displayName =
    `R2D2(${
      WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component'
    })`;

  return R2D2;
}
