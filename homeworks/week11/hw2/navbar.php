<!-- 把 navbar 獨立出來，就不需每個檔案都重複撰寫 -->
<?php
  $url = $_SERVER['REQUEST_URI'];
  // strpos(): 查找該字串首次出現的位置
  $isAdminPage = (strpos($url, 'admin.php') !== false);
  $isLoginPage = (strpos($url, 'login.php') !== false);
?>

<nav class="navbar">
  <div class="navbar__wrapper">
    <div class="navbar__site-name">
      <a href="index.php">Heidi's Blog</a>
    </div>
    <ul class="navbar__list">
      <div>
        <li><a href="#">文章列表</a></li>
        <li><a href="#">分類專區 </a></li>
        <li><a href="#">關於我</a></li>
      </div>
      <div>
      <!-- 使用 (!empty())：可避免 PHP 存取 undefined 資料會出現的錯誤訊息 -->
      <?php if(!empty($_SESSION['username'])) { ?>
        <!-- 確認是否進入管理後台 -->
        <?php if ($isAdminPage) { ?>
          <li><a href="create_post.php">發布文章</a></li>
        <?php } else { ?> 
          <li><a href="admin.php">管理後台</a></li>
        <?php } ?>
          <li><a href="logout.php">登出</a></li>
      <?php } else { ?>
          <li><a href="register.php">註冊</a></li>
          <li><a href="login.php">登入</a></li>          
      <?php } ?>
      </div>
    </ul>

  </div>
</nav>