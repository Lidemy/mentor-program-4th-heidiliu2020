## 請解釋後端與前端的差異。

1. 前端（front-end）
- 處理看得到的部分（客戶端）。
- 將網頁設計稿，用 HTML（網站架構）、CSS（外觀美化）、JavaScript（使用者互動）把網頁呈現在瀏覽器上。

2. 後端（back-end）
- 處理看不到的部分（伺服器端）。
- 編寫應用程序、進行資料庫處理、版本控制工具、和前端互動等。
## 假設我今天去 Google 首頁搜尋框打上：JavaScript 並且按下 Enter，請說出從這一刻開始到我看到搜尋結果為止發生在背後的事情。

```
　　　　Request　　　Request　
　瀏覽器 　→ 　 Server　　→　資料庫
（客戶端） ← （伺服器端） ←
　　　　Response　　Response　
```

1. 瀏覽器問 Google 的 DNS 伺服器（8.8.8.8）：JavaScript 相關資料的 IP 位址怎麼走
2. 假設 DNS 解析回覆 IP 位置為 10.1.1.1
3. 瀏覽器會送出 Request 給 10.1.1.1
4. 位在10.1.1.1 的 Server 收到 Request
5. Server 查詢資料庫，找出要找的關鍵字
6. 資料庫找到了，回傳資料給 Server
7. Server 再 Response 給瀏覽器
8. 瀏覽器解析回傳的資訊，並顯示畫面

## 請列舉出 3 個「課程沒有提到」的 command line 指令並且說明功用

1.  `start`：用來開啟特定檔案、目錄、程式。可直接從命令列開啟圖形介面程式。

- 輸入 `start .`：開啟該目錄
- 輸入 `start note.txt`：開啟檔案 note.txt

2. `head <file>`：只顯示該檔案的前 10 行內容
- `head -n 20 <file>`：顯示該檔案的前 20 行內容
- `head -c 20 <file>`：顯示該檔案最前面 200 Bytes 內容

3. `exit`：離開 Terminal
