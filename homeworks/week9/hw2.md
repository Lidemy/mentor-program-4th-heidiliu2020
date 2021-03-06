## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

VARCHAR：適合存取較短的資料，可設定長度。通常用於：預期資料有特定長度時較建議使用，因查詢速度較快，且能夠有效減少資料庫文件大小。
TEXT：適合存取較長的資料，不可設定長度。通常用於：留言板、部落格文章。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

1. Cookie 是一種小型純文字檔案，網站伺服器會將其儲存在用戶端，以記錄使用者的相關資訊。例如：會員登入狀態、瀏覽紀錄、購物車等。

2. 由於 HTTP 是一個無狀態協議，會把每一次收到的請求都視為獨立的行為。但伺服器能透過 response header 的 `Set-Cookie` 屬性，將使用者狀態記錄在 Cookie。

3. 瀏覽器會在每次發送請求時，自動在 request header 帶上 Cookie 資料；伺服器即可藉由檢視 Cookie 內容，得知瀏覽器使用者的狀態。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 沒有防範特殊字元
在輸入時會員資料或留言內容時，沒有將特殊字元另外處理（例如：跳脫字元），若使用者以 `<script>` 標籤插入惡意程式碼，可能導致網頁結構被竄改、網站癱瘓、資料庫被竊取等後果。

2. 使用者密碼驗證
在註冊會員時，缺少驗證兩次密碼的機制，或是測試密碼的安全度。自己在測試的時候就手殘打錯字，想說怎麼無法登入，跑到資料庫查看才發現密碼不一樣XD

3. 密碼以明碼存取
由於密碼是以明碼儲存在資料庫，若資料庫被破解入侵，有可能導致會員資料被竊取。
