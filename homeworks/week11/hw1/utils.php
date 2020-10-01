<?php
  require_once("conn.php");

// 從 username 取得 user 資訊
  function getUserFromUsername($username) {
    // 要在 function 內使用 $conn 要先進行宣告
    global $conn;
    $sql = sprintf( 
      "SELECT * FROM heidi_users WHERE username ='%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // user, id, nickname
  }

  // 應保持使用者輸入的內容，在顯示內容時才進行跳脫，以防 ios/Android 無法辨識
  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
  }

  // 驗證 role 身分 / $action: update, delete, create
  function hasPermission($user, $action, $comment) {
    if($user["role"] === "Admin") {
      return true;
    }

    if($user["role"] === "Normal") {
      if($action === "create") {
        return true;
      }
      return $row["username"] === $user["username"];
    }

    if($user["role"] === "Banned") {
      return $action !== "create";
    }
  }

  // 透過 $user 確認是否為 Admin
  function isAdmin($user) {
    return $user["role"] === "Admin";
  }
?>
