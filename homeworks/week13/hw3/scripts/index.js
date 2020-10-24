const url = 'https://api.twitch.tv/kraken';
const accept = 'application/vnd.twitchtv.v5+json';
const clientId = 'c2asy2jt0ridt3bbgigowgrgav3599';

// 先準備好模板
const template = `
        <li class="stream">
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
        </li>
        `;

// 透過 fetch 拿取: 前五名遊戲資訊
function getGames() {
  // 回傳執行完的結果 Promise 給 await
  return fetch(url + '/games/top?limit=5', {
    method: 'GET',
    headers: {
      'Accept': accept,
      'Client-ID': clientId,
    },
  })
    .then(response => response.json())
    .catch(err => console.log('error', err));
}

// 透過 fetch 拿取: 該遊戲實況頻道資訊
function getStreams(name) {
  // 回傳執行完的結果 Promise 給 await
  return fetch(url + '/streams?game=' + encodeURIComponent(name), {
    method: 'GET',
    headers: {
      'Accept': accept,
      'Client-ID': clientId,
    },
  })
    .then(response => response.json())
    .catch(err => console.log('error', err));
}

// 取得遊戲名稱並替換 navbar
function renderGames(games) {
  const topGames = games.top.map((game) => game.game.name);
  for (const game of topGames) {
    const element = document.createElement('li');
    element.innerHTML = game;
    document.querySelector('.twitch__nav-list').appendChild(element);
  }
  return topGames[0];
}

// 更新頻道資訊
function appendStreams(streams) {
  // 將 h1 標題改為該遊戲
  const gameTitle = document.querySelector('h1');
  gameTitle.innerHTML = streams.streams[0].game;
  // 把實況資料一個一個顯示出來
  streams.streams.forEach((stream) => {
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

// 調整結尾排版
function addEmptyBlock() {
  const block = document.createElement('li');
  block.classList.add('stream-empty');
  document.querySelector('.streams__container').appendChild(block);
}

// 切換頻道
async function changeGames(game) {
  document.querySelector('.streams__container').innerHTML = '';
  const streams = await getStreams(game);
  appendStreams(streams);
  addEmptyBlock();
  addEmptyBlock();
}

// 初始化
async function init() {
  const games = await getGames();
  const game = renderGames(games);
  const streams = await getStreams(game);
  appendStreams(streams);
  addEmptyBlock();
  addEmptyBlock();
}

// 當 DOM 載入完成執行初始化 & 監聽點擊事件
document.addEventListener('DOMContentLoaded', () => {
  init();
  // 監聽點擊事件: 切換遊戲選單
  document.querySelector('.twitch__nav-list').addEventListener('click', (e) => {
    const game = e.target.innerHTML;
    changeGames(game);
  });
});
