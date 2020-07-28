## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

### `<hr>` 或 `<hr />`：水平分隔線

- 常用於主題轉換。大小寫均可，斜線可加可不加。
- 為空元素，只有一個標記。

```html
我是標題
<hr>
我是段落一
<HR>
我是段落二
```

![hr](https://i.imgur.com/EFy5QbP.png)

### `<sup>` 和 `<sub>`：上標和下標

- 用來將內容上標、下標。
- 為行內元素。

```html
<h3>上標（superscript）：常用來表示日期字尾、次方數</h3>
<p>Today is July 23<sup>rd</sup>.</p>

<h3>下標（subscript）：常用在註解或化學式上</h3>
<p>H<sub>2</sub>O</p>
```

![sup & sub](https://i.imgur.com/SzbbSNA.png)

### `<figure>` 和 `<figcaption>`：圖和圖片說明

- 是 HTML5 專門用來放圖像的標籤。
- `<figure>`：包覆圖片區塊和其說明。
- `<figcaption>`：為圖片加上說明文字。

```html
<figure>
  <img src="https://images.unsplash.com/photo-1528138326811-ec5dd3b594be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="photo" title="tasty break">
  <figcaption>
    Photo by Vita Marija Murenaite on <a href="https://unsplash.com/photos/HyO7jwH4C6g">Unsplash</a>
  </figcaption>
</figure>
```

![figure](https://i.imgur.com/zRRRzrC.png)

---

## 請問什麼是盒模型（box model）

盒模型又稱為區塊模型，意思是所有 HTML 元素均可被視為一個盒子。我們能透過 CSS 控制內距、外距、邊框屬性，來調整盒子的外觀及位置。

![box model](https://i.imgur.com/HzfLkAY.png)

盒模型的組成由外而內分別為：

- margin（外邊距）
- border（邊框）
- padding（內邊距）
- content（內容）

### box-sizing 屬性

透過這個屬性，我們能控制盒模型長寬的計算方式。

以長寬同樣為 150px 的 box 為例：

<iframe height="265" style="width: 100%;" scrolling="no" title="Box Model" src="https://codepen.io/heidiliu2020/embed/GRoeoaO?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/heidiliu2020/pen/GRoeoaO'>Box Model</a> by Heidi-Liu
  (<a href='https://codepen.io/heidiliu2020'>@heidiliu2020</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

我們可以使用 DevTool 看盒模型：

- `box-sizing: content-box`：為預設屬性。「內容」就等於長寬度。

![content-box](https://i.imgur.com/euaGSlb.png)
加上 border 和 padding 會導致元素實際大小比設定值還大。

- `box-sizing: border-box`：「邊框到邊框之間的範圍」等於長寬度。

![border-box](https://i.imgur.com/BdytGoL.png)
此時長寬設定會套用到 border、padding、content。

而 margin 在兩種盒模型都是額外加上去的，並不會影響盒子長寬。

參考資料：
1. [盒模型- Web 开发者指南| MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Boxes)
2. [CSS box model 盒子模型- Wibibi](https://www.wibibi.com/info.php?tid=CSS_box_model_%E7%9B%92%E5%AD%90%E6%A8%A1%E5%9E%8B)
3. [CSS排版基礎觀念（一）—— box-model](https://medium.com/passionred/css%E6%8E%92%E7%89%88%E5%9F%BA%E7%A4%8E%E8%A7%80%E5%BF%B5-%E4%B8%80-box-model-13a9a3dfe84f)

---

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

display 是 CSS 中用於控制排版的屬性。每個 HTML 元素都有一個預設的 display 值，大部分的元素可分為 block（區塊元素）和 inline（行內元素）兩類：

### block：區塊元素

- 元素寬度預設會占滿整行
- 可設定寬高/margin/padding，但會占滿一整行
- 常見區塊元素：div、h1~h6、p、ul、li 等

### inline：行內元素

- 元素可在同一行內呈現
- 無法設定寬高，元素的寬高靠內容物撐開
- 仍可設定上下 margin/padding，但字仍在行內，排版不會隨設定改變
- 常見行內元素：a、span、input、img 等

### inline-block：行內區塊元素

- 以 inline 方式呈現：可水平排列
- 擁有 block 的屬性：可設定元素的寬高/margin/padding

### 以文字排版為例：

<iframe height="265" style="width: 100%;" scrolling="no" title="Box Model" src="https://codepen.io/heidiliu2020/embed/xxZBNPR?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/heidiliu2020/pen/xxZBNPR'>display</a> by Heidi-Liu
  (<a href='https://codepen.io/heidiliu2020'>@heidiliu2020</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

position 屬性可用來指定元素定位方式，以進行版面配置。

### static：正常流向

- 為預設值。在瀏覽器中會依照預設配置，由上而下自動排列

### relative：相對定位

- 以「原本顯示的位置」作為基準，且該元素原本所佔的空間仍會保留（偏離顯示）

### absolute：絕對定位

- 跳脫排版流，不會影響頁面其他元素
- 以「基準元素」左上角為起點，進行絕對位移。基準元素是往上層找的「第一個 position 不是 static 的元素」，才可作為定位點
- 若沒有指定基準元素，預設是以 body 元素（整個視窗）左上角為起點

### fixed：固定定位

- 跳脫排版流。是一種絕對定位，同樣不影響其他元素
- 將元素固定在瀏覽器視窗的相對位置，捲動頁面時仍會在固定位置

### 以文字排版為例：

<iframe height="265" style="width: 100%;" scrolling="no" title="定位元素：relative, absolute, fixed" src="https://codepen.io/heidiliu2020/embed/BajbgEK?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/heidiliu2020/pen/BajbgEK'>定位元素：relative, absolute, fixed</a> by Heidi-Liu
  (<a href='https://codepen.io/heidiliu2020'>@heidiliu2020</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
