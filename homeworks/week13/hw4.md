## Webpack 是做什麼用的？可以不用它嗎？

#### 什麼是 Webpack？

Webpack　是一套模組整合工具。可將零散的 JavaScript 模組打包，然後在瀏覽器上運行，解決舊瀏覽器不支援部分新語法的問題，也利於後續管理與維護。

此外，Webpack 也提供了前端開發缺乏的模組化開發方式，可將各種靜態資源視為模組，例如 JS、CSS、SASS、圖片檔等，透過不同的 loader 將資源轉換並載入，再利用 Webpack 進行打包成 JS 檔。

#### 若不使用 Webpack，可能會遇到下列問題：

1. 瀏覽器支援度：由於部分瀏覽器不支援 ES6 模組，例如 IE，若要使用 import、export 等語法，則需要其他工具來進行轉換
2. 不易引用套件：若想要引用他人撰寫的 library 套件，需考慮相容性問題，以及可能造成命名衝突

## gulp 跟 Webpack 有什麼不一樣？

#### gulp

- 是一套任務管理工具（task manager）
- 目的：提供自動化與流程管理，整合前端開發環境，藉由簡化工作量，可讓開發者將重點放在功能的開發上
- 功能：提供自訂任務流程，例如 babel、scss、壓縮、重新整理、校正時間等

#### Webpack

- 是一套模組整合工具（module bundler）
- 目的：利用模組化的概念，將各種資源打包成能在瀏覽器上執行的程式碼

由此可知，兩者目標其實並不相同，但是均能夠達到部分功能，因此容易被混淆，例如：

1. 使用 Babel 將 ES6 編譯成 ES5 語法
2. 將 SASS 檔編譯成 CSS 檔
3. 壓縮 CSS, JS, 圖檔等

簡言之，gulp 是用來管理任務，建構自動化流程的工具；而 Webpack 則是將資源打包，提供模組化開發方式。

## CSS Selector 權重的計算方式為何？

當選擇器作用在同一元素上時：

- 兩個權重不同：權重值高的規則生效
- 兩個權重相同：後面覆蓋前面

權重由高到低如下：

```
!important > inline style > id > class > tag > *
```

各類選擇器：

- !important：權重最高，但在實際開發過程，幾乎不會使用 !important 來覆蓋其他規則
- inline style 行內樣式
  - 權重為 1-0-0-0
- id 選擇器（`#`）
  - 權重為 0-1-0-0
- class 類別選擇器、pseudo class 偽類選擇器、attribute 屬性選擇器
  - 權重為 0-0-1-0
- tag 標籤選擇器、pseudo elements 偽元素選擇器
  - 權重為 0-0-0-1
- 萬用選擇器（`*`）：選擇所有元素
  - 預設為 0-0-0-0

參考資料：

1. [強烈推薦收藏好物 – CSS Specificity (CSS 權重一覽)](https://muki.tw/tech/css-specificity-document/)
2. [你對 CSS 權重真的足夠了解嗎？](https://juejin.im/post/5afa98bf51882542c832e5ec)
