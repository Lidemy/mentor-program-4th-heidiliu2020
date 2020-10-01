<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 檢查資料：以 empty() 判斷值是否為 null
  if (empty($_POST['content'])) {
    // 若資料不完全，導回原本頁面並顯示錯誤訊息
    header("Location: index.php?errCode=1");
    die('資料不齊全'); 
  }
 
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $content = $_POST['content'];

  if (!hasPermission($user, "create", NULL)) {
    header("Location: index.php");
    exit;
  }

  // 將原本的字串拼接，改用 '?'
  $sql = "INSERT INTO heidi_comments(username, content)
    VALUES(?, ?)";
  // 使用 prepare() 預處理 $sql，此時只傳送佔位符號 ?
  $stmt = $conn->prepare($sql);
  // 使用 bind_param() 帶入參數：s = string ; i = integer
  $stmt->bind_param('ss', $username, $content);
  // 呼叫 execute 執行 query，此時才會將參數傳送給資料庫
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  // 留言成功後將頁面導回 index.php
  header("Location: index.php");
?>
