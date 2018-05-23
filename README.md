# Dot Model Loader

[![Circle CI Status](https://circleci.com/gh/PatriceVignola/dot-model-loader.svg?style=shield)](https://circleci.com/gh/PatriceVignola/dot-model-loader) [![Coverage Status](https://coveralls.io/repos/github/PatriceVignola/dot-model-loader/badge.svg?branch=master)](https://coveralls.io/github/PatriceVignola/dot-model-loader?branch=master) [![npm version](https://badge.fury.io/js/dot-model-loader.svg)](https://badge.fury.io/js/dot-model-loader) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

A lightweight JavaScript loader for .model 3D files.

`model` is a binary format used by Apple in the [GLEssentials sample](https://developer.apple.com/library/content/samplecode/GLEssentials/Introduction/Intro.html) that they released for [WWDC](https://developer.apple.com/wwdc/) 2010.

The loader was originally made to help with the conversion of the GLEssentials [demon.model](https://github.com/PatriceVignola/dot-model-loader/blob/master/models/demon.model) file to other file formats (e.g. obj) in order to have consistent examples for [react-native-gl-model-view](https://github.com/rastapasta/react-native-gl-model-view).

Dot Model Loader can be used in pure JavaScript applications runnable directly in the browser, as well as any ES5 and ES6 applications ([Node.js](https://nodejs.org/), [React](https://reactjs.org/), [React Native](https://facebook.github.io/react-native/), [React Native Web](https://github.com/necolas/react-native-web), etc). In the near future, it will also be possible to run it directly from the CLI.

## Getting Started

You can install the library with `yarn`:
```sh
yarn add dot-model-loader
```
You can also use `npm` if you prefer:
```sh
npm install dot-model-loader --save
```

## Usage

So far, the public API is very simple and you only need to call the following function: `loadDotModel(buffer: ArrayBuffer)`. Here's how you can use use it to build an app on different environments.

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

First, make sure to run `yarn build` or `npm run build`. This will generate the `dist/dot-model-loader.min.js` file used in the example.

Then, simply drag and drop `example.html` in your favorite browser and select the [demon.model](https://github.com/PatriceVignola/dot-model-loader/blob/master/models/demon.model) file available in the models folder at the root of this repository. The console will print the indices, vertices, UVs and normals of the model.

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

Dot Model Loader is [MIT licensed](https://github.com/PatriceVignola/dot-model-loader/blob/master/LICENSE).
