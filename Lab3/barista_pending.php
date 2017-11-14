<!-- add stylesheets and scripts !-->
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

// get pending orders
$list1 = $db->prepare("SELECT * FROM `tsarbucks`.`orders` WHERE completed = 0");
if($list1->execute()) {
    // fetch all matching records and dump them to the screen
    $orders = $list1->fetchAll();
    //print_r($_SESSION["menu"]);
}
else{
    echo "couldn't retrieve orders";
}

// get products
$list2 = $db->prepare("SELECT * FROM `tsarbucks`.`products` WHERE product_id");
if($list2->execute()) {
    $products = $list2->fetchAll();
    //echo count($products);
    //print_r($products);
}
else{
    echo "couldn't retrieve products";
}

// get users
$list3 = $db->prepare("SELECT * FROM `tsarbucks`.`users` WHERE user_id");
if($list3->execute()) {
    $users = $list3->fetchAll();
    //echo count($products);
    //print_r($products);
}
else{
    echo "couldn't retrieve users";
}


$temp_order = 0;
$num_orders = 0;
for( $k = 0; $k < count($orders); $k++ ){
    if( $temp_order != $orders[$k]["order_id"]){
        $num_orders++;
        $temp_order = $orders[$k]["order_id"];
    }
}
?>
<?php include "templates/head.php"; ?>

<div class="page text-center" style="width:90%">
    <div class="display-1 font-weight-normal">Pending Orders</div>
    <div class="h5">
        <?php
        //echo $num_orders;
        if( $num_orders > 0 ){
            //var_dump($orders);
            for( $i = count($orders)-1; $i >= 0; $i-- ){
                $user_id = $orders[$i]["user_id"];
        ?>
                <div style="background-color:white; margin:20px; padding:30px; padding-bottom:20px;">
                    <div class="text-left h2">Order <?php echo $orders[$i]["order_id"] ?> for <?php echo $users[$user_id-1]["display_name"]; ?></div>
                    <br>
                    <div class="row text-left h4">
                        <div class="col-md-4">Product Name</div>
                        <div class="col-md-2">Size (oz)</div>
                        <div class="col-md-2">Quantity</div>
                        <div class="col-md-1">Price</div>
                        <div class="col-md-1"></div>
                    </div>
                    <hr style="border-width: 1px; border-color:black;">
                    <div class="row text-left">
                    <?php
                    $total_price = 0;
                    $total_size = 0;
                    for( $j = $i; $j >= 0; $j-- ){
                        if( $orders[$i]["order_id"] != $orders[$j]["order_id"] ){
                            $i = $j+1;
                            break;
                        }
                        else{
                            $order_id = $orders[$j]["order_id"];
                            $product_id = $orders[$j]["product_id"];
                            $quantity = $orders[$j]["quantity"];
                            $price = $products[$product_id-1]["price"];
                            $size = $products[$product_id-1]["size"];
                            $pq = $price * $quantity;
                            $total_price += $pq;
                            $total_size += $size;
                        ?>
                            <div class="col-md-4"><?php echo $products[$product_id-1]["display_name"]; ?></div>
                            <div class="col-md-2"><?php echo $size; ?></div>
                            <div class="col-md-2"><?php echo $quantity; ?></div>
                            <div class="col-md-1">$<?php echo number_format($price, 2); ?></div>
                            <form method="POST" action="helpers/mark_complete.php" class="col-md-2" style="padding: 10px;">
                                <input type="hidden" name="user_id" value="<?php echo $orders[$i]["user_id"]; ?>">
                                <input type="hidden" name="order_id" value="<?php echo $orders[$i]["order_id"]; ?>">
                                <input type="hidden" name="product_id" value="<?php echo $orders[$i]["product_id"]; ?>">
                                <input type="submit" name="submit" value="Mark Complete" class="btn-success" style="padding: 5px;padding-left:10px;padding-right:20px;">
                            </form>
                                <!--button class="col-md-2 btn-success" style="padding:4px;">
                                    <span class="glyphicon glyphicon-ok"></span>
                                    Mark Complete
                                </button-->
                        <?php
                        }
                    } ?>
                    </div>
                    <br>
                    <b><div class="text-right">Total Price: $<?php echo number_format($total_price, 2); ?> </div>
                        <div class="text-right">Total Size: <?php echo $total_size ?> oz</div></b>
                </div>
                <?php
            }
        }
        ?>
    </div>
</div>

<?php include "templates/footer.php"; ?>