<?php
  session_start();
  // 連線到資料庫
  require_once("conn.php");
  require_once("utils.php");

  // 透過網址以 GET 方法傳送 $id
  $id = $_GET['id'];

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  // 再用拿到的 $id 以 SQL 語法找出該留言
  $stmt = $conn->prepare(
    'SELECT * FROM heidi_comments where id = ?'
  );
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
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
          <h1 class="board__tittle">編輯留言</h1>
          <div class="board__btn-block">
            <a class="board__btn" href="index.php">返回</a>
          </div>
        </div>

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

        <form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
          <!-- 先抓出原本的留言來進行編輯 -->
          <textarea name="content" rows="5" placeholder="請輸入留言..."><?php echo $row['content'] ?>
          </textarea>
          <!-- 利用隱藏的 input 來帶參數 id，讓後端 server 知道要改哪則留言 -->
          <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
          <input class="board__submit-btn" type="submit">
        </form>

      </main>
    </div>
  </div>
</body>
</html>
