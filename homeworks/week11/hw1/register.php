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

  <div class="wrapper">
    <main class="board">
      <div class ="board__header">
        <h1 class="board__tittle">Sign up</h1>
        <div class="board__btn-block">
          <a class="board__btn" href="index.php">返回</a>
          <a class="board__btn" href="login.php">登入</a>
        </div>
      </div>
  
      <!-- 後端驗證 -->
      <?php
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'error';
          if ($code === '1') {
            $msg = '資料不齊全';
          } else if ($code === '2') {
            $msg = '帳號已被註冊！';
          }
          echo '<h3 class="error">錯誤：'. $msg . '</h3>';
        }
      ?>
    
      <form class="board__new-comment-form" method="POST" action="handle_register.php">
        <div class="board__nickname">
          <span>暱稱：</span>
          <input type="text" name="nickname">
        </div>
        <div class="board__nickname">
          <span>帳號：</span>
          <input type="text" name="username">
        </div>
          <div class="board__nickname">
          <span>密碼：</span>
          <input type="password" name="password">
        </div>
        <input class="board__submit-btn" type="submit">
      </form>
    </main>
  </div>

</body>
</html>
