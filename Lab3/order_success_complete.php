<?php
session_start();
?>
<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>

<div class="page text-center" style="width:90%">
    <br><br>
    <div class="display-1 font-weight-normal text-success">Successfully Completed!</div>
    <hr style="border-width: 1px; border-color:black;">
    <br>
    <div class="h4">Go to <a href="barista_pending.php">Pending Orders</a> to complete another order.</div>
    <br>
</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>
