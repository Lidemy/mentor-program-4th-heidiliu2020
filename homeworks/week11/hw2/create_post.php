<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  require_once("check_permission.php");
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>陽春部落格 - 發布文章</title>
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
  <div class="container__wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_create_post.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <?php
          if (!empty($_GET['errCode'])) {
            $code = $_GET['errCode'];
            $msg = 'error';
            if ($code === '1') {
              $msg = '資料不齊全';
            }
            echo '<h3 class="error-admin">錯誤：'. $msg . '</h3>';
          }
          ?>
          <div class="edit-post__input-wrapper">
            <input name="title" class="edit-post__input" placeholder="請輸入文章標題" />
          </div>
          <div class="edit-post__input-wrapper">
            <textarea name="content"  rows="20" class="edit-post__content"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
            <input type="submit" class="edit-post__btn" value="送出" />
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>