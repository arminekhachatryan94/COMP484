<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>

<div class="display-1">
    <br><br><br><br>
    
    <div>My Cart</div>
    <?php
    echo $_SESSION["cart_size"] . "<br>";
    for( $i = 1; $i <= $_SESSION["cart_size"]; $i++ ){
        echo $_SESSION["mycart"][$i] . "<br>";
    }
    ?>

</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>
