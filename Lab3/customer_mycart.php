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
    $product = $db->prepare("SELECT * FROM `tsarbucks`.`products` WHERE product_id");
    if($product->execute()) {
        // fetch all matching records and dump them to the screen
        $result = $product->fetchAll();
        //print_r($_SESSION["menu"]);
    }
    else{
        echo "couldn't retrieve";
    }
?>
<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>


<div class="page text-center" style="width:90%">
    <br>
    <div class="display-1 font-weight-normal">My Cart</div>
    <?php
    if( $_SESSION["cart_total"] > 0 ){ ?>
    <div class="h4">
        <div class="row text-left font-weight-bold h3">
            <div class="col-md-5" style="padding: 10px;">Product Name</div>
            <div class="col-md-1" style="padding: 10px;">Price</div>
            <div class="col-md-2 text-center" style="padding: 10px;">Size (oz)</div>
            <div class="col-md-2 text-center" style="padding: 10px;">Quantity</div>
            <div class="col-md-1" style="padding: 10px;"></div>
        </div>
        <?php
        //print_r($result);
        $price_total = 0;
        $size_total = 0;
        for( $i = 1; $i <= $_SESSION["cart_size"]; $i++ ){
            if( $_SESSION["mycart"][$i] > 0 ){
            ?>
            <div class="row text-left">
                <?php
                $price = $result[$i-1]["price"];
                $size = $result[$i-1]["size"];
                $quantity = $_SESSION["mycart"][$i];
                $price_total += ($price * $quantity);
                $size_total += $size;
                ?>
                <div class="col-md-5" style="padding: 10px;"><?php echo $result[$i-1]["display_name"]; ?></div>
                <div class="col-md-1" style="padding: 10px;">$<?php echo number_format($price, 2); ?></div>
                <div class="col-md-2 text-center" style="padding: 10px;"><?php echo $size; ?></div>
                <div class="col-md-2 text-center" style="padding: 10px;"><?php echo $quantity; ?></div>
                <form method="POST" action="remove.php" class="col-md-2" style="padding: 10px;">
                    <input type="hidden" name="id" value="<?php echo $i; ?>">
                    <input type="hidden" name="quantity" value="<?php echo $quantity; ?>">
                    <input type="submit" name="submit" value="Remove from Cart" class="btn-danger" style="padding: 5px;padding-left:20px;padding-right:20px;">
                </form>
            </div>
            <?php
            }
        }        
        ?>
        <br>
        <div class="text-left" style="padding-bottom:10px;"><b>Total Cost: $<?php echo number_format($price_total, 2); ?></b></div>
        <div class="text-left"><b>Total Size: <?php echo $size_total; ?> ounces</b></div>
        
    </div>
    <?php
    } else{?>
    <div class="h4">No items in cart</div>
    <?php
    }
    ?>
    <br>
</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>
