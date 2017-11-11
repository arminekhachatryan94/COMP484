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
    $user = $db->prepare("SELECT * FROM `tsarbucks`.`products` WHERE product_id");
    if($user->execute()) {
        // fetch all matching records and dump them to the screen
        $result = $user->fetchAll();
        $_SESSION["menu"] = $result;
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
        for( $i = 0; $i < count($result); $i++ ){ ?>
        <div class="row text-left">
            <div class="col-md-6" style="padding: 10px;"><?php echo $result[$i]["display_name"]; ?></div>
            <div class="col-md-1" style="padding: 10px;"><?php echo $result[$i]["price"]; ?></div>
            <div class="col-md-2" style="padding: 10px;"><?php echo $result[$i]["size"]; ?></div>
            <div class="col-md-2" style="padding: 10px;"><btn class="btn-primary" style="padding:5px;padding-left:20px;padding-right:20px">Add to Cart</btn></div>
        </div>
        <?php
        }
        ?>
    </div>
</div>

<?php include "templates/footer.php"; ?>