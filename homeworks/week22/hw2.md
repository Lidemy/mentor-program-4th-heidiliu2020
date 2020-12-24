# [HW] week22 簡答題

## 請列出 React 內建的所有 hook，並大概講解功能是什麼

1. useState：用來設定 component 的 state

- 第一次 render 時，回傳的 state 值會和 initialState 參數相同
- 可透過 setState 來更新 state，state 一旦改變，就會觸發 React 去重新渲染畫面

```javascript=
const [state, setState] = useState(initialState

setState(newState);
```

2. useEffect：用來告訴 React component 在 render 之後要做的事情

- 第一個參數帶入的 function 會在「畫面渲染完成後」被呼叫
- 第二個參數傳入一個陣列，用來放想要關注的資料，當變數改變時才會呼叫 useEffect

```javascript=
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

3. useContext：解決跨多層傳遞資料的問題，就像建立了全域變數

- 讓父層的資料能夠被底下的任意子層存取，不需要像 props 一層一層傳遞下去，避免造成 Props drilling
- 用 `React.createContext` 建立一個 context 物件，並由 `<MyContext.Provider value={}>` 存取該物件的值，底下的子層就可以直接透過 useContext 來存取 MyContext

```javascript=
const value = useContext(MyContext);
```

4. useReducer：是 useState 的替代方案，當 state 邏輯變得複雜，需要操作多種 state 時可使用

- state：當前的 state 值
- dispatch：透過參數來和 function 溝通，藉此控制處理方式
- reducer： 用來接受一個 `(state, action) => newState`，並回傳當前的 state 和對應的 dispatch 方法
- initState：設定 state 的初始值

```javascript=
const [state, dispatch] = useReducer(reducer, initState);
```

5. useCallback：用來記憶父元件的記憶體位置，避免在重新渲染時被重新分配

- 第一個參數是 function，第二個參數是其依賴陣列，會回傳一個 memoized 的 callback
- 在重新渲染時，只會在依賴改變時才更新，防止不必要的渲染，減少效能上的消耗

```javascript=
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

6. useMemo：用途是當 component 重新渲染時，能避免複雜的程式被重複執行

- 第一個參數是 function，第二個參數是其依賴陣列，會回傳一個 memoized 的值
- 在重新渲染時，傳到 useMemo 的 function 就只會在依賴改變時才執行，將 memoized 更新成回傳的值

```javascript=
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

7. useRef：用來抓取 DOM 節點，存放的值不會受到 render 影響

- 會回傳一個 mutable 的 ref object，其 `.current` 屬性會被初始為傳入的參數 initialValue
- 當 `.current` 屬性有變動時不會觸發重新 render，而每次 render 時都會給同一個 ref object

```javascript=
const refContainer = useRef(initialValue);

console.log(refContainer.current)
// initialValue
```

8. useImperativeHandle：可以在父層調用子層中 ref，選取指定的 DOM 節點

- 第一個參數是接收的 ref
- 第二個參數是傳給父層的方法

```javascript=
useImperativeHandle(ref, createHandle, [deps])
```

9. useLayoutEffect：功能與 useEffect 相似，差別在於 useLayoutEffect 會在 render 之前執行
10. useDebugValue：可用來在 React DevTools 中顯示自訂義 hook 的標籤

```javascript=
useDebugValue(value)
```

---

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

關於 class component 的 lifecycle 架構，可分為三個階段：

- Mounting：當 component 被建立且加入 DOM 時觸發
- Updating：當 prop 或 state 有變化時會產生更新，component 被重新渲染時會觸發
- Upmounting：當 component 從 DOM 中被移除時觸發

![](https://i.imgur.com/CV4MKmC.png)
（參考附圖：[React LifeCycle Methods Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)）

### Mounting

- constructor()：在 component 建立前，進行 props 初始化，並設定初始 state
- static getDerivedStateFromProps()：回傳一個物件來表示要更新的 state，或回傳 null 表示不需要更新
- render：執行第一次渲染
- componentDidMount()：在 component mount 之後執行，適合用來串接 API 來請求資料

### Updating

- static getDerivedStateFromProps()
- shouldComponentUpdate()：在 render 前比較 props 或 state 是否有更新，預設值為 true；若回傳為 false，就會跳過下列三個方法
- componentWillUpdate()：在 render 發生，要更新 props 或 state 之前被呼叫
- render：當 this.props 和 this.state 被改變時，就會執行一次渲染
- componentDidUpdate()：在 component update ，並執行完 render 之後執行

### Upmounting

- componentWillUnmount()：會在 component unmount 之前執行，用來清除 component 中一些綁定的資料

---

## 請問 class component 與 function component 的差別是什麼？

在 React 16.8 之前，需要描述 component 的狀態時需要使用 Class component。有了 Hooks 以後，就能夠在 Function component 引入 Hooks 來表示狀態。

而 class component 與 function component 兩者之間的差別主要在於：

#### class component：關注的是這個「生命週期」要做什麼

- 透過 ES6 語法來實作物件導向的 class component
- 由於 this 指向的關係，state 和 props 會拿到最新的結果，但是會較不易於進行 callback 操作
- 提供許多 lifecycle method 使用，方便管理較複雜的 component 狀態

#### function component：每一次 render，都是「重新」呼叫一次 function，並且會記住「當下」傳入的值

- 透過閉包的形式來管理狀態的 function component
- 把許多 method 都寫在 function 中，自己本身就像是 render function，較容易抽出共同邏輯，或是進行模組化測試
- 生命週期的方法，是以 useEffect 來決定 render 要做的事情

---

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

在 React 中，表單元素的處理可分為 uncontrolled 和 controlled，兩者之間的差別，在於 component 的資料是否受到 React 的控制：

- uncontrolled component 非受控組件
  - 資料不受 React 的控制，例如 input、textarea 等表單元素，通常會維持本身的 state，並根據使用者的輸入來更新該元素的 state
  - 若想取得 uncontrolled component 的值，需透過 useRef 選取 DOM 元素來更新資料
- controlled component 受控組件
  - 資料受到 React 的控制，具有 mutable state 可變屬性
  - 如果將資料的控制權交給 React 來處理，畫面就會根據 state 是否改變來重新渲染
