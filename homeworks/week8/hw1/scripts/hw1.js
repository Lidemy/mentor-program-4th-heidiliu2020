/* eslint-disable */
const apiUrl = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';

// 抽獎：拿取 API 資料
function getPrize(callback) {
  const request = new XMLHttpRequest();

  // 要發 request 到哪個地方（true 是非同步，false 是同步）
  request.open('GET', apiUrl, true);

  // 當資料回來時，執行 function
  request.onload = function () {
    // 判斷 request 是否成功
    if (request.status >= 200 && request.status < 400) {
      const response = request.responseText;
      let data;

      // 確認回傳資料是否為 JSON 格式
      try {
        data = JSON.parse(response);
      } catch (err) {
        callback(errorMessage);
        return;
      }

      // 如果回傳資料沒有 prize，則回傳 err
      if (!data.prize) {
        callback(errorMessage);
        return;
      }

      // request 成功就將資料帶回 callback
      callback(null, data);
    } else {
      // 若 request 失敗
      callback(errorMessage);
    }
  };
  // 當 request 有錯誤時，執行 function
  request.onerror = function () {
    callback(errorMessage);
  };
  // 發出 request
  request.send();
}

// 監聽按鈕 click 事件，處理拿到的資料
document.querySelector('.lottery__btn').addEventListener('click', function () {
  getPrize(function (err, data) {
    if (err) {
      alert(err);
      return;
    }

    let className;
    let title;
    switch (data.prize) {
      case 'FIRST': {
        className = 'wrapper_bg-first';
        title = '恭喜你中頭獎了！日本東京來回雙人遊！';
        break;
      }

      case 'SECOND': {
        className = 'wrapper_bg-second';
        title = '二獎！90 吋電視一台！';
        break;
      }

      case 'THIRD': {
        className = 'wrapper_bg-third';
        title = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        break;
      }

      case 'NONE': {
        className = 'wrapper_bg-none';
        title = '銘謝惠顧';
        break;
      }
    }
    document.querySelector('.wrapper').classList.add(className);
    document.querySelector('.lottery__result-tittle').innerText = title;
    document.querySelector('.lottery').classList.add('hidden');
    document.querySelector('.lottery__result').classList.remove('hidden');
  });
});

// 在結果頁面點擊 btn，直接重新整理頁面
document.querySelector('.lottery__result-btn').addEventListener('click', function (e) {
  if (e.target) {
    window.location.reload();
  }
});
