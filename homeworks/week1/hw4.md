## 跟你朋友介紹 Git

> 目標：瞭解 Git 的基本概念以及基礎的使用，例如說 add 跟 commit，若是還有時間的話可以連 push 或是 pull 都講。

## 什麼是版本控制？

在談到 Git 之前，先來聊聊什麼是版本控制。

簡言之，就是將一個檔案所有歷史紀錄的版本都保存起來，以便日後參考。我們其實曾接觸過版本控制，例如備份檔案，或是以不同檔名保存編輯過的檔案：

- 笑話大全.txt
- 笑話大全_2.txt
- 笑話大全_最終版.txt
- 笑話大全_真．最終版.txt
- 笑話大全_世界無敵最終版.txt

### 但這種管理方式會碰到哪些問題？

1. 檔案一多、時間久了之後不易管理
2. 多人協作易發生衝突，無法快速分辨檔案差異

### 那麼，該如何做版本控制呢？

以資料夾的概念解釋的話：

1. 需要新版本時：
開一個新資料夾，用來完整保存當時檔案狀態
3. 不想加入版本控制：
就不需加入資料夾，例如有些不會更動的檔案（電腦設定檔、log 檔），或者不需做版控的檔案（例如帳密等有安全性考量）
5. 避免版本號衝突：
會以亂數，也就是絕不會重複的流水號作為資料夾名稱
7. 知道最新版本：
開一個檔案（new）來存最新的版本號
9. 保存歷史紀錄：
開一個檔案（order）整理流水號
 
#### 上述概念，其實就類似 Git 版本控制系統的head <file>                      # 只顯示檔案的前 10 行運作模式。目的是進行備份與共用，讓電腦自動幫我們做一些記錄與管理。

> 補充：GitHub 就是透過 Git 進行版本控制的軟體原始碼代管服務平台。

---

## Git 基本指令操作

我們會使用 CLI 來操作 Git 指令，如果對 Command Line 還不熟悉，可以先參考這篇之前寫的筆記 [Command Line 入門 & 基本指令](https://jtliu.coderbridge.io/2020/06/14/command-line-codediary/)。


 ### `git init`： 初始化當前目錄

 讓 Git 對這個目錄做版本控制。會在當前位置新增 `.git` 隱藏資料夾，可用 `ls -al` 指令查看。

![git init](https://i.imgur.com/SjZrxjK.png)

### `git status`：檢查當前版本狀態

例如：未進入版本控管（Untracked）、新增檔案（New File）、刪除檔案（Deleted）、檔案已修改（Modified）等。是會經常使用的指令。

### `git add`：加入版本控制

把檔案從 Untracked（不加入的檔案）移到 stage（加入版本控制的檔案）。

- `git rm --cached <file>`：取消版控
- `git add <file>`：加入版控
- 若檔案數量太多，可使用 `git add .` 把檔案全部加入版本控制。

![git add 指令](https://i.imgur.com/vX2e43W.png)
 
### `git commit`：新建版本

1. 輸入指令後會進入 vim 介面，就可以編輯提交版本訊息（commit message）
2. 若不想進入 vim，也可輸入 `git commit -m "message"` 直接建立新版本

![git commit 指令](https://i.imgur.com/NlBaU85.png)

### 小技巧：`git commit -am　"message"` 

輸入 `git commit -am "message"` 可一次完成 `add` 和 `commit` 兩個指令動作。

#### 但需注意：

1. `-a` 指令只對「已存在」的檔案有效；不適用於新加入的檔案（Untracked File）
2. 若有新增的檔案，仍須先 `add` 再 `commit` ，才能把新檔加入版控

### `git log`：查看版本紀錄

從新到舊列出，內容分別是版本號碼、提交者、提交時間。

![git log 指令](https://i.imgur.com/gZ9G2c1.png)

- `git log --oneline`：輸出更簡短的 log，只用版本號前七碼代值

![git log --oneline 指令](https://i.imgur.com/V0HyJbP.png)

### `git checkout`：切換版本

切換到某個版本，可查看過去的版本內容。
- `git checkout <版本號碼>` ：切換到指定版本
- `git checkout master` ：切換到最新版本

![git checkout 指令](https://i.imgur.com/hqROiIw.png)

### `.gitignore`：忽略不要版本控制的檔案

`.gitignore` 這個檔案本身也需加入版本控制。通常會加入忽略清單的檔案有：系統檔案、記錄檔、暫存檔等，可參考 [Facebook 開源專案 React 裡的 .gitignore](https://github.com/facebook/react/blob/master/.gitignore) 為例子。

#### 那麼，該如何建立忽略清單呢？

1. 輸入 `touch .gitignore` 建立檔案
2. 輸入 `vim .gitignore` 進入 `vim` 介面
 
![進入vim介面](https://i.imgur.com/dwIzY2m.png)

3. 以不加入版控的 test 為例，輸入完 test 後儲存離開

![建立忽略清單](https://i.imgur.com/WtYtJkL.png)

4. 以 `git status` 查看，可知 test 這個檔案已被 git 忽略

![完成忽略清單](https://i.imgur.com/XUsgqPr.png)

5. 如此即可使用 `git add .` 把所有檔案加入版本控制，包括新舊檔案；
再用 `git commit -m "message"` 建立新版本

## 小結：
複習上述指令，以下為開始使用 git 的流程：
1. `git init`：初始化當前位置，讓 Git 對這個目錄進行版控
2. 建立 `.gitignore` 忽略不需版本控制的檔案
3. `git add .`：把所有檔案加入版本控制（把東西放到一個暫存資料夾 `temp`  ）
4. `git commit -am "message"`：新建一個版本（把 `temp` 資料夾改名為`"版本號"`）
   - 若有新檔案，需重複`步驟 3.` 把所有檔案加進版本控制，才能執行 `commit`
   - 在 commit 之前，可用 `git diff` 查看與上一版的差異
5. `git checkout <版本號>` ： 可以切換各個版本（去到某個資料夾底下）
`git checkout master` ： 回到最新版本

---

## 為什麼需要 Branch（分支）？

簡言之，Branch 的作用就是讓開發過程各自獨立。

上半部分所學的 Git 基本指令，是在同一個 commit 上進行修改，類似一條線的開發模式，但這種模式在遇到 bug 需要修改時，很容易產生衝突。

![一條線開發](https://i.imgur.com/MuDKdgK.png)

若能分成「穩定版本」和「新功能開發」，兩條分支就不會互相干擾。

![兩條線開發](https://i.imgur.com/1S1hWYu.png)

## 操作 branch 基本指令

使用 Git 進行版本控制時，系統最初會自動建立第一個 branch ，也就是 `master`。

![預設分支為 master](https://i.imgur.com/eDZEU1a.png)

### `git branch -v`：查看目前在哪個分支

下列訊息分別表示：分支名稱、版本號、版本訊息。

![git branch -v 指令](https://i.imgur.com/qbjckPW.png)

- `git branch` ：如果後面沒接任何參數，只會顯示目前有哪些分支。

### `git branch <branchName>`：新增分支

> 提醒：開發新功能之前，養成開新分支的好習慣！

![git branch](https://i.imgur.com/r51pPLL.png)

### `git branch -d <branchName>`：刪除分支

![git branch -d 指令](https://i.imgur.com/OHjboYW.png)

### `git checkout <branchName>`：切換分支

[和上一節的切換版本指令](https://hackmd.io/OhBC-x5TRKWF3M5ZQDHBQQ?both#git-checkout)原理相同，這裡是將 `<版本號碼>` 換成 `<分支名稱>`

1. `git checkout <版本名稱>`：切換版本
2. `git checkout <branchName>`：切換分支
3. `git branch checkout -b <branchName>`：「新增」並「切換」到該分支

![git checkout 指令](https://i.imgur.com/oxKtRfm.png)

## 如何合併分支？

### `git merge <branchName>`：把分支合併進來

#### 範例：把分支 `new-feature` 合併到 `master`

1. 輸入 `git checkout master` 切換到 `master` 這個分支
2. 輸入 `git merge new-feature`，完成基本的分支合併
用 `git log` 查看版本紀錄，可知「合併」的過程會自動建立一個新版本

![git merge 指令](https://i.imgur.com/Mj5ABC7.png)

3. 成功合併後，即可刪除分支 `new-feature`

![合併後刪除分支](https://i.imgur.com/YZsSWZT.png)


## 那在合併時發生 conflict（衝突）怎麼辦？

> 所謂的衝突，就是「同一份檔案的兩個版本，裡面有一個或多個不同的內容」。

但是 Git 無法幫你選擇哪一個當作最終版本，所以當發生衝突時，只能「自己手動調整」。

#### 範例：在 `master` 和 `new-feature` 這兩條支線上，均改了同一個檔案 `code.js`

1. 此時若把分支 `new-feature` 合併到 `master` 上
2. 顯示發生衝突，輸入 `git status` 可見提示說明：該檔案的兩個版本均有修改

![conflict](https://i.imgur.com/G9ijEnc.png)

3. 進入該檔案會顯示衝突位置如下，需手動調整檔案內容

![conflict 手動調整](https://i.imgur.com/dGMmn2L.png)

![調整完成](https://i.imgur.com/nCAxx1Q.png)

4. 修改完後重新 commit，成功解決衝突

![conflict 解決](https://i.imgur.com/c3QKwyH.png)

---

## 如何共同開發專案？

熟悉 Git 的基本操作後，來談談最一開始提到的多人協作。這些被版本控制的專案，我們稱為「Repository（檔案庫）」，多人協作就是共享同一份 Repository 來完成共同開發。

## Git vs GitHub

Git 是用來版本控制的程式。

GitHub 是目前全球最大的 Git Server，有許多開放原始碼的專案都是使用 Github 進行程式碼的管理。可以想成「提供存放使用 Git 專案倉庫（Repository) 的服務」。也可以不用 GitHub 選擇其他服務，或是自己架一個 Git Sever。

### GitHub：視覺化的 repository

透過 GitHub 的 GUI 介面能夠視覺化 repository，如此就可以在 repository 頁面查看該專案的 Commit 紀錄、檔案修改的歷史紀錄、修改者是誰等資訊，也可在 GitHub 執行 pull request 來進行合併。

### 建立新專案

![建立新專案](https://i.imgur.com/pl31b7Q.png)

## 將本地端資料推上遠端 GitHub（Local→Remote）

建立好新專案後，可分兩種方式開始專案：
1. 開始全新專案，再同步到 GitHub
2. 已存在專案，將本地端的現存專案同步到 GitHub

![上傳本地專案到 GitHub](https://i.imgur.com/Yc8mymH.png)

#### `git remote`：主要是跟遠端有關的操作

- `git remote add origin https://github.com/heidiliu2020/git101_test.git`
代表加入遠端節點。也就是「為本地端檔案庫增加一個叫做 origin 的遠端檔案庫」。
- 這裡的 `origin` 是遠端檔案庫的代名詞，代表後面那串 GitHub 伺服器位置。如果從 Server 上 clone 下來，origin 是預設的遠端節點名稱。

#### `git push`：把本地資料同步到遠端

- `git push -u origin <branchName> `：將本地端分支資料推到遠端分支
- `git push -u origin master`：將本地端檔案庫推到遠端檔案庫的 master 分支

## 將遠端資料拉回本地端（Remote→Local）

#### `git pull`：把遠端資料同步到本地端

- `git pull origin <branchName> `：將遠端分支資料拉回並合併本地端分支

## 從 GitHub Repository 複製專案

上面介紹的 Push 及 Pull 均使用於本地端現有的專案。

### `git clone`：從 GitHub 下載 Repository 到本地端

1. 在 GitHub 點選 `Clone or download`，可直接下載檔案

![GitHub 點選 Clone](https://i.imgur.com/0yJIEim.png)

2. 或是複製網址，到 Terminal 輸入 `git clone <網址>`：可將內容下載到本地端

![git clone](https://i.imgur.com/uiF2oX7.png)

> 但要注意使用 Clone 的 Repository 沒有權限修改，也就無法再 push 回遠端。

### `Fork`：將別人的 Repository 複製一份成為自己的 Repository

1. 到想要複製的 Repository 頁面，點選 `Fork`

![點選 fork](https://i.imgur.com/Ms7FVgQ.png)

2. 即可複製一份 Repository 到自己的帳號底下

![fork 專案](https://i.imgur.com/QKdoaYU.png)

3. 把專案 clone 到本地端，開新的 branch 進行修改
4. Push 回自己的專案
5. 若為多人協作，可在自己的頁面提出 PR（pull request）給原作
6. 若原作同意修改內容，就會在他的頁面按下「Merge pull request」合併 commit

---

### GitHub Flow

GitHub 建議管理專案的流程：[官網說明](https://guides.github.com/introduction/flow/ )

當參與多人開發時：（圖片出自 [arccwiki](https://arccwiki.uwyo.edu/index.php/Git_Workflow)）

![GitHub Flow step ](https://i.imgur.com/p0VjqBQ.png)

1. 先 Fork 專案到自己的 repository，開新的 branch 進行開發
2. 修改內容後 commit 新增版本，再 push 回自己的 repository
3. pull request 到原本專案的 repository 請求合併
4. 在上面進行討論，等待對方的 code review
5. 在合併前進行最終測試
6. 合併成功，刪掉 branch

---

## 實戰演練

> 假設今天蔡哥已經建立好本地端和遠端的 resposity，那要如何進行往後的更新呢？

1. 新建一個 branch：`git branch joke_1`
2. 切換到該 branch：`git checkout joke_1`
3. 編輯檔案`笑話大全.txt`
4. 完成後，若有新增檔案，可使用 `git add .` 把檔案加入版本控制
5. 進行 commit：`git commit -am “new joke”`
6. push 本地端分支回遠端 GitHub：`git push origin joke_1`
7. 到 Github 查看 branch 頁面，提出 PR（pull request）
8. 點選 Merge pull request 完成合併到遠端 master，即可刪除分支 joke_1
9. 把 GitHub 更新的 master 同步到本地端：`git push origin master`
10. 回到本地端，使用 `git branch -d joke_1` 刪除已合併的分支，結束！
