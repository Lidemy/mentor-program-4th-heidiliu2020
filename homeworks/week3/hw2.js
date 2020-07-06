const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

// 回傳數字幾位數
function digitsCount(n) {
  if (n === 0) return 1;
  let result = 0;
  while (n !== 0) {
  /* eslint-disable-next-line */
    n = Math.floor(n / 10);
    result += 1;
  }
  return result;
}

// 判斷是否為水仙花數
function isNarcissistic(n) {
  // 幾位數，宣告一個 m = n 來進行運算
  let m = n;
  const digits = digitsCount(m);
  let sum = 0;

  while (m !== 0) {
    // 對 10 取餘數 => 取最後一個數
    const num = m % 10;
    // 可改成 Math.pow(num, digits) => num 的 digits 次方
    sum += num ** digits;
    m = Math.floor(m / 10);
  }

  return sum === n;
}

// 前面已宣告過 lines，這裡改用 input 作為參數，拿取內容 lines
function solve(input) {
  // 輸入 5 200 => ['5', '200']
  const temp = input[0].split(' ');
  const n = Number(temp[0]);
  const m = Number(temp[1]);
  for (let i = n; i <= m; i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
