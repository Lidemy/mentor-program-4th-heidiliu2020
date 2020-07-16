/* eslint consistent-return: 0 */
const request = require('request');

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com';

request(`${API_ENDPOINT}/books?_limit=10`, (error, response, body) => {
  // 判斷 status code 是否為 2 開頭：偵測回傳是否成功
  if (response.statusCode >= 200 && response.statusCode < 300) {
    let books = '';
    // try catch：偵測處理資料這個動作是否出現錯誤
    try {
      books = JSON.parse(body);
      // 列出前十筆資料
      for (let i = 0; i < books.length; i += 1) {
        console.log(`${books[i].id} ${books[i].name}`);
      }
    } catch (err) {
      // 若 response 不是一個合法的 JSON 字串，會回傳錯誤
      return console.log(err);
    }
  }
});
