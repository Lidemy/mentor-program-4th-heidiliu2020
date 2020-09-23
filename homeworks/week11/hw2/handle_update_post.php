<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');
  require_once("check_permission.php");
  // 帶入上一頁網址
  $page = $_POST['page'];

  if (
    empty($_POST['id']) ||
    empty($_POST['content']) ||
    empty($_POST['title'])
  ) {
    // 導回上一頁
    header("Location: " . $page);
    die(); 
  }
 
  $id = $_POST['id'];
  $content = $_POST['content'];
  $title = $_POST['title'];

  $sql = "UPDATE heidi_blog_posts SET title=?, content=? WHERE id=?";

  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssi', $title, $content, $id);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: " . $page);
?>
