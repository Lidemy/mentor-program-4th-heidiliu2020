import { getComments, addComments } from './api';
import { appendCommentToDOM, appendStyle } from './utils';
import { cssTemplate, getLoadMoreButton, getForm } from './template';
import $ from 'jquery';

// 初始化: 動態匯入表單
export function init(options) {
  let containerElement = null;
  let commentDOM = null;
  let lastId = null;    // before
  let isEnd = false;    // 確認是否拿完資料

  const { siteKey, apiUrl } = options;
  const loadMoreClassName = `${siteKey}-load-more`;
  const commentsClassName = `${siteKey}-comments`;
  const formClassName = `${siteKey}-add-comment-form`;
  const loadMoreSelector = '.' + loadMoreClassName;
  const commentsSelector = '.' + commentsClassName;
  const formSelector = '.' + formClassName;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName));
  appendStyle(cssTemplate);

  commentDOM = $(commentsSelector);
  getNewComments();

  // 載入更多: 以事件代理的方式處理 click 事件
  $(commentsSelector).on('click', loadMoreSelector, () => {
    getNewComments();
  });

  // 新增留言 ->  將資料存到後端
  $(formSelector).submit(e => {
    e.preventDefault();             // 取消原生行為 -> 不會送出表單
    const nicknameDOM = $(`${formSelector} input[name=nickname]`);
    const contentDOM = $(`${formSelector} textarea[name=content]`);
    const newCommentData = {
      site_key: siteKey,         // 全域變數的 siteKey
      nickname: nicknameDOM.val(),
      content: contentDOM.val()
    }  
    addComments(apiUrl, siteKey, newCommentData, data => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      nicknameDOM.val('');
      contentDOM.val('');
      appendCommentToDOM(commentDOM, newCommentData, true);
    });
  });

  function getNewComments() {
    const commentDOM = $(commentsSelector);
    $(loadMoreSelector).hide();
    if (isEnd) {
      return;
    }
    getComments(apiUrl, siteKey, lastId, data => {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      const comments = data.discussions;
      for (let comment of comments) {
        appendCommentToDOM(commentDOM, comment);
      }

      let length = comments.length;
      if (length < 5) {
        return;
      }
      if (length === 0) {
        isEnd = true;
        $(loadMoreSelector).hide();
      } else {
        lastId = comments[length - 1].id;
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName);
        $(commentsSelector).append(loadMoreButtonHTML);
      }
    });
  }
}
