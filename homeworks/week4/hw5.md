## 請以自己的話解釋 API 是什麼

API 是應用程式、裝置之間，方便溝通以及交換資料的管道，但不一定要透過網路才能有 API。例如：使用 USB 與電腦交換資料。

而對於網頁來說，Web API 其實就是基於 http 協定下運作的 API，代表透過網路進行資料交換。例如：使用社群連結註冊登入。

若是以餐廳來比喻 API：

- 我（客戶端）跟服務生（API）點了一碗拉麵：發出 request
- 服務生（API）從出餐口（伺服器端）送餐點給我：拿到 response

由此可之，API 其實就是能夠讓「使用者」與「服務提供者」雙方溝通的介面。

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

HTTP status code 是 HTTP 用「3 位數字代碼」來表示回應狀態，通常以開頭的數字來進行區分：

#### 1xx：訊息（較少見）
#### 2xx：Success 成功
#### 3xx：Redirect 重新導向
- `300 Multiple Choices`（多種選擇）：請求得到一個以上的回應，使用者需從中選一。
#### 4xx：User error 客戶端錯誤
- `403 Forbidden`（禁止）：沒有權限存取此站，伺服器收到請求但拒絕提供服務。
- `405 Method Not Allowed`（方法不被允許）：伺服器理解該請求方法，但該方法被禁止使用。
#### 5xx：Server error 伺服器端錯誤

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://lidemy-eat.com

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
|獲取所有餐廳| GET  | /restaurants  | _limit:限制回傳資料數量 | /restaurant?_limit=6
|獲取單一餐廳| GET  | /restaurants/:id | 無            | /restaurant/12
|刪除餐廳    | DELETE | /restaurants/:id | 無          | 無
|新增餐廳    | POST | /restaurants  | name: 餐廳名稱       | 無
|更改餐廳    | PATCH| /restaurants/:id | name: 餐廳名稱    | 無
