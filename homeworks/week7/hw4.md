## 什麼是 DOM？

<<<<<<< HEAD
簡言之，DOM 是由「瀏覽器」提供用來和「程式語言」溝通的橋樑。最常被用在網頁與 JavaScript 的溝通。

透過 DOM 提供的 API，我們就能使用 Javascript 來選取 HTML 當中的任何元素，並進行改變結構、樣式、內容等操作。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

DOM 事件傳遞機制分成 3 階段：捕獲階段→傳遞到元素本身→冒泡階段，或稱「先捕獲，再冒泡」。

當我們觸發事件時，會從最上層的根結點開始往下傳遞到 target，也就是「捕獲階段」。接著會再由下往上回傳回去，稱為「冒泡階段」。

第一次聽到這個機制時，覺得很像「回聲」的感覺：先從外部發出訊號，等撞到目標物後，再反彈回到外部。由於傳遞過程中帶著訊號，經過的路徑都會接收到訊息。

## 什麼是 event delegation，為什麼我們需要它？

event delegation 也就是事件代理。

藉由事件傳遞機制，我們可以直接對父元素（事件代理）進行事件監聽，就不需對子元素事件一個一個監聽。如此不只能提高效率，也能處理動態新增的問題。

例如：當我們要新增按紐，若把監聽事件設在子元素，那麼新加入的子元素就必須另外處理。若使用 event delegation，直接父元素進行事件監聽，透過冒泡機制，事件會由父元素傳遞到底下的所有子元素。

=======
## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

## 什麼是 event delegation，為什麼我們需要它？

>>>>>>> b3008a78baa988125fdf9921cac29f029f097067
## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

### event.preventDefault()：阻止事件的預設行為

- 用來阻止瀏覽器上特定元素的預設行為
- 例如：
1. 送出 form 表單：預設行為是送出表單，若在事件監聽加上 `preventDefault()` 就會阻止表單送出。
2. 點擊 a 連結：預設行為是跳轉網址，若加上 `preventDefault()` 就會阻止轉址。

### event.stopPropagation()：阻止事件傳遞

- 事件傳遞會停在設置的地方
- 例如：在 window（最上層）的捕獲階段設置 `event.stopPropagation()`，會阻止後續事件傳遞，造成所有 click 事件均失效。

```javascript
// 監聽 window 捕獲階段的 click 事件，執行函式內指令
window.addEventListener('click', function(e) {
  e.stopPropagation()
}, true)
```
