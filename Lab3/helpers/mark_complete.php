<?php
session_start();

$true = false;
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
    ?>
        <meta http-equiv="refresh" content="0; url=../order_success_complete.php"/>
<?php
}
else{
    echo "couldn't complete orders";
}


if( $true == 1 ){ ?>
        <meta http-equiv="refresh" content="0; url=../order_success_complete.php"/>
    <?php } else { ?>
    <div>Update error!</div>
    <?php }
?>


?>

<!--html>
<head>
    <meta http-equiv="refresh" content="0; url=../order_success_complete.php"/>
</head>
<body-->
<!-- #! /usr/local/bin/php -->
    <!--/body>
</html-->