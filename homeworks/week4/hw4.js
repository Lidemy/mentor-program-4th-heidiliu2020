/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */
const request = require('request');

// Request header: 把 Client-ID 放在 header
// 或使用 Query-string parameter 把 Client-ID 放在網址 'https://api.twitch.tv/kraken/users/44322889?client_id=XXXXX'
request(
  {
    method: 'GET',
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'c2asy2jt0ridt3bbgigowgrgav3599',
    },
  },
  (error, response, body) => {
    // 判斷 status code 是否為 2 開頭：偵測回傳是否成功
    if (response.statusCode >= 200 && response.statusCode < 300) {
      // try catch：偵測處理資料這個動作是否出現錯誤
      try {
        // 取出 top 資料
        const data = JSON.parse(body).top;
        for (let i = 0; i < data.length; i += 1) {
          // 取出 '觀看人數' '遊戲名稱'
          console.log(`${data[i].viewers} ${data[i].game.name}`);
        }
      } catch (err) {
        // 若 response 不是一個合法的 JSON 字串，會回傳錯誤
        return console.log(error);
      }
    }
  },
);
