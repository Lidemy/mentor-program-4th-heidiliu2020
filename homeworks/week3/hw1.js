const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

function printStar(n) {
  let s = '';
  for (let i = 1; i <= n; i += 1) {
    s += '*';
  }
  console.log(s);
}

// 前面已宣告過 lines，這裡改用 input 作為參數，拿取內容 lines
function solve(input) {
  const N = Number(input[0]);
  for (let i = 1; i <= N; i += 1) {
    printStar(i);
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
