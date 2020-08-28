<?php
  session_start();
  require_once('conn.php');
  require_once("utils.php");

  // 以 empty() 判斷值是否為 null
  if (empty($_POST['username']) || empty($_POST['password'])) {
    header("Location: login.php?errCode=1");
    die(); 
  }
 
  $username = $_POST['username'];
  $password = $_POST['password'];

  // sprintf() 裡面可以放入替代字元
  $sql = sprintf(
    "SELECT * FROM Heidi_users WHERE username='%s' AND password='%s'",
    $username,
    $password
  );

  // 把執行結果存在 $result 這個變數中
  $result = $conn->query($sql);
  // 確認是否有拿到結果
  if (!$result) {
    die($conn->error);
  }

  // 若成功比對資料，回傳值會是 1
  if ($result->num_rows) {
    // 登入成功，會進行下列三件事：
    /* 
      1. 產生 sesseion id (token) 
      2. 把 username 寫入檔案
      3. set-cookie: session-id
    */
    $_SESSION['username'] = $username;
    header("Location: index.php");  
  } else {
    // 資料輸入錯誤，導回原先頁面並顯示錯誤訊息
    header("Location: login.php?errCode=2");
  }
?>
