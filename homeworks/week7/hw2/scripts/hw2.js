/* eslint-disable */
// 以 .FAQ 作為事件代理，監聽底下所有 FAQ-block 的 click 事件
document.querySelector('.FAQ').addEventListener('click', function (e) {
  if (!e.target.classList.contains('FAQ-answer')) {
    e.target.querySelector('.FAQ-answer').classList.toggle('hidden-block');
  }
});
