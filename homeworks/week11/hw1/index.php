<?php
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if (!empty($_GET['page'])) {
    // intval() 將字串轉成數字
    $page = intval($_GET['page']);
  }
  $items_per_page = 5;                      // LIMIT 限制回傳資料筆數
  $offset = ($page - 1) * $items_per_page;   // OFFSET 跳過的資料筆數

  // 在 table 補上別名，避免資料覆蓋，並直接指定要取出的資料
  $sql =  "SELECT ".
            "C.id as id, C.content AS content, ". 
            "C.created_at AS created_at, U.nickname AS nickname, U.username AS username ".
          "FROM heidi_comments AS C ". 
          "LEFT JOIN heidi_users AS U ON C.username = U.username ".
          "WHERE C.is_deleted IS NULL ".
          "ORDER BY C.id DESC ".
          "LIMIT ? OFFSET ? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
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

  <div class="bg">
    <div class="wrapper">
      <main class="board">　
        <div class ="board__header">
          <h1 class="board__tittle">Comments</h1>
          <div class="board__btn-block">
          <?php if (!$username) { ?>
            <a class="board__btn" href="register.php">註冊</a>
            <a class="board__btn" href="login.php">登入</a>
          <?php } else { ?>
            <?php if ($user && $user['role'] === "Admin") {?>
              <a class="board__btn" href="admin.php">後台管理</a>
            <?php } ?>
            <a class="board__btn board__update-nickname" href="#">編輯暱稱</a>
            <a class="board__btn" href="logout.php">登出</a>
          <?php } ?>  
          </div>
        </div>
    
        <?php if ($username) { ?>
          <div class="board__user-block">
            <h4>你好！<?php echo $user['nickname']; ?></h4>
            <form class="hide board__nickname-form board__new-comment-form" method="POST" action="handle_update_user.php">
              <div class="board__nickname">
                <span>編輯暱稱：</span>
                <input type="text" name="nickname">
                <input class="board__submit-btn" type="submit">
              </div>
            </form>
          </div>
        <?php } ?>

        <!-- 後端驗證：資料是否齊全 -->
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
        <?php if ($username && !hasPermission($user, "create", NULL)) { ?>
          <h3>你已被停權</h3>
        <?php } else if ($username) { ?>
        <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
          <textarea name="content" rows="5" placeholder="請輸入留言..."></textarea>
          <input class="board__submit-btn" type="submit">
        </form>
        <?php } else { ?>
          <h3>請登入發布留言</h3>
        <?php } ?>  
      <div class="board__hr"></div>

      <section>
        <?php
          // fetch_assoc()：將讀取的資料 Key 值設定為欄位名稱的陣列
          while($row = $result->fetch_assoc()) {
        ?>
          <div class="card">
            <div class="card__avatar"></div>
            <div class="card__body">
                <div class="card__info">
                  <span class="card__author">
                    <?php echo escape($row['nickname']); ?>
                    (@<?php echo escape($row['username']); ?>)
                  </span>
                  <span class="card__time">
                    <?php echo escape($row['created_at']); ?>
                  </span>
                  <!-- 設定編輯 / 刪除留言權限 -->
                  <?php 
                    if(!empty($username && $row['username'])) { 
                      // 確認是否為 Admin；或使用者 username 和資料庫的一致
                      if(isAdmin($user) || $user['username'] === $row['username']) {
                   ?>
                    <a class="card__btn" href="update_comment.php?id=<?php echo $row['id'] ?>">編輯</a>
                    <a class="card__btn" href="handle_delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a>
                  <?php }} ?>
                </div>
                <p class="card__content"><?php echo escape($row['content']); ?></p>
            </div>
          </div>
          <div class="board__hr"></div>
        <?php } ?>

      </section>

      <?php
        $stmt = $conn->prepare(
          // count(id) 數出有 id 的列有幾個
          "SELECT count(id) AS count FROM heidi_comments WHERE is_deleted IS NULL"
        );
        $result = $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();
        $count =  $row['count'];
        // ceil() 無條件進位
        $total_page = ceil($count / $items_per_page);
      ?>
      <div class="page-info">
        <span>總共 <?php echo $count ?> 筆 - 頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <?php if ($page != 1) { ?>
          <a href="index.php?page=1">首頁</a>
          <a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
        <?php } ?>
        <?php if ($page != $total_page) { ?>
          <a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
          <a href="index.php?page=<?php echo $total_page ?>">最末頁</a>
        <?php } ?>
      </div>
      </main>
    </div>
  </div>

  <script>
    let btn = document.querySelector('.board__update-nickname');
    btn.addEventListener('click', function() {
      let form = document.querySelector('.board__nickname-form');
      form.classList.toggle('hide');
    })
  </script>
</body>
</html>
