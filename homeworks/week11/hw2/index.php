<?php
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");

  // 從 posts 資料庫讀取資料
  $sql =  "SELECT ".
            "P.id as id, P.content AS content, P.title AS title, ". 
            "P.created_at AS created_at, U.nickname AS nickname, U.username AS username ".
          "FROM heidi_blog_posts AS P ". 
          "LEFT JOIN heidi_blog_users AS U ON P.username = U.username ".
          "WHERE P.is_deleted = 0 ".
          "ORDER BY id DESC";
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>陽春部落格</title>
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
    <div class="posts">
      <?php while($row = $result->fetch_assoc()) { ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($row['title']); ?></div>
            <div class="post__actions">
              <?php if(!empty($_SESSION['username'])) {?>
              <a class="post__action" href="update_post.php?id=<?php echo escape($row['id']); ?>">編輯</a>
              <?php } ?>
            </div>
          </div>
          <div class="post__info">
            <?php echo escape($row['created_at']); ?>
          </div>
          <!-- mb_substr(): 取得部分字串，參數分別代表 (字串, 開始位置, 擷取字串長度, 編碼) -->
          <div class="post__content">
            <?php echo mb_substr(escape($row['content']), 0, 200, "UTF-8") . "..."; ?>
          </div>
          <a class="btn-read-more" href="post.php?id=<?php echo escape($row['id'])?>">READ MORE</a>
        </article>
      <?php } ?>
    </div>
  </div>

  <footer>Copyright © 2020 Heidi's Blog All Rights Reserved.</footer>
</body>
</html>