<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  // 以 empty() 判斷值是否為 null
  if (empty($_POST['content'])) {
    // 若資料不完全，導回原本頁面並顯示錯誤訊息
    header("Location: index.php?errCode=1");
    die('資料不齊全'); 
  }
 
  $user = getUserFromUsername($_SESSION['username']);
  $nickname = $user['nickname'];

  $content = $_POST['content'];

  // sprintf() 裡面可以放入替代字元
  $sql = sprintf(
    "INSERT INTO Heidi_comments(nickname, content) VALUES('%s', '%s')",
    $nickname,
    $content
  );

  // 把執行結果存在 $result 這個變數中
  $result = $conn->query($sql);
  // 確認是否有拿到結果
  if (!$result) {
    die($conn->error);
  }

  // 留言成功後將頁面導回 index.php
  header("Location: index.php");
?>
