# Immutable.js

[Immutable.js](https://github.com/immutable-js/immutable-js) 為 FB 的開源專案，它提供了 7 種常用的資料結構 `(List, Stack, Map, OrderedMap, Set, OrderedSet, Record)` ，而且 api 是 FP style 再加上類似 mutable，讓它相當好上手。

```javascript
// 將 map1.b 改為 87
const { Map } = Immutable;
const map1 = Map({ a: 1, b: 2, c: 3 });
const map2 = map1.set("b", 87);

console.log(
  map1.get("b"), // 2
  map2.get("b"), // 87
  map2.toJS() // { a: 1, b: 87, c: 3 }
);
```

```javascript
// 過濾掉奇數
// 加 1
// 並加總
const { List } = Immutable;
const list1 = List([1, 2, 3, 4, 5, 6]);
const list2 = list1
  .filter(x => x % 2 == 1)
  .map(x => x + 1);
const sumList2 = list2.reduce((acc, x) => acc + x);

console.log(
  list2.toJS(), // [2, 4, 6]
  sumList2 // 12
);
```