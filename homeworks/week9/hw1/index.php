<?php
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");

  /*
    1. 從 cookie 裡讀取 PHPSESSID (token)
    2. 從檔案裡面讀取 session id 的內容
    3. 放到 $_SESSION
  */
  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  // 以 id 進行 desc（遞減）排序，也就是"後新增的留言"會排在前面
  $result = $conn->query("SELECT * FROM heidi_comments ORDER BY id DESC");
  // 檢查是否有資料
  if (!$result) {
    die('Error:' . $conn->error);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="css/style.css">
  <title>留言板</title>

</head>
<body>
  
  <header class="warning">
    注意！本站為練習用網站，註冊時請勿使用任何真實的帳號或密碼。
  </header>

  <main class="board">　
    <div class ="board__header">
      <div class="border__word-block">
        <h1 class="board__tittle">Comments</h1>
      </div>
      <div class="board__btn-block">
      <?php if (!$username) { ?>
        <a class="board__btn" href="register.php">Sign up</a>
        <a class="board__btn" href="login.php">Log in</a>
      <?php } else { ?>
        <a class="board__btn" href="logout.php">Log out</a>
        <h4>你好！<?php echo $username; ?></h4>
      <?php } ?>  
      </div>
    </div>
 
    <!-- 這是後端驗證；也可使用前端 JS 判斷，在提交表單時進行驗證 -->
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'error';
        if ($code === '1') {
          $msg = '資料不齊全';
        }
        echo '<h3 class="error">錯誤：'. $msg . '</h3>';
      }
    ?>

    <!-- 如果為登入狀態（有username）即可看到表單 -->
    <?php if ($username) { ?>
    <!-- 提交表單後會導向 handle_add_comment.php 來新增留言 -->
    <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
      <textarea name="content" rows="5" placeholder="請輸入留言..."></textarea>
      <input class="board__submit-btn" type="submit">
    </form>
    <?php } else { ?>
      <h3>請登入發布留言</h3>
    <?php } ?>  
  <div class="board__hr"></div>

  <section>
    <!-- 這邊有兩種做法： -->
    <!-- (1) 用 php 包住整個迴圈，但每段 class 都需用 echo 來跑 -->
    <!-- (2) 如下列方法，將 php 和 html 混用，php 只須包住迴圈條件式，較方便撰寫但不易閱讀-->
    <?php
      // fetch_assoc()：將讀取的資料 Key 值設定為欄位名稱的陣列
      while($row = $result->fetch_assoc()) {
    ?>
      <div class="card">
        <div class="card__avatar"></div>
        <div class="card__body">
            <div class="card__info">
              <!-- 將要輸出的資料改為 php echo -->
              <span class="card__author"><?php echo $row['nickname']; ?></span>
              <span class="card__time"><?php echo $row['created_at']; ?></span>
            </div>
            <p class="card__content"><?php echo $row['content']; ?></p>
        </div>
      </div>
      <div class="board__hr"></div>
    <?php } ?>

  </section>
  </main>

</body>
</html>
