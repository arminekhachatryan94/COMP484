<?php
session_start();

$conn = "mysql:host=localhost;dbname=immersive_db";
try {
    $db = new PDO($conn, "root", "root", [
        PDO::ATTR_PERSISTENT => true
    ]); // use the proper root credentials
    //echo "connected to database";
}
catch(PDOException $e) {
    echo "not connected to database";
    die("Could not connect: " . $e->getMessage());
}

$user_id = $_POST["user_id"];
$product_id = $_POST["product_id"];
$order_id = $_POST["order_id"];

// get pending orders
$list1 = $db->prepare("UPDATE `tsarbucks`.`orders` SET completed = 1 WHERE completed = 0 AND user_id=" . $user_id . " AND order_id=" . $order_id . " AND product_id=" . $product_id );
if($list1->execute([1,0])) {
    // fetch all matching records and dump them to the screen
    echo "The price has gone up on a small... typical";    //print_r($_SESSION["menu"]);
}
else{
    echo "couldn't complete orders";
}



?>

<html>
<head>
    <meta http-equiv="refresh" content="0; url=../barista_pending.php"/>
</head>
<body>
<!-- #! /usr/local/bin/php -->
    </body>
</html>