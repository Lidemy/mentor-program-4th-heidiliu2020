<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  // 權限檢查
  if ($user === NULL || $user['role'] !== "Admin") {
    header("Location: index.php");
    exit;
  }

  $stmt = $conn->prepare(
    "SELECT id, role, nickname, username FROM heidi_users ORDER BY id ASC"
  );
  $result = $stmt->execute();
  if (!$result) {
    die('Error:' . $conn->error);
  }
  $result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="css/style.css">
  <title>後台管理</title>

</head>
<body>

  <header class="warning">
    注意！本站為練習用網站，註冊時請勿使用任何真實的帳號或密碼。
  </header>

  <div class="bg">
    <div class="wrapper">
      <main class="board admin-page">　
        <div class ="board__header">
          <h1 class="board__tittle">後台管理</h1>
          <div class="board__btn-block">
            <a class="board__btn" href="index.php">返回</a>  
          </div>
        </div>
        <section>
          <table class="admin__table"> 
            <tr>
              <th>id</th>
              <th>nickname</th>
              <th>username</th>
              <th>role</th>
            </tr>
          <?php
            // 讀取資料庫資料
            while($row = $result->fetch_assoc()) {
          ?>
            <tr>
              <td><?php echo escape($row['id']); ?></td>
              <td><?php echo escape($row['nickname']); ?></td>
              <td><?php echo escape($row['username']); ?></td>
              <td>
                <?php
                if ($row["role"] === "Admin") {
                  echo "管理員";
                } else if ($row["role"] === "Normal") {
                  echo "一般會員";
                } else {
                  echo "已停權會員";
                }
                ?>

                <form class="admin__table-select" method="POST" action="handle_update_role.php?id=<?php echo escape($row['id']) ?>">
                  <!-- select / option 下拉式選單 -->
                  <select name="role">
                    <!-- option 預設選項；不能被點選；不會出現在下拉框中 -->
                    <option selected disabled hidden >選擇身分</option>
                    <option value="Admin">管理員</option>
                    <option value="Normal">一般會員</option>
                    <option value="Banned">已停權會員</option>
                  </select>
                  <input type="submit" value="提交" class="table-select__btn">
                </form>
              </td>
            </tr>
          <?php } ?>
          </table>
        </section>

      </main>
    </div>
  </div>

</body>
</html>
