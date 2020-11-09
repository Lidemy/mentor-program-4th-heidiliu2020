## hw3：Hoisting

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
var a = 1
function fn() {
  console.log(a)    // undefined
  var a = 5
  console.log(a)    // 5
  a++　
  var a
  fn2()
  console.log(a)     // 6
  function fn2() {
    console.log(a)     // 20 
    a = 20
    b = 100
  }
}
fn()
console.log(a)     // 1
a = 10
console.log(a)     // 10
console.log(b)     // 100
```

### 輸出結果

```js
undefined
5
6
20
1
10
100
```

### 執行流程

1. 開始執行程式，建立 global EC 並初始化 VO

```js
global EC
  VO {
    fn: function,
    a: undefined
  }
}
```

2. 執行第一行程式碼，宣告變數 a 並賦值為 1

```js
global EC {
  VO {
    fn: function,
    a: 1
  }
}
```

3. 呼叫 fn()，建立 fn EC 並初始化 AO，變數宣告會提升 `var = a`

```js
fn EC {
  AO {
    fn2: function,
    a: undefined
  }
}
```

4. 進入 function fn 並執行 console.log(a)，找到 fn AO 中 a = undefined，印出 undefined
5. 執行 var a = 5，查看 fn EC 是否有 a，找到 a，將 a 賦值為 5

```js
fn EC {
  AO {
    fn2: function,
    a: 5
  }
}
```

6. 執行 console.log(a)，找到 fn AO 中 a = 5，印出 5
7. 執行 a++，查看 fn EC 是否有 a，將 a 賦值為 6

```js
fn EC {
  AO {
    fn2: function,
    a: 6
  }
}
```

8. 已經宣告過變數 a，忽略 `var a` 
9. 呼叫 fn2()，建立 fn EC 並初始化 AO

```js
fn2 EC {
  AO {
    // 沒有進行任何宣告
  }
}
```

10. 進入 function fn2 並執行 console.log(a)，查看 fn2  AO 沒有找到 a；往上一層 fn AO 找，找到 a = 6，印出 6
11. 執行 a = 20，在 fn2 AO 沒有找到 a；往上一層 fn AO 找，找到 a，並賦值 a 為 20

```js
fn EC {
  AO {
    fn2: function,
    a: 20
  }
}
```

12. 執行 b = 100，在 fn2 AO 沒有找到 b；往上一層 fn AO 找，沒有找到 b；再往上一層 global VO 找，沒有找到 b。因為是在非嚴格模式執行程式碼，會在 global VO 宣告變數 b 並賦值為 100

```js
global EC
  VO {
    fn: function,
    a: 1
    b: 100
  }
}
```

13. function fn2 執行結束，移除 fn2 EC，回到 fn EC 執行其餘程式碼
14. 執行 console.log(a)，找到 fn AO 中 a = 20，印出 20
15. function fn 執行結束，移除 fn EC，回到 global EC 執行其餘程式碼
16. 執行 console.log(a)，找到 global VO 中 a = 1，印出 1
17. 執行 a = 10，查看 global EC 是否有 a，找到 a，將 a 賦值為 10

```js
global EC
  VO {
    fn: function,
    a: 10
    b: 100
  }
}
```

18. 執行 console.log(a)，找到 global VO 中 a = 10，印出 10
19. 執行 console.log(b)，找到 global VO 中 b = 100，印出 100
