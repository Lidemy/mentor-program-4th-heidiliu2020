<?php
  session_start();
  require_once('conn.php');
  require_once("utils.php");

  if (empty($_POST['nickname']) || empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: register.php?errCode=1");
    die("資料不齊全"); 
  }
 
  $nickname = $_POST['nickname'];
  $username = $_POST['username'];

  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO heidi_users(nickname, username, password) VALUES(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss", $nickname, $username, $password);
  $result = $stmt->execute();
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

  // 若註冊成功，保持登入狀態，並將頁面導回 index.php
  $_SESSION['username'] = $username;
  header("Location: index.php");
?>
