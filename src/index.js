import React, { Component } from 'react';

export default function (component, ...passthrough) {
  return class R2HOC extends Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    render() {
      return <div {...passthrough} />;
    }
  };
}
