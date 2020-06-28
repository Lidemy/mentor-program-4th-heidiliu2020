## 教你朋友 CLI

## Command Line 是什麼？
所謂的 Command Line，就是一種操控電腦的方法。

在這之前，要先提到我們一般習慣使用的電腦操作介面，叫作 GUI（圖形化介面），像是點擊按鍵、拖曳資料夾等等，都屬於視覺化操作。但 CLI（命令列介面）只能透過「純文字」和電腦溝通，以達成指定動作。

### 為什麼非得使用 Command Line 呢？

因為有些情況下只能用 CLI。有些伺服器可能沒有 GUI （例如 database），這種情況就只能使用 CLI 來進行操作。

### 那要怎麼用 Command Line？

我們可以藉由輸入程式碼對電腦下指令，讓電腦來執行我們想要的動作。

## Command Line 指令介紹

> 所謂的「指令」其實也是由程式寫成，我們藉由輸入指令來執行程式。

#### `pwd`（Print Working Directory）：印出目前所在位置

#### `ls`（List）：印出當前位置檔案清單
- `ls-l`：長格式（long），顯示有關檔案的詳細資訊
- `ls-a`：列出所有檔案（包括隱藏檔）

#### `cd`（Change Directory） 切換目前資料夾
- `cd ..`：回到上一層資料夾
- `cd ~`：回到 home 目錄（我的文件）
- `cd /`：回到根目錄
   - 絕對路徑：「一定由根目錄 / 寫起」
`cd /Users/share/data`
   - 相對路徑：「不是由 / 寫起」
`cd test`
-  範例：「若要從 /downloads/test/data 到 /downloads/test/media 底下時」
1. 可以寫 `cd ../media`：先回到上一層，再進入 media 資料夾
2. 也可寫 `cd ~/downloads/test/media`：直接用絕對路徑進入

![cd 語法練習](https://i.imgur.com/emeMG2h.png)

> 小技巧：直接把圖形介面的資料夾拖到 CLI 裡，就會自動輸入那個資料夾的絕對路徑。可節省打字時間。

#### `clear`：清空螢幕

#### `touch`：碰一下
   - 作用 1：touch 現有的檔案，會修改檔案時間成當前時間 
   - 作用 2：若檔案不存在，則會新增檔案 

#### `mkdir`：MaKe DIRectory 新增資料夾
#### `rm`：ReMove 刪除檔案（註：有關刪除指令需慎用）
#### `rmdir`：刪除資料夾
- 也可用 `rm -r` 指令來刪除檔案或資料夾
#### `cp`：CoPy 複製
   - 範例 1. `cp data data_2`：複製出一個 data_2 檔案
   - 範例 2. `cp -r deep deep2`：複製出一個 deep2 資料夾

#### `mv`：MoVe 移動檔案 or 更改檔名
   - 作用 1：當找到該資料夾時，檔案會**移到資料夾裡**
        - 範例：`mv data folder`：將 data 檔案移到 folder 資料夾裡
   - 作用 2：當找不到該資料夾，則會**更改檔案名稱**
        - 範例：`mv data test`：將 data 檔案名稱更改為 test
#### `vim`：進入文字編輯器

可分為普通模式跟編輯模式：

- 按鍵 i：進入編輯模式
- 按鍵 Esc：進入普通模式
- `:q` 退出
- `:wq` 存檔（write）後退出（quit)
- `:q!` 不存檔直接退出

參考資料：

1. [vi 與 vim 的指令整理](http://www.vixual.net/blog/archives/234)、
2. [鳥哥的Linux 私房菜-- 第九章、vim 程式編輯器](http://linux.vbird.org/linux_basic/0310vi.php)

## 更多常用指令

#### `date`：印出當前日期
#### `top`（Table Of Processes）：印出所有Process，可持續偵測程序運作的狀態（按 q 鍵離開）
#### `cat`（CATenate）：查看檔案內容
#### `less`：分頁式印出檔案
#### `grep`：抓取特定關鍵字
#### `echo`：印出字串
#### `|`（pipe）：把前面的輸入「變成」後面的輸出
   - 範例：`cat file.txt  | grep hi `：從印出的 file.txt 內容中，抓取字串 hi 並輸出
#### `>`（redirect）：將輸入或輸出重新導向
   - 範例 1：`date > time.txt`：將 `date` 輸出到 `time.txt`
  　　再輸入 `cat time.txt`，會顯示出 `Sun May 31 20:29:57 UTC 2020`
         
   - 範例 2：`echo "123" > 123.txt`：印出 123 到 123.txt
　1. 若輸入 `echo "456" > 123.txt`：顯示 456，檔案會被全部覆蓋
　2. 若輸入 `echo "456" >> 123.txt`：顯示 123456，兩個 `>` 會新增內容在最後

#### `wget`：下載檔案
   - 範例：輸入 `wget https://www.google.com.tw/`，即可下載 Google 首頁的網頁原始碼（index.html）
 
#### `curl`：送出 request，可用來測試 API

---

## 實戰演練（共六步驟） 

> 目標：用 Command Line 建立一個叫做 wifi 的資料，並且在裡面建立一個叫 afu.js 的檔案。

#### 步驟一、環境架設

要執行 Command Line 指令，必須先根據作業系統安裝 Command Line Tool 架設環境：
1. Windows：git-bash（推薦）、Cmder
2. Mac：iTerm2

完成環境架設後，即可開始輸入 Command Line 指令。

#### 步驟二、輸入 `pwd`：印出目前所在位置
> 小技巧：迷路時可隨時用 `pwd` 檢查當前位置。

![pwd](https://i.imgur.com/JBE4BkC.png)

#### 步驟三、輸入 `mkdir wifi`：建立新資料夾 wifi

#### 步驟四、輸入 `cd wifi`：切換到資料夾 wifi 

![mkdir、cd 指令](https://i.imgur.com/1y0jbcf.png)

#### 步驟五、輸入 `touch afu.js`：新增檔案 afu.js

#### 步驟六、輸入 `ls`：列出當前位置檔案清單，確認有成功新增檔案，完成！
![touch、ls](https://i.imgur.com/9pQtSrA.png)
