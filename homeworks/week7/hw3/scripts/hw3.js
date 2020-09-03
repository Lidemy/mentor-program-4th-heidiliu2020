/* eslint-disable */
document.querySelector('.list__container').addEventListener('click', function (e) {
  // 切換完成 or 未完成
  if (e.target.classList.contains('item-checkbox')) {
    e.target.parentNode.classList.toggle('item-finished');
    e.target.parentNode.querySelector('.item-context').classList.toggle('item-context-finished');
  }
  // 刪除 todo
  if (e.target.classList.contains('btn-deleted')) {
    e.target.parentNode.classList.add('item-deleted');
  }
});

// 新增 todo：監聽鍵盤事件 keypress
document.querySelector('.list__input').addEventListener('keypress', function (e) {
  // Enter 對應鍵盤代碼：13
  if (e.which === 13) {
    addTodos();
  }
});

// 新增 todo：監聽點擊事件 click
document.querySelector('.add-btn').addEventListener('click', function (e) {
  addTodos();
})

function addTodos() {
  const input = document.querySelector('.list__input');
  const inputValue = input.value;
  // 若輸出值為空字串，彈出警告視窗；沒有則輸出 value
  if (inputValue === '') {
    alert('Please write something here!');
  } else {
    const newItem = document.createElement('li');
    newItem.classList.add('list__item');
    newItem.innerHTML = `
        <input class="item-checkbox" type="checkbox">
        <p class="item-context">${escapeHtml(inputValue)}</p>
        <button class="btn-deleted"></button>
      `;

    document.querySelector('.list__container').appendChild(newItem);
  }
  // 輸出完成後清空 input 框
  input.value = '';
}

// 跳脫函式：處理特殊字元
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
