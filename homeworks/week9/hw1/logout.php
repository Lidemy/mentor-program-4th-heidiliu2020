<?php
  session_start();
  // 直接清除所有 session
  session_destroy();
  header("Location: index.php");
?>
