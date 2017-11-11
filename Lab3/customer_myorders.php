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
    //echo "<br><br>";
    $list1 = $db->prepare("SELECT * FROM `tsarbucks`.`orders` WHERE user_id = " . $_SESSION['user_id']);
    if($list1->execute()) {
        // fetch all matching records and dump them to the screen
        $orders = $list1->fetchAll();
        //print_r($_SESSION["menu"]);
    }
    else{
        echo "couldn't retrieve";
    }


// get number of orders
$num_orders = 0;
for( $i = 0; $i < count($orders); $i++ ){
    if( $num_orders < $orders[$i]["order_id"] ){
        $num_orders = $orders[$i]["order_id"];
    }
}

?>
<?php include "templates/head.php"; ?>

<div class="page text-center" style="width:90%">
    <div class="display-1 font-weight-normal">My Orders</div>
    <div class="h5">
        <?php
        if( $num_orders > 0 ){
            for( $i = $num_orders; $i > 0; $i-- ){
                ?>
                <div style="background-color:white; margin:20px; padding:30px; padding-bottom:20px;">
                    <div class="text-left h2">Order <?php echo $i ?> </div>
                    <br>
                    <div class="row text-left h4">
                        <div class="col-md-4">Product Name</div>
                        <div class="col-md-2">Size (oz)</div>
                        <div class="col-md-2">Quantity</div>
                        <div class="col-md-1">Price</div>
                        <div class="col-md-1">Status</div>
                    </div>
                    <div class="row text-left">
                        
                    <?php
                    
                    $total_price = 0;
                    $total_size = 0;
                
                    for( $j = 0; $j < count($orders); $j++ ){
                        if( $i == $orders[$j]["order_id"] ){
                            
                            $list2 = $db->prepare("SELECT * FROM `tsarbucks`.`products` WHERE product_id = " . $orders[$j]["product_id"]);
                            if($list2->execute()) {
                                $product = $list2->fetchAll();
                                // print_r($product);
                                
                                $price = $orders[$j]["quantity"]*$product[0]["price"];
                                $size = $product[0]["size"];
                                $total_price += $price;
                                $total_size += $size;
                                
                                ?>
                                <div class="col-md-4"><?php echo $product[0]["display_name"]; ?></div>
                                <div class="col-md-2"><?php echo $size ?></div>
                                <div class="col-md-2"><?php echo $orders[$j]["quantity"]; ?></div>
                                <div class="col-md-1">$<?php echo number_format($price, 2); ?></div>
                                <div class="col-md-2">
                                    <?php
                                    if( $orders[$j]["completed"] ){
                                        echo "Completed";
                                    }
                                    else{
                                        echo "Pending";
                                    }
                                    ?>
                                </div>
                        
                            <?php
                            }
                            else{
                                echo "couldn't retrieve";
                            }
                        }
                    }
                    ?>
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

<?php
?>