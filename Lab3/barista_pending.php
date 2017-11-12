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
    echo "couldn't retrieve";
}

// get products
$list2 = $db->prepare("SELECT * FROM `tsarbucks`.`products` WHERE product_id");
if($list2->execute()) {
    $products = $list2->fetchAll();
    //echo count($products);
    //print_r($products);
}
else{
    echo "couldn't retrieve";
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
    <div class="display-1 font-weight-normal">My Orders</div>
    <div class="h5">
        <?php
        //echo $num_orders;
        if( $num_orders > 0 ){
            //var_dump($orders);
            for( $i = count($orders)-1; $i >= 0; $i-- ){
        ?>
                <div style="background-color:white; margin:20px; padding:30px; padding-bottom:20px;">
                    <div class="text-left h2">Order <?php echo $orders[$i]["order_id"] ?> </div>
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
                            $price = $quantity * $products[$product_id-1]["price"];
                            $size = $products[$product_id-1]["size"];
                            $total_price += $price;
                            $total_size += $size;
                        ?>
                                <div class="col-md-4"><?php echo $products[$product_id-1]["display_name"]; ?></div>
                                <div class="col-md-2"><?php echo $size; ?></div>
                                <div class="col-md-2"><?php echo $quantity; ?></div>
                                <div class="col-md-1">$<?php echo number_format($price, 2); ?></div>
                                <button class="col-md-2 btn-success" style="padding:4px;">Mark Complete</button>
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