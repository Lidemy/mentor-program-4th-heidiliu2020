/* eslint-disable */
const url = 'https://api.twitch.tv/kraken';
// 先準備好模板
const template = `<li class="stream">
          <img src="$preview" />
          <div class="stream__info">
            <div class="stream__avatar">
              <img src="$logo">
            </div>
            <div class="stream__desc">
              <div class="stream__title">$title</div>
              <div class="stream__channel">$channel</div>
            </div>
          </div>
        </li>`;

// 拿取 API 資料：熱門遊戲資訊
function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', url + '/games/top?limit=5', true);
  // 設定 HTTP 表頭請求（需在 open 之後，send 之前）
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'c2asy2jt0ridt3bbgigowgrgav3599');

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  request.onerror = function () {
    console.log('error');
  };
  request.send();
}

// 拿取 API 資料：實況頻道資訊
function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  // encodeURIComponent：若有特殊符號也會進行編碼，防止出錯
  request.open('GET', url + '/streams?game=' + encodeURIComponent(name), true);

  // 設定 HTTP 表頭請求（需在 open 之後，send 之前）
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'c2asy2jt0ridt3bbgigowgrgav3599');

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };
  request.onerror = function () {
    console.log('error');
  };
  request.send();
}

// 取得前五名的遊戲名稱
getGames((games) => {
  const topGames = games.top.map((game) => game.game.name);
  for (const game of topGames) {
    const element = document.createElement('li');
    element.innerHTML = game;
    document.querySelector('.twitch__nav-list').appendChild(element);
  }
  // 取得遊戲實況資料
  getStreams(topGames[0], (data) => {
    appendStreams(data.streams);
    addEmptyBlock();
    addEmptyBlock();
  });
});

// 監聽點擊事件：切換選單頻道
document.querySelector('.twitch__nav-list').addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const text = e.target.innerText;
    document.querySelector('h1').innerText = text;
    document.querySelector('.streams__container').innerHTML = '';
    getStreams(text, (data) => {
      appendStreams(data.streams);
      addEmptyBlock();
      addEmptyBlock();
    });
  }
});

/* 在結尾放「只有寬度沒有內容」的區塊，即可調整只有 1 or 2 張的排版 */
function addEmptyBlock() {
  const block = document.createElement('li');
  block.classList.add('stream-empty');
  document.querySelector('.streams__container').appendChild(block);
}

function appendStreams(streams) {
  // 載入第一名實況資料時，更改 h1 標題
  const gameTitle = document.querySelector('h1');
  gameTitle.textContent = streams[0].game;
  // 把實況資料一個一個顯示出來
  streams.forEach((stream) => {
    const element = document.createElement('li');
    const content = template
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$title', stream.channel.status)
      .replace('$channel', stream.channel.name);
    document.querySelector('.streams__container').appendChild(element);
    // 取代原本實況頁面的內容
    element.outerHTML = content;
  });
}
