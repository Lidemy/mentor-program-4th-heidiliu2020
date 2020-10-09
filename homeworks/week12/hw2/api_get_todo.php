<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');

  if (empty($_GET['id'])) {
    $json = array(
      "ok" => false,
      "message" => "Please add id in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  // intval()：轉成數字
  $id = intval($_GET['id']);

  $sql = "SELECT id, todo FROM heidi_todos WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);

  $result = $stmt->execute();
  // 錯誤處理: 確認是否執行成功
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  // 若執行成功就拿取資料
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $json = array(
    "ok" => true,
    "data" => array(
      "id" => $row["id"],
      "todo" => $row["todo"],
    )
  );

  // 把建立好的 $json 物件，轉成 JSON 字串輸出
  $response = json_encode($json);
  echo $response;
?>
