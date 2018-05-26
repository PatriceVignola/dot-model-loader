# load-dot-model

[![Circle CI Status](https://circleci.com/gh/PatriceVignola/load-dot-model.svg?style=shield)](https://circleci.com/gh/PatriceVignola/load-dot-model) [![Coverage Status](https://coveralls.io/repos/github/PatriceVignola/load-dot-model/badge.svg?branch=master)](https://coveralls.io/github/PatriceVignola/load-dot-model?branch=master) [![npm version](https://badge.fury.io/js/load-dot-model.svg)](https://badge.fury.io/js/load-dot-model) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

Load .model 3D files in JavaScript.

`model` is a binary format used by Apple in the [GLEssentials sample](https://developer.apple.com/library/content/samplecode/GLEssentials/Introduction/Intro.html) that they released for [WWDC](https://developer.apple.com/wwdc/) 2010.

The loader was originally made to help with the conversion of the GLEssentials [demon.model](https://github.com/PatriceVignola/load-dot-model/blob/master/models/demon.model) file to other file formats (e.g. obj) in order to have consistent examples for [react-native-gl-model-view](https://github.com/rastapasta/react-native-gl-model-view).

load-dot-model can be used in pure JavaScript applications runnable directly in the browser, as well as any ES5 and ES6 applications ([Node.js](https://nodejs.org/), [React](https://reactjs.org/), [React Native](https://facebook.github.io/react-native/), [React Native Web](https://github.com/necolas/react-native-web), etc).

## Getting Started

You can install the library with `yarn`:
```sh
yarn add load-dot-model
```
You can also use npm:
```sh
npm install load-dot-model --save
```

## Usage

### Pure JavaScript

Coming soon...

### ES5

Coming soon...

### ES6

Coming soon...

### React

Coming soon...

### React Native

Coming soon...

### Babylon.js

Coming soon...

## Examples

To run the examples, follow the following steps depending on your platform:

### Pure JavaScript

First, make sure to run `yarn build` or `npm run build`. This will generate the `dist/load-dot-model.min.js` file used in the example.

Then, simply drag and drop `example.html` in your favorite browser and select the [demon.model](https://github.com/PatriceVignola/load-dot-model/blob/master/models/demon.model) file available in the models folder at the root of this repository. The console will print the indices, vertices, UVs and normals of the model.

In the future, you will also be able to preview the model in a WebGL view but since this module is a loader and not a viewer, this is not a priority.

### React

Coming soon...

### React Native

Coming soon...

### Node.js

Coming soon...

### Babylon.js

Coming soon...

## License

Dot Model Loader is [MIT licensed](https://github.com/PatriceVignola/load-dot-model/blob/master/LICENSE).
