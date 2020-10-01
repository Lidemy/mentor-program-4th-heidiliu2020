<?php 
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>陽春部落格 - 登入</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <?php include_once('navbar.php'); ?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>

  <div class="login-wrapper">
    <h2>Log in</h2>
    <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        $msg = 'error';
        if ($code === '1') {
          $msg = '資料不齊全';
        } else if ($code === '2') {
          $msg = '帳號或密碼輸入錯誤！';
        }
        echo '<h3 class="error">錯誤：'. $msg . '</h3>';
      }
    ?>
    <form action="handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="username" />
      </div>
      
      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type="submit" value="登入" />
    </form>
  </div>

  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>
