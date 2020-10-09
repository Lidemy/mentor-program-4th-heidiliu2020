<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  // 錯誤處理: 確認資料是否為空值
  if (
    empty($_POST['todo'])
    ) {
    $json = array(
      "ok" => false,
      "message" => "Please input missing field"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];

  $sql = "INSERT INTO heidi_todos(todo) VALUES (?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todo);
  $result = $stmt->execute();
  // 錯誤處理: 確認是否執行成功
  if (!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error     // 通常不會直接顯示錯誤訊息，因為可能包含敏感資訊
    );

    $response = json_encode($json);
    echo $response;
    die();
  }
  // 成功拿到資料
  $json = array(
    "ok" => true,
    "message" => "success",
    "id" => $conn->insert_id
  );
  // 把建立好的 $json 物件，轉成 JSON 字串輸出
  $response = json_encode($json);
  echo $response;
?>
