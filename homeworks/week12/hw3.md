## 請簡單解釋什麼是 Single Page Application

Single Page Application（單頁面應用程式），簡稱 SPA。是前端利用 Ajax 以非同步方式串接後端 API，如此可將前後端分離，在交換資料時不需換頁，可透過動態方式更新部分頁面。

而早期的網頁主要採用 Multiple Page Application（多頁式應用程式）設計，與 SPA 概念相對應，每次交換資料時都需換頁。

## SPA 的優缺點為何

### 優點

1. 增進使用者體驗
不需換頁即可載入新的資訊。例如 Gmail 或影音播放網站，可以在播放音樂的同時，繼續瀏覽網站其他資訊。
2. 前後端分離
後端只需負責制定 API 文件，提供前端資料。前端則利用 Ajax 從後端拿取資料，並以 JavaScript 在 html 動態產生內容。

### 缺點

1. SEO（搜尋引擎最佳化）較差
由於 SPA 是利用 JavaScript 動態產生內容，檢視原始碼會發現原始內容是空的，
解決方法：第一次頁面由 Server side render，之後的操作都改用 Client side render，就可以保證搜尋引擎也能爬到完整的 HTML。
2. 前端工作複雜化
原先是利用不同路由處理不同功能，改成由單一頁面統一管理，就像在網頁上實作 APP。
3. 初次載入頁面費時
初次瀏覽頁面時會需要下載 JavaScript 或是其他頁面的 template。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

### 後端負責提供只輸出資料的 API
- Server 端接收到請求，會回傳 JSON 或其他特定格式的資料給前端，瀏覽器再將資料動態更新至頁面
- 因為是動態產生資料，檢視原始碼會發現動態更新的內容是空的

### PHP 直接輸出內容
- Server 端接收到請求，會將所需資料與頁面經處理後回傳 html 檔給前端，瀏覽器透過重整頁面顯示
- 因此回傳的頁面，檢視原始碼是有包含資料的

參考資料：
- [Day20– 前端小字典三十天【每日一字】– SPA](https://ithelp.ithome.com.tw/articles/10160709)
- [跟著小明一起搞懂技術名詞：MVC、SPA 與 SSR](https://medium.com/@hulitw/introduction-mvc-spa-and-ssr-545c941669e9)
- [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)