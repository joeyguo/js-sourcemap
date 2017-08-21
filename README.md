# js-sourcemap

js sourcemap generator and consumer

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

// get generated loc by origin position
var loc = smConsumer.getGenerated({
    line: lineNum,
    column: columnNum
})

// get origin loc by generated position
var loc2 = smConsumer.getOriginal({
    line: lineNum2,
    column: columnNum2
})
```