<!-- 把確認權限功能獨立出來，避免重複寫程式碼 -->
<?php 
  // 必須在登入狀態下，才能進入管理後台
  if (empty($_SESSION['username'])) {
    header("Location: index.php");
    exit;
  }
?>