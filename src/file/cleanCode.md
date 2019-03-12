# 在JavaScript中編寫更好的條件的5個技巧

## 目錄

- 1. 對多個標準使用Array.includes
- 2. 減少嵌套，儘早返回
- 3. 使用默認功能參數和解構
- 4. 支持Map / Object Literal而不是Switch語句
- 5. 對所有/部分標準使用Array.every和Array.some

### 1. 對多個標準使用Array.includes

```javascript
// condition
function test(fruit) {
  if (fruit == 'apple' || fruit == 'strawberry') {
    console.log('red');
  }
}
```

- 乍一看，上面的例子看起來不錯。然而，如果我們得到更多的紅色水果，說的`cherry`和`cranberries`？我們是否會更多地擴展聲明`||`？

- 我們可以使用[（Array.includes）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)重寫上面的條件`Array.includes`

```javascript
function test(fruit) {
  // extract conditions to array
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  if (redFruits.includes(fruit)) {
    console.log('red');
  }
}
```

- 我們將`red fruits`（條件）提取到數組中。通過這樣做，代碼看起來更整潔。

### 2. 減少嵌套，儘早返回

- 讓我們擴展前面的示例以包含另外兩個條件：

- 如果沒有提供水果，拋出錯誤
- 如果超過10，則接受並打印水果數量。

```javascript
function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // condition 1: fruit must has value
  if (fruit) {
    // condition 2: must be red
    if (redFruits.includes(fruit)) {
      console.log('red');
      // condition 3: must be big quantity
      if (quantity > 10) {
        console.log('big quantity');
      }
    }
  } else {
    throw new Error('No fruit!');
  }
}

// test results

test(null); // error: No fruits

test('apple'); // print: red

test('apple', 20); // print: red, big quantity
```

- 看看上面的代碼，我們有：

- 1個 if / else 語句過濾掉無效條件
- 3級嵌套 if 語句（條件1,2和3）

- 我個人遵循的一般規則是**在**發現**無效條件時提前返回**。

```javascript
/_ return early when invalid conditions found _/

function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
  // condition 1: throw error early
  if (!fruit) throw new Error('No fruit!');

      // condition 2: must be red
      if (redFruits.includes(fruit)) {
        console.log('red');
        // condition 3: must be big quantity
        if (quantity > 10) {
          console.log("big quantity");
        }
      }
}
```

- 通過這樣做，我們有一個較少級別的​​嵌套語句。這種編碼風格很好，特別是當你有很長的if語句時（想像你需要滾動到最底層才知道有一個else語句，而不是很酷）。

- 如果通過反轉條件並提前返回，我們可以進一步減少嵌套。請查看下面的條件2，看看我們是如何做到的：

```javascript
/_ return early when invalid conditions found _/

function test(fruit, quantity) {
  const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];

  if (!fruit) throw new Error('No fruit!'); // condition 1: throw error early

  if (!redFruits.includes(fruit)) return; // condition 2: stop when fruit is not red
  console.log('red');
  // condition 3: must be big quantity
  if (quantity > 10) {
    console.log('big quantity');
  }

}
```

- 通過反轉條件2的條件，我們的代碼現在沒有嵌套語句。當我們有很長的邏輯時，這種技術非常有用，我們希望在條件不滿足時停止進一步的處理。

- 但是，這樣做並不是**一件難事**。問問自己，這個版本（沒有嵌套）比前一個更好/更可讀（條件2嵌套）？

- 對我來說，我只是把它留作以前的版本（條件2嵌套）。這是因為：

- 代碼簡短直接，嵌套if更清晰
- 反轉條件可能會引發更多的思考過程（增加認知負荷）

- 因此，始終**旨在儘早減少嵌套和返回，但不要過度**。如果您感興趣，有一篇文章和StackOverflow討論會進一步討論這個主題：

- [避免其他，早期](http://blog.timoxley.com/post/47041269194/avoid-else-return-early)由蒂姆奧克斯利[回歸](http://blog.timoxley.com/post/47041269194/avoid-else-return-early)
- [StackOverflow討論](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement) if / else編碼風格

### 3. 使用默認功能參數和解構

- 我想下面的代碼可能看起來很熟悉，我們總是需要檢查`null`/ `undefined`值並在使用JavaScript時指定默認值：

```javascript
function test(fruit, quantity) {
  if (!fruit) return;
  const q = quantity || 1; // if quantity not provided, default to one

  console.log(`We have ${q} ${fruit}!`);
}

//test results

test('banana'); // We have 1 banana!

test('apple', 2); // We have 2 apple!
```

- 實際上，我們可以`q`通過分配默認函數參數來消除變量。

```javascript
function test(fruit, quantity = 1) { // if quantity not provided, default to one
  if (!fruit) return;
  console.log(`We have ${quantity} ${fruit}!`);
}

//test results

test('banana'); // We have 1 banana!

test('apple', 2); // We have 2 apple!
```

- 更簡單直觀不是嗎？請注意，每個參數都有自己的[默認函數參數](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)。例如，我們也可以指定默認值`fruit`：`function test(fruit = 'unknown', quantity = 1)`。

- 如果我們`fruit`是一個對象怎麼辦？我們可以指定默認參數嗎？

```javascript
function test(fruit) { 
  // printing fruit name if value provided
  if (fruit && fruit.name)  {
    console.log (fruit.name);
  } else {
    console.log('unknown');
  }
}

//test results

test(undefined); // unknown

test({ }); // unknown

test({ name: 'apple', color: 'red' }); // apple
```

- 看看上面的例子，我們想要打印水果名稱，如果它可用，或者我們將打印未知。我們可以避免`fruit && fruit.name`使用默認函數參數和破壞進行條件檢查。

```javascript
// destructing - get name property only
// assign default empty object {}
function test({name} = {}) {
  console.log (name || 'unknown');
}

//test results

test(undefined); // unknown

test({ }); // unknown

test({ name: 'apple', color: 'red' }); // apple
```

- 由於我們只需要`name`來自水果的屬性，我們可以使用構造參數`{name}`，然後我們可以`name`在代碼中使用變量而不是`fruit.name`。

- 我們還將空對象指定`{}`為默認值。如果我們不這樣做，那麼在執行該行時會出錯`test(undefined)`- `Cannot destructure property name of 'undefined' or 'null'.`因為`name` undefined中沒有屬性。

- 如果您不介意使用第三方庫，有幾種方法可以減少空檢查：

- 使用[Lodash獲取](https://lodash.com/docs/4.17.11#get)功能
- 使用Facebook開源的[idx](https://github.com/facebookincubator/idx)庫（與Babeljs）

- 以下是使用Lodash的示例：

```javascript
// Include lodash library, you will get _
function test(fruit) {
  console.log(__.get(fruit, 'name', 'unknown'); // get property name, if not available, assign default value 'unknown'
}

//test results

test(undefined); // unknown

test({ }); // unknown

test({ name: 'apple', color: 'red' }); // apple
```

- 您可以在[此處](http://jsbin.com/bopovajiye/edit?js,console)運行演示代碼。此外，如果您是功能編程（FP）的粉絲，您可以選擇使用[Lodash fp](https://github.com/lodash/lodash/wiki/FP-Guide)，[Lodash](https://github.com/lodash/lodash/wiki/FP-Guide)的功能版本（方法更改為`get`或`getOr`）。

### 4. 支持Map / Object Literal而不是Switch語句

- 讓我們看看下面的例子，我們想根據顏色打印水果：

```javascript
function test(color) {
  // use switch case to find fruits in color
  switch (color) {
    case 'red':
      return ['apple', 'strawberry'];
    case 'yellow':
      return ['banana', 'pineapple'];
    case 'purple':
      return ['grape', 'plum'];
    default:
      return [];
  }
}

//test results

test(null); // []

test('yellow'); // ['banana', 'pineapple']
```

- 上面的代碼似乎沒有錯，但我覺得它很冗長。使用具有更清晰語法的object literal可以實現相同的結果：

```javascript
// use object literal to find fruits in color
const fruitColor = {
  red: ['apple', 'strawberry'],
  yellow: ['banana', 'pineapple'],
  purple: ['grape', 'plum']
};

function test(color) {
  return fruitColor[color] || [];

}
```

- 或者，您可以使用[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)來實現相同的結果：

```javascript
// use Map to find fruits in color
const fruitColor = new Map()
  .set('red', ['apple', 'strawberry'])
  .set('yellow', ['banana', 'pineapple'])
  .set('purple', ['grape', 'plum']);

function test(color) {
  return fruitColor.get(color) || [];

}
```

- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)是自ES2015以來可用的對像類型，允許您存儲鍵值對。

- 我們應該禁止使用switch語句嗎？不要局限於此。就個人而言，我盡可能使用對象文字，但我不會設置硬規則來阻止它，使用對你的場景有意義的。

- Todd Motto有一篇文章深入研究了switch語句與對象文字，你可以[在這裡](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/)閱讀。

**TL; DR; 重構語法**

- 對於上面的例子，我們實際上可以重構我們的代碼以獲得相同的結果`Array.filter`。

```javascript
const fruits = [
  { name: 'apple', color: 'red' }, 
  { name: 'strawberry', color: 'red' }, 
  { name: 'banana', color: 'yellow' }, 
  { name: 'pineapple', color: 'yellow' }, 
  { name: 'grape', color: 'purple' }, 
  { name: 'plum', color: 'purple' }
];

function test(color) {
  // use Array filter to find fruits in color
  return fruits.filter(f => f.color == color);

}
```

- 實現相同結果的方法總是不止一種。我們用相同的例子展示了4。編碼很有趣！

### 5. 對所有/部分標準使用Array.every和Array.some

- 最後一個提示更多的是利用新的（但不是那麼新的）Javascript Array函數來減少代碼行。看下面的代碼，我們想檢查所有水果是否都是紅色的：

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  let isAllRed = true;

  // condition: all fruits must be red
  for (let f of fruits) {
    if (!isAllRed) break;
    isAllRed = (f.color == 'red');
  }

  console.log(isAllRed); // false

}
```

- 代碼太長了！我們可以通過以下方式減少行數`Array.every`：
(every() 方法會測試陣列中的所有元素是否都通過了由給定之函式所實作的測試。)

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  // condition: short way, all fruits must be red
  const isAllRed = fruits.every(f => f.color == 'red');

  console.log(isAllRed); // false

}
```

- 現在更乾淨了嗎？以類似的方式，如果我們想測試任何水果是否為紅色，我們可以用`Array.some`它來實現它。
(some() 方法會測試陣列中是否至少有一個元素通過由給定之函式所實作的測試。)

```javascript
const fruits = [
  { name: 'apple', color: 'red' },
  { name: 'banana', color: 'yellow' },
  { name: 'grape', color: 'purple' }
];

function test() {
  // condition: if any fruit is red
  const isAnyRed = fruits.some(f => f.color == 'red');

  console.log(isAnyRed); // true

}
```

## 出處：

[5 Tips to Write Better Conditionals in JavaScript](https://scotch.io/bar-talk/5-tips-to-write-better-conditionals-in-javascript)