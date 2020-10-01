<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: login.php?errCode=1");
    die(); 
  }
 
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "SELECT * FROM heidi_blog_users WHERE username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("s", $username);
  // 確認是否執行成功
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  // 取出執行結果
  $result = $stmt->get_result();
  // 判斷是否查到使用者
  if ($result->num_rows === 0) {
    // 若查無使用者，顯示 "帳號或密碼輸入失敗"
    header("Location: login.php?errCode=2");
    // 注意須加上離開，中斷程式繼續往下執行
    exit();
  }

  // 若有查到使用者，拿出執行結果
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    // 比對成功：儲存 session
    $_SESSION['username'] = $username;
    header("Location: index.php");  
  } else {
    // 比對失敗：顯示錯誤訊息
    header("Location: login.php?errCode=2");
  }
?>
