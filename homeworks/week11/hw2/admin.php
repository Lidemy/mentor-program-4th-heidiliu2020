<?php 
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");
  require_once("check_permission.php");
 
  // 從 posts 資料庫讀取資料
  $sql =  "SELECT ".
            "P.id as id, P.content AS content, P.title AS title, ". 
            "P.created_at AS created_at, U.nickname AS nickname, U.username AS username ".
          "FROM heidi_blog_posts AS P ". 
          "LEFT JOIN heidi_blog_users AS U ON P.username = U.username ".
          "WHERE P.is_deleted = 0 ".
          "ORDER BY P.id DESC";
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

  <title>陽春部落格 - 管理後台</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/style.css" />
</head>

<body>
  <?php include_once('navbar.php')?>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container__wrapper">
    <div class="container">
      <div class="admin-posts">
        <!-- 將執行結果存取到陣列 $row -->
        <?php
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="admin-post">
            <div class="admin-post__title">
                <?php echo escape($row['title']); ?>
            </div>
            <div class="admin-post__info">
              <div class="admin-post__created-at">
                <?php echo escape($row['created_at']); ?>
              </div>
              <a class="admin-post__btn" href="update_post.php?id=<?php echo escape($row['id']); ?>">
                編輯
              </a>
              <a class="admin-post__btn" href="handle_delete_post.php?id=<?php echo escape($row['id']); ?>">
                刪除
              </a>
            </div>
          </div>
        <?php } ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>
