/* eslint-disable */
// 偵測表單 submit 事件
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  // 確認有沒有錯誤，預設是 flase 沒有錯誤
  let hasError = false;
  // 儲存結果
  const values = {};

// 若以 appendChild 插入元素的方式，每送出一次表單就會跑出一次訊息，因此不建議用此方法
  // for(let input of inputs) {
  //   if (!input.value) {
  //     const div = document.createElement('div')
  //     div.classList.add('input-block__error')
  //     div.innerText = '請輸入資料'
  //     input.parentNode.appendChild(div)
  // }
  //}

  // 以 required 區塊找出哪些是必填元素，優點是具備擴充性
  const elements = document.querySelectorAll('.required');
  // 使用 for...of 可以直接把陣列的值一個個取出
  for (element of elements) {
    const radios = element.querySelectorAll('input[type=radio]');
    const input = element.querySelector('input[type=text]');
    // 確認有沒有值，預設是 true 有
    let isValid = true;

    if (input) {
      values[input.name] = input.value;
      if (!input.value) {
        isValid = false;
      }
    } else if (radios.length) {
      // array.some() 測試陣列中是否至少有一個元素；radio.checked 確認是否任何一個有打勾
      isValid = [...radios].some(radio => radio.checked);
      if (isValid) {
        const r = element.querySelector('input[type=radio]:checked');
        values[r.name] = r.value;
      }
    } else {
      continue;
    }

    // 確認 input 和 radios 有沒有東西，沒有就把 hide-error 區塊移掉，有就加回去
    if (!isValid) {
      element.classList.remove('hide-error');
      hasError = true;
    } else {
      element.classList.add('hide-error');
    }
  }

  // 有通過的話就跳出 alert 顯示填寫資料
  if (!hasError) {
    // values 是物件
    alert(JSON.stringify(values));
  }
});
