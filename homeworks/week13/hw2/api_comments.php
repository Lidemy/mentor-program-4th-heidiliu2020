<?php
  require_once('conn.php');
  // 讓瀏覽器知道回覆的資料是 JSON 格式
  header('Content-Type: application/json; charset=utf-8');
  // 跨網域存取時 header 需帶上，右側參數代表哪些 origin 可存取資料
  header('Access-Control-Allow-Origin: *');

  // 用 site_key 來區分不同的留言版
  if (
    empty($_GET['site_key'])
    ) {
    $json = array(
      "ok" => false,
      "message" => "Please add site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];

  // 載入更多: 指定 id 來拿前 5 筆資料
  $sql = 
    "SELECT id, nickname, content, created_at FROM heidi_discussions WHERE site_key = ? " . 
    (empty($_GET['before']) ? "" : "and id < ?") .
    " ORDER BY id DESC LIMIT 5 ";
  $stmt = $conn->prepare($sql);
  if (empty($_GET['before'])) {
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }

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
  $discussions = array();
  while($row = $result->fetch_assoc()) {
    array_push($discussions, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"]
    ));
  }

  $json = array(
    "ok" => true,
    "discussions" => $discussions
  );
  // 把建立好的 $json 物件，轉成 JSON 字串輸出
  $response = json_encode($json);
  echo $response;
?>
