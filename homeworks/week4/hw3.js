/* eslint no-unused-vars: 0 */
/* eslint consistent-return: 0 */
const request = require('request');

const process = require('process');

const name = process.argv[2];

request(`https://restcountries.eu/rest/v2/name/${name}`, (error, response, body) => {
  if (error) {
    return console.log('抓取失敗', error);
  }
  let info = '';
  try {
    // 偵測回傳是否成功
    if (response.statusCode >= 200 && response.statusCode < 300) {
      info = JSON.parse(body);

      for (let i = 0; i < info.length; i += 1) {
        console.log('============');
        console.log(`國家：${info[i].name}`);
        console.log(`首都：${info[i].capital}`);
        console.log(`貨幣：${info[i].currencies[0].code}`);
        console.log(`國碼：${info[i].callingCodes}`);
      }
    } else {
      // 回傳成功但找不到對應資料
      console.log('找不到國家資訊');
    }
  } catch (err) {
    // 若 response 不是一個合法的 JSON 字串，會回傳錯誤
    return console.log(err);
  }
});
