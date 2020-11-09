## hw2：Event Loop + Scope

請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

### 輸出結果

```js
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```

### 執行流程

1. 將 for 迴圈放入 Call Stack 並開始執行，宣告變數 i = 0，判斷 i 是否小於 5，是，進入第一圈迴圈
2. 將 `console.log('i: ' + 0)` 放入 Call Stack 並直接執行，印出 i: 0
3. 將 `setTimeout(() => { console.log(0) }, 0 * 1000)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 0 ms，直到倒數結束，將 `() => { console.log(0) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
4. 第一圈迴圈結束，將 i + 1
5. i = 1，判斷 i 是否小於 5，是，進入第二圈迴圈
6. 將 `console.log('i: ' + 1)` 放入 Call Stack 並直接執行，印出 i: 1
7. 將 `setTimeout(() => { console.log(i) }, 1 * 1000)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 1000 ms ，直到倒數結束，將 `() => { console.log(i) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
8. 第二圈迴圈結束，將 i + 1
9. i = 2，判斷 i 是否小於 5，是，進入第二圈迴圈
10. 將 `console.log('i: ' + 2)` 放入 Call Stack 並直接執行，印出 i: 2
11. 將 `setTimeout(() => { console.log(i) }, 2 * 1000)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 2000 ms ，直到倒數結束，將 `() => { console.log(i) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
12. 第二圈迴圈結束，將 i + 1
13. i = 3，判斷 i 是否小於 5，是，進入第三圈迴圈
14. 將 `console.log('i: ' + 3)` 放入 Call Stack 並直接執行，印出 i: 3
15. 將 `setTimeout(() => { console.log(i) }, 3 * 1000)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 3000 ms ，直到倒數結束，將 `() => { console.log(i) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
16. 第三圈迴圈結束，將 i + 1
17. i = 4，判斷 i 是否小於 5，是，進入第四圈迴圈
18. 將 `console.log('i: ' + 4)` 放入 Call Stack 並直接執行，印出 i: 4
19. 將 `setTimeout(() => { console.log(i) }, 4 * 1000)` 放入 Call Stack，透過 Web API，在瀏覽器設定計時器為 4000 ms ，直到倒數結束，將 `() => { console.log(i) }` 放到 Callback Queue 等待執行，setTimeout 執行結束後從 Call Stack 移除
20. 第四圈迴圈結束，將 i + 1
21. i = 5，判斷 i 是否小於 5，否，跳出迴圈，執行結束後從 Call Stack 移除
22. 當 Event Loop 偵測到 call stack 為空時，依序將 Callback Queue 的任務丟到 Call Stack 執行
23. 執行第一個 `() => { console.log(i) }`，再執行 `console.log(i)`，在 function 的 EC 中找不到 i，往上一層 EC 找，找到 i = 5，印出 5，執行結束從 Call Stack 移除
24. 執行第二個 `() => { console.log(i) }`，再執行 `console.log(i)`，在 function 的 EC 中找不到 i，往上一層 EC 找，找到 i = 5，印出 5，執行結束從 Call Stack 移除
25. 執行第三個 `() => { console.log(i) }`，再執行 `console.log(i)`，在 function 的 EC 中找不到 i，往上一層 EC 找，找到 i = 5，印出 5，執行結束從 Call Stack 移除
26. 執行第四個 `() => { console.log(i) }`，再執行 `console.log(i)`，在 function 的 EC 中找不到 i，往上一層 EC 找，找到 i = 5，印出 5，執行結束從 Call Stack 移除
27. 執行第五個 `() => { console.log(i) }`，再執行 `console.log(i)`，在 function 的 EC 中找不到 i，往上一層 EC 找，找到 i = 5，印出 5，執行結束從 Call Stack 移除


