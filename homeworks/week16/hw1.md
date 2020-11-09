## hw1：Event Loop

在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

### 輸出結果

```js
1
3
5
2
4
```

### 執行流程

1. 將 `console.log(1)` 放入 Call Stack 並直接執行，印出 1，執行結束後移除
2. 將 `setTimeout(() => { console.log(2) }, 0)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 0，直到倒數結束，將 `() => { console.log(2) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
3. 將 `console.log(3)` 放入 Call Stack 並直接執行，印出 3，執行結束後移除
4. 將 `setTimeout(() => { console.log(4) }, 0)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 0，直到倒數結束，將 `() => { console.log(4) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
5. 將 `console.log(5)` 放入 Call Stack 並直接執行，印出 5，執行結束後移除
6. 當 Event Loop 偵測到 call stack 為空時，依序將 Callback Queue 的任務丟到 Call Stack 執行
7. 執行 `() => { console.log(2) }`，再執行 `console.log(2)`，印出 2，執行結束後移除
8. 接著執行 `() => { console.log(4) }`，再執行 `console.log(4)`，印出 4，執行結束後移除
