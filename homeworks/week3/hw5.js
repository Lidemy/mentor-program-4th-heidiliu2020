const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

/* eslint-disable */
// 判斷比大小
function compare(a, b, k) {
/* eslint-disable-next-line */
  k = Number(k);

  if (a === b) {
    return 'DRAW';
  }

  // 若比小，就將 a b 互換，注意 k 是字串不能用 ===
  if (k === -1) {
    const temp = a;
    a = b;
    b = temp;
  }

  // 判斷字串長度是否相同
  // 不同：比較字串長度
  if (a.length > b.length) {
    return 'A';
  }
  if (a.length < b.length) {
    return 'B';
  }

  // 相同：從字串最左邊開始比大小
  if (a.length === b.length) {
    for (let j = 0; j < a.length; j += 1) {
      // 若相等，就繼續迴圈比下一位
      if (a[j] === b[j]) {
      /* eslint-disable-next-line */
        continue;
      }
      return a[j] > b[j] ? 'A' : 'B';
    }
  }
}

function solve(input) {
  const n = Number(input[0]);

  // 長度為 512 個位數以內，不可轉成數字比大小
  for (let i = 1; i <= n; i += 1) {
    // 輸出會是陣列 => [1, 2, 1]
    const [a, b, k] = input[i].split(' ');
    console.log(compare(a, b, k));
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
