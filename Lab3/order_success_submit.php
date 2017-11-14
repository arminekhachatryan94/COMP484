<?php
session_start();
?>
<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>

<div class="page text-center" style="width:90%">
    <br><br>
    <div class="display-1 font-weight-normal text-success">Order Success!</div>
    <hr style="border-width: 1px; border-color:black;">
    <br>
    <div class="h4">Go to <a href="customer_menu.php">Menu</a> to add another order, or
        <br>go to <a href="customer_myorders.php"> My Orders</a> to view your orders.</div>
    <br>
</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>
