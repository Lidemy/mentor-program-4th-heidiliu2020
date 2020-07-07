const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

// 讀取到一行，先把這一行加進去 lines 陣列，最後再一起處理
rl.on('line', (line) => {
  lines.push(line);
});

// 判斷質數
function isPrime(n) {
  if (n === 1) {
    return false;
  }
  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

// 前面已宣告過 lines，這裡改用 input 作為參數，拿取內容 lines
function solve(input) {
  const arr = [];
  for (let i = 1; i < input.length; i += 1) {
    arr.push(Number(lines[i]));
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (isPrime(arr[i])) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

// 輸入結束，開始針對 lines 做處理
rl.on('close', () => {
  solve(lines);
});
