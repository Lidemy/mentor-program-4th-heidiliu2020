export function escape(toOutput) {
  return toOutput
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 渲染 comment: 處理讀取的資料 & 決定加在最前面或最後面
export function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${escape(comment.nickname)}</h5>
      <p class="card-text">${escape(comment.content)}
      </p>
    </div>
    </div>
  `;
  if (isPrepend) {
    container.prepend(html);  // 新增到最上方
  } else {
    container.append(html);   // 新增到最底部
  }
}

// 動態新增 css 樣式
export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.head.appendChild(styleElement);
}
