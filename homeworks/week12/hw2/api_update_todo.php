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
      "message" => "Please input todo!"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $todo = $_POST['todo'];
  $id = $_POST['id'];

  $sql = "UPDATE heidi_todos SET todo=? WHERE id=? ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $todo, $id);
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
  // 成功拿到資料
  $json = array(
    "ok" => true,
    "message" => "update success",
    "id" => $_POST['id']
  );
  // 把建立好的 $json 物件，轉成 JSON 字串輸出
  $response = json_encode($json);
  echo $response;
?>
