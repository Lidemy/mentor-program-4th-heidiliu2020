export const cssTemplate = ' .card {margin-bottom: 10px; } .card-title, .card-text {word-wrap: break-word; white-space: pre-line;} .btn {margin-bottom: 10px; }';

// 加上不同的 classname，避免不同使用者共用 plugin 發生衝突
export function getLoadMoreButton(classname) {
  return `<button class="${classname} load-more btn btn-dark">載入更多</button>`;
}

// UI 介面的模板
export function getForm(formClassName, commentsClassName) {
  return `
  <div>
    <form class=${formClassName}>
      <div class="form-group">
        <label>暱稱</label>
        <input name="nickname" type="text" class="form-control">
      </div>
      <div class="form-group">
        <label>留言內容</label>
        <textarea name="content" class="form-control" rows="3"></textarea>
      </div>
      <button type="submit" class="btn btn-dark">送出</button>
    </form>
    <div class="${commentsClassName}"></div>
  </div>
  <br/ >
  `;
}
