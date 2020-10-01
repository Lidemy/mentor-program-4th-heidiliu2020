<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id']) || empty($_POST['role'])) {
    die('資料不齊全'); 
  }

  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $id = $_GET['id'];
  $selected_role = $_POST['role'];

  // 驗證身分是否為管理者
  if (!isAdmin($user)) {
    header("Location: index.php");
    exit();
  }

  $sql = "UPDATE heidi_users SET role=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $selected_role, $id);
  
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>
