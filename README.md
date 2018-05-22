# WWDC2010 Model Loader &middot; [![Circle CI Status](https://circleci.com/gh/PatriceVignola/wwdc2010-model-loader.svg?style=shield)](https://circleci.com/gh/PatriceVignola/wwdc2010-model-loader) [![Coverage Status](https://coveralls.io/repos/github/PatriceVignola/wwdc2010-model-loader/badge.svg?branch=master)](https://coveralls.io/github/PatriceVignola/wwdc2010-model-loader?branch=master) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![jest](https://facebook.github.io/jest/img/jest-badge.svg)](https://github.com/facebook/jest)

Lightweight JavaScript loader for .model 3D files. `model` is a binary format used by Apple in the [GLEssentials sample](https://developer.apple.com/library/content/samplecode/GLEssentials/Introduction/Intro.html) that they released for [WWDC](https://developer.apple.com/wwdc/) 2010.

The loader was originally made to help with the conversion of the GLEssentials [demon.model](https://github.com/PatriceVignola/wwdc2010-model-loader/blob/master/models/demon.model) file to other file formats (e.g. obj) in order to have consistent examples for [react-native-gl-model-view](https://github.com/rastapasta/react-native-gl-model-view).

WWDC2010 Model Loader can be used in pure JavaScript applications runnable directly in the browser, as well as any ES5 and ES6 applications ([Node.js](https://nodejs.org/), [React](https://reactjs.org/), [React Native](https://facebook.github.io/react-native/), [React Native Web](https://github.com/necolas/react-native-web), etc). In the near future, it will also be possible to run it directly from the CLI.

---

## Getting Started

You can install the library with `yarn`:
```sh
yarn add wwdc2010-model-loader
```
You can also use `npm` if you prefer:
```sh
npm install wwdc2010-model-loader --save
```

---

## Usage

So far, the public API is very simple and you only need to call the following function: `Wwdc2010ModelLoader.load()`. Here's how you can use use it to build an app on different environments.

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

---

## Examples

To run the examples, follow the following steps depending on your platform:

### Pure JavaScript

Using `yarn`:
```sh
cd examples/html-example && yarn install
```

Using `npm`:
```sh
cd examples/html-example && npm install
```

Then, simply drag and drop `example.html` in your favorite browser and select the [demon.model](https://github.com/PatriceVignola/wwdc2010-model-loader/blob/master/models/demon.model) file available in the models folder at the root of this repository. You will see the indices, vertices, UVs and normals of the model.

In the future, you will also be able to preview the model in a WebGL view but since this module is a loader and not a viewer, this is not a priority.

### React

Coming soon...

### React Native

Coming soon...

### Node.js

Coming soon...

### Babylon.js

Coming soon...
