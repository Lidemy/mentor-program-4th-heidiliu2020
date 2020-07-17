/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */
const request = require('request');
// 用來拿取 node 輸入指令中的參數
const process = require('process');

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com';
const method = process.argv[2];
const para1 = process.argv[3];
const para2 = process.argv[4];

function listBooks() {
  request.get(`${API_ENDPOINT}/books?_limit=20`, (error, response, body) => {
    // 判斷 status code 是否為 2 開頭：偵測回傳是否成功
    if (response.statusCode >= 200 && response.statusCode < 300) {
      let books = '';
      // try catch：偵測處理資料這個動作是否出現錯誤
      try {
        books = JSON.parse(body);
        // 列出前二十筆資料
        for (let i = 0; i < books.length; i += 1) {
          console.log(`${books[i].id} ${books[i].name}`);
        }
      } catch (err) {
        // 若 response 不是一個合法的 JSON 字串，會回傳錯誤
        return console.log(err);
      }
    }
  });
}

function readBook(id) {
  request.get(`${API_ENDPOINT}/books/${id}`, (error, response, body) => {
    if (error) {
      return console.log('讀取失敗', error);
    }
    const book = JSON.parse(body);
    console.log(`${book.id} ${book.name}`);
  });
}

function deleteBook(id) {
  request.delete(`${API_ENDPOINT}/books/${id}`, (error, response, body) => {
    if (error) {
      return console.log('刪除失敗', error);
    }
    console.log(`成功刪除 id 為 ${id} 的書`);
  });
}

function creatBook(name) {
  request.post({
    url: `${API_ENDPOINT}/books`,
    form: {
      name,
    },
  },
  (error, response, body) => {
    if (error) {
      return console.log('新增失敗', error);
    }
    console.log(`成功新增一本書名為 ${name} 的書`);
  });
}

function updateBook(id, name) {
  request.patch({
    url: `${API_ENDPOINT}/books/${id}`,
    form: {
      name: `${name}`,
    },
  },
  (error, response, body) => {
    if (error) {
      return console.log('更新失敗', error);
    }
    console.log(`成功更新 id 為 ${id} 的書名為 ${name}`);
  });
}

// 判斷使用哪種請求方法
switch (method) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(para1);
    break;
  case 'delete':
    deleteBook(para1);
    break;
  case 'create':
    creatBook(para1);
    break;
  case 'update':
    updateBook(para1, para2);
    break;
  default:
    console.log('Available commands: list, read, delete, create and update');
}
