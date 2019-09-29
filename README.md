<p align="center">
  <h3 align="center">CSS To Object/JSON</h3>
  <p align="center">
  <a href="https://www.npmjs.org/package/css2object"><img src="https://img.shields.io/npm/v/css2object.svg?style=flat-square" alt="npm"></a>
  <a href="https://travis-ci.org/ooade/css2object"><img src="https://img.shields.io/travis/ooade/css2object.svg?style=flat-square" alt="travis"></a>
  <a href="https://github.com/ooade/css2object"><img src="https://img.shields.io/npm/dm/css2object.svg?style=flat-square" alt="downloads/month"></a>
  <a href="http://makeapullrequest.com"><img src="https://img.shields.io/badge/PR(s)-welcome-brightgreen.svg?style=flat-square" alt="pullrequest"></a>
  <a href="http://www.firsttimersonly.com"><img src="https://img.shields.io/badge/first--timers--only-friendly-blue.svg?style=flat-square" alt="firsttimersonly"></a>
  </p>
</p>

## Installation

```sh
npm add css2object
```

## Usage

```js
import Css2Object from 'css2object';
const cssData = `
 h1 {
     color: blue;
 }

 body {
     color: red;
 }
`
const css2json = new Css2Object(cssData);
css2json.read();
console.log(css2json.cssRecord));
```

## LICENSE

MIT
