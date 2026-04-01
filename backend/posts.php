<?php
require "db.php";
$result = $connection->query("SELECT id, user_id, title, body FROM posts ORDER BY id DESC");
$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}
echo json_encode($posts);
?>
