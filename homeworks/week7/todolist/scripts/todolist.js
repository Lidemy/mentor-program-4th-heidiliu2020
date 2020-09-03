/* eslint-disable */
// 點擊新增
document.querySelector('.btn-new').addEventListener('click', function () {
  addTodos();
});

// 按 Enter 新增
document.querySelector('.todo__input').addEventListener('keypress', function (e) {
  // Enter 對應鍵盤代碼：13
  if (e.which === 13) {
    addTodos();
  }
});

function addTodos() {
  const inputValue = document.querySelector('.todo__input').value;
  // 檢查輸入欄位是否為空值，trim() 可清除字串前後空白
  if (inputValue.trim().length === 0) return;
  // 新增 todo
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo');
  newTodo.innerHTML = `
    <label class="todo__title">
      <input class="todo__check" type="checkbox">
      <p>${escapeHtml(inputValue)}</p>
    </label>
    <button class="btn-delete"></button>
  `;
  document.querySelector('.todo__list').appendChild(newTodo);
  // 新增成功後，清空輸入欄
  document.querySelector('.todo__input').value = '';
}

// 跳脫：處理特殊字元
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 事件代理：透過上層元素來監聽 click 事件
document.querySelector('.todo__list').addEventListener('click', function (event) {
  const target = event.target;
  // 刪除 todo
  if (target.classList.contains('btn-delete')) {
    target.parentNode.remove();
    return;
  }
  // check / uncheck todo
  if (target.classList.contains('todo__check')) {
    target.parentNode.classList.toggle('todo__done')
  }
});
