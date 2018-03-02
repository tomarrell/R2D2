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

## Usage
An example of this HOC in the wild.

```javascript
// Example
```

## Contributing 
Feel free to open a PR contributing a feature addition, bugfix or even adding improving documentation. PR's are always welcome! :)

## Issues
As this project is still in Alpha, there is a very significant chance of bugs popping up. If you do run into something of the sort, please feel free to open an issue and it will be looked into ASAP.

## License
MIT
