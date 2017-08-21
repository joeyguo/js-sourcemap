# js-sourcemap

js-sourcemap generator and consumer

## Install

```sh
npm install js-sourcemap
```

or use CDN

- https://unpkg.com/js-sourcemap/dist/js-sourcemap.min.js

## Usage

### generator

```js
import { generator } from 'js-sourcemap';

// use js-beautify
// var dist = beautify(src);
// ...

var sourcemap = generator(src, dist);

console.log(sourcemap);
```

### consumer

```js
import { consumer } from 'js-sourcemap';

var smConsumer = consumer(sourcemap);

// get generated loc by original position
var loc = smConsumer.getGenerated({
    line: lineNum,
    column: columnNum
})

// get original loc by generated position
var loc2 = smConsumer.getOriginal({
    line: lineNum2,
    column: columnNum2
})
```