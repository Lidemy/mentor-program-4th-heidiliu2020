<?php
  require_once('conn.php');

  // 以 empty() 判斷值是否為 null
  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: register.php?errCode=1");
    die("資料不齊全"); 
  }
 
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  // sprintf() 裡面可以放入替代字元
  $sql = sprintf(
    "INSERT INTO Heidi_users(nickname, username, password) VALUES('%s', '%s', '%s')",
    $nickname,
    $username,
    $password
  );

  // 把執行結果存在 $result 這個變數中
  $result = $conn->query($sql);
  // 確認是否有拿到結果
  if (!$result) {
    // errno: error number 得到錯誤訊息代號
    $code = $conn->errno;
    // ERROR 1062: Duplicate entry 代表該欄位 key 重複
    if ($code === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($conn->error);
  }

  // 若註冊成功，將頁面導回 index.php
  header("Location: index.php");
?>
