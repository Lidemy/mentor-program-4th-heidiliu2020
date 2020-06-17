## 交作業流程

### 從 GitHub 複製課綱到本地端

1. 開啟 [GitHuba classroom](https://classroom.github.com/a/SbDvk2VA)，複製課綱模板到自己的帳號底下

![clone-1](https://i.imgur.com/UBpEFxx.png)

2. 在 GitHub 點選 `Clone or download`

![clone-2](https://i.imgur.com/3S4xeqG.png)

3. 輸入 `git clone https://github.com/Lidemy/mentor-program-4th-heidiliu2020.git`，
下載檔案到本地端

![clone-3](https://i.imgur.com/yLDN87s.png)

### 寫作業前，一定要先新增 branch

4. `git branch week1`：建立 branch week1

![git branch week1](https://i.imgur.com/UDU1YvA.png)

5. 開始寫作業
6. 寫完作業後，若有新增檔案，要先使用 `git add .`：加入版本控制
7. `git commit -am "week1 finish"`：進行 commit
8. `git push origin week1`：將檔案上傳到遠端 GitHub
9. 在自己的 GitHub 頁面，提出 PR（pull request）
10. 複製 PR 連結，到 Lidemy 學習系統上繳交作業

![學習系統](https://i.imgur.com/C52SZIQ.png)

### 等助教批改完（由助教點選 Merge pull request）

11. GitHub 會顯示 Merged，代表遠端的分支 week1 已合併回 master
12. 回到本地端，輸入 `git checkout master`：切換到 master
13. `git pull origin master`：將遠端修改過的 master 同步回到本地端
14. `git branch -d week1`：刪除已合併的分支 week1