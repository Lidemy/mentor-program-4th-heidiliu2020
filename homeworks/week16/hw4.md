## hw4：What is this?

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()    // 2
obj2.hello()    // 2
hello()     // undefined
```

### 輸出結果

```js
2
2
undefined
```

### 執行流程

1. `obj.inner.hello()`

可看成 `.call()` 的形式：`obj.inner.hello.call(obj.inner)`，this 會是傳入的參數，也就是 `obj.inner`，因此 `obj.inner.value` 得到的結果是 2。

2. `obj2.hello()`

和上一題相同，可看成 `.call()` 的形式：`obj2.hello.call(obj2)`，this 就會是 `obj2`，又因 `obj2 = obj.inner`，因此結果同樣會是 2。

3. `hello()`

在不需要的地方呼叫 this 時，this 會被指定為全域物件。依照執行環境不同，其值也會改變，例如在瀏覽器執行會是 Window，在 node.js 執行則是會是 Global。
若是在`'use strict';`（嚴格模式）下執行，this 的值會是 undefined。
