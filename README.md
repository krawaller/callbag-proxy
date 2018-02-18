# callbag-proxy

[Callbag](https://github.com/callbag/callbag) proxy useful for solving circular dependencies between sources.

```
const proxy = makeProxy();

// later

proxy.connect(sourceToProxy);
```

`npm install callbag-proxy`

## example

```js
const makeProxy = require('callbag-proxy');

const sourceB_proxy = makeProxy();

const sourceA = /* code involving sourceB_proxy */

const sourceB = /* code involving sourceA */

sourceB_proxy.connect(sourceB);
```
