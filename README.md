<img src="https://i.imgur.com/LXTmHwZ.jpg" width="200px">

[![npm version](https://badge.fury.io/js/react-r2d2.svg)](https://badge.fury.io/js/react-r2d2)

# R2D2
A React Higher Order Component (HOC) for ensuring your data makes it to your component in time. This was inspired to reduce the code required for the common use case of retrieving data from the Redux store, and dispatching an action to fetch it if it is non-existent.

It currently supports Redux out of the box, and any store that it can retrieve from context under the store key. Please feel welcome to contribute support for other libraries as well.

*WIP: Currently in testing, during this time the API is experimental and subject to change.*

## Usage
Install the latest stable version:

```
npm i react-r2d2
```

We currently support [CommonJS](http://wiki.commonjs.org/wiki/Modules/1.1.1), [AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md), and [ES](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) module types. If you like to live on the edge and use Rollup, feel free to use that as well.

## Running the tests
To run the tests included with the package. Run the command:

```
npm run test
```

The test suit is written using Mocha for execution and Chai for expect-style assertions. It also utilizes Enzyme for DOM and React component manipulation.

## API
Calling the HOC with passing in your component as the argument, you will be returned a new component which will accept the following props.

### Required props
- **selector**, *function*: This is the Redux selector method to select the portion of store you would like to validate.

- **action**, *{ type: String, payload: Any }*: The Redux action you would like to dispatch to fetch the data to populate the selected portion of the store.

### Optional props
- **validateStore**, *function*: this is an optional function that will determine the validity of the selected portion of store to fulfill the wrapped components requirements. This will default to a simple `selectedState => !!selectedState` boolean check.

- **altComponent**, *node*: this optional node will be shown while the validity of the selected state is false. This could be a React component, or a simple text node. This is ideal for placing a loading component while the data is being fetched.

## Usage
An example of this HOC in the wild.

###### Component.js
```javascript
import React from 'react';
import R2D2 from 'react-r2d2';

const Component = ({ data }) => {
  return (
    <div>I will always render with {data}</div>
  );
};

export default R2D2(Component);
```

###### Container.js
```javascript
import React, { Component } from 'react';

import WrappedComponent from './Component';

import { selector } from './selectors';
import { action } from './actions';

// If the store is not able to be validated, this component will be rendered as altComponent.
const Loading = () => <div>Loading...</div>;

class Container extends Component {
  state = {}
  
  render() {
    return (
      <div>
        <WrappedComponent
          selector={selector}
          action={action}
          {/* v Optional v */}
          altComponent={Loading}
          validateStore={state => state.id !== undefined}
        />
      </div>
    );
  }
}

export default Container;
```

## Contributing 
Feel free to open a PR contributing a feature addition, bugfix or even adding/improving documentation. PR's are always welcome! :)

## Issues
As this project is still in Alpha, there is a very significant chance of bugs popping up. If you do run into something of the sort, please feel free to open an issue and it will be looked into ASAP.

## License
MIT
