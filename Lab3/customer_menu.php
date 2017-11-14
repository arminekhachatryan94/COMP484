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
<?php include "templates/head.php"; ?>
<div class="page text-center" style="width:90%">
    <div class="display-1 font-weight-normal">Menu</div>
    <div class="h4">
        <div class="row text-left font-weight-bold h3">
            <div class="col-md-6" style="padding: 10px;">Product Name</div>
            <div class="col-md-1" style="padding: 10px;">Price</div>
            <div class="col-md-2" style="padding: 10px;">Size (oz)</div>
        </div>
        <?php
        //print_r($result);
        for( $i = 0; $i < count($result); $i++ ){
            $id = $result[$i]["product_id"];
        ?>
        <div class="row text-left">
            <div class="col-md-6" style="padding: 10px;"><?php echo $result[$i]["display_name"]; ?></div>
            <div class="col-md-1" style="padding: 10px;"><?php echo $result[$i]["price"]; ?></div>
            <div class="col-md-2" style="padding: 10px;"><?php echo $result[$i]["size"]; ?></div>
            <!--a href="customer_menu.php/id=<!--?php echo $id; ?>" class="col-md-2" style="padding: 10px;"><button class="btn-primary" style="padding:5px;padding-left:20px;padding-right:20px;">Add to Cart</button></a-->
            
            <!--form method="POST" onClick="window.location='?id=<!--?php echo $id; ?>'" class="col-md-2" style="padding: 10px;">
                <input type="submit" name="submit" value="Add to Cart" class="btn-primary" style="padding: 5px;padding-left:20px;padding-right:20px;">
            </form-->
            <form method="POST" action="helpers/add.php" class="col-md-2" style="padding: 10px;">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                <input type="submit" name="submit" value="Add to Cart" class="btn-primary" style="padding: 5px;padding-left:20px;padding-right:20px;">
            </form>
        </div>
        <?php
        }
        ?>
    </div>
</div>

<?php include "templates/footer.php"; ?>