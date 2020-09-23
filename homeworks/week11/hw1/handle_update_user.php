<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 以 empty() 判斷是否有 nickname
  if (empty($_POST['nickname'])) {
    header("Location: index.php?errCode=1");
    die('資料不齊全'); 
  }
 
  $username = $_SESSION['username'];
  $nickname = $_POST['nickname'];

  $sql = "UPDATE heidi_users SET nickname=? WHERE username=?";
  // 使用 prepare() 預處理 $sql，此時只傳送佔位符號 ?
  $stmt = $conn->prepare($sql);
  // 使用 bind_param() 帶入參數：s = string ; i = integer
  $stmt->bind_param('ss', $nickname, $username);
  // 呼叫 execute 執行 query，此時才會將參數傳送給資料庫
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  // 留言成功後將頁面導回 index.php
  header("Location: index.php");
?>
