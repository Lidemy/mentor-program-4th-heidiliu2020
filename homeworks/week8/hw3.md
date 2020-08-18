## 什麼是 Ajax？

Ajax，全名是「Asynchronous JavaScript and XML」，重點是 Asynchronous（非同步）。

是 JavaScript 以「非同步」方式與伺服器交換資料的統稱。使網頁不須換頁，就能即時更新渲染畫面。

## 用 Ajax 與我們用表單送出資料的差別在哪？

用 Ajax 和表單傳送資料的差異，在於如何處理「回傳結果」。

- 表單：是以 html 來傳送資料，當瀏覽器接收到 response 後，頁面就會重新刷新。
- Ajax：當瀏覽器接收 response，會轉傳資料至 JavaScript，進行局部內容的資料抽換，不須換頁就能即時更新頁面。

## JSONP 是什麼？

瀏覽器基於安全性的考量，定義了「同源政策」這項規範。也就是非同源就無法拿到 response。但 JSONP 可以打破這項規範，利用不受同源政策影響的 html 標籤，例如 `<scropt>` 或 `<img>`。

先藉由 `<script src = "要 GET 資料的網域名稱"></script>` 讀取網頁的 JS 資訊，再透過指定的 function 進行輸出，就能夠拿到想要的資料。

## 要如何存取跨網域的 API？

利用「跨來源資源共用（Cross-origin Resource Sharing，CORS）」這項規則，和 JSONP 同樣能讓網頁從別的網域要資料。

只要 Server 端在 response header 加上 `access-control-allow-origin: *`，即使是非同源的網域，也可以從 Server 存取資料。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

1. 透過 Node.js
- 是直接發出 request 到 Server，再直接收到 Server 的 request
- 中間不會受到任何限制

2. 透過瀏覽器
- 透過瀏覽器發出 request 到 Server，再透過瀏覽器接收 Server 的 response
- 中間可能會受瀏覽器處理影響，必須按照瀏覽器的規則獲取資料，也就是上述提到的「同源政策」
