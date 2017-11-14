<?php
session_start();

// connect to orders db table;
$conn = "mysql:host=localhost;dbname=immersive_db";
try {
    $db = new PDO($conn, "root", "root", [
        PDO::ATTR_PERSISTENT => true
    ]);
}
catch(PDOException $e) {
    echo "not connected to database";
    die("Could not connect: " . $e->getMessage());
}

$user_id = $_SESSION["user_id"];
$order_id = 0;
// check which order #
$temps = $db->prepare("SELECT * FROM `tsarbucks`.`orders` WHERE user_id = " . $user_id );

if($temps->execute()){
    // fetch all matching records and dump them to the screen
    $result = $temps->fetchAll();
}
else{
    echo "couldn't retrieve";
}

if( count($result) == 0 ){
    $order_id = 0;
} else{
    for( $i = 0; $i < count($result); $i++ ){
        if( $result[$i]["order_id"] > $order_id ){
            $order_id = $result[$i]["order_id"];
        }
    }
}


// update db orders table
$order_id++;

for( $j = 1; $j <= $_SESSION["cart_size"]; $j++ ){
    if( $_SESSION["mycart"][$j] > 0 ){
        $product_id = $j;
        $quantity = $_SESSION["mycart"][$j];
        $orders = $db->prepare("INSERT INTO `tsarbucks`.`orders` (order_id, user_id, product_id, quantity, completed, created_at, updated_at) VALUES (?,?,?,?,?,?,?)");
        if($orders->execute([$order_id, $user_id, $product_id, $quantity, 0, NULL, NULL])) { ?>
        <meta http-equiv="refresh" content="0; url=../order_success_submit.php"/>
        <?php }else{
            echo "couldn't insert";
        }
    }
    $_SESSION["mycart"][$j] = 0;
}
$_SESSION["cart_total"] = 0;

?>

<html>
<head>
    <meta http-equiv="refresh" content="0; url=../order_success_submit.php"/>
</head>
<body>
<!-- #! /usr/local/bin/php -->
    <?php echo $order_id; ?>
    </body>
</html>