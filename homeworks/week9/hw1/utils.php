<?php
  // 用來放能共用的 function
  require_once("conn.php");

  // 隨機產生 16 位數的 token，可直接使用 PHP 內建 SESSION 機制
  // function generateToken() {
  //   $s = '';
  //   for($i=1; $i<=16; $i++) {
  //     $s .= chr(rand(65,90));
  //   }
  //   return $s;
  // }

  function getUserFromUsername($username) {
    // 要在 function 內使用 $conn 要先進行宣告
    global $conn;
    $sql = sprintf( 
      "SELECT * FROM Heidi_users WHERE username ='%s'",
      $username
    );
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row; // user, id, nickname
  }
?>
