<nav class="navig container-fluid">
    
    
    <div class="row h3" style="display:inline;">
        <div class="col-md-8 text-left">
            <!-- left -->
            <a href="index.php" class="h1 text-white" style="padding:10px;">Tsarbucks</a>
            
            <a href="<?php
                     if( !empty($_SESSION["display_name"]) ){
                         if( $_SESSION["display_name"] == "Barista" ){
                             echo "barista_home.php";
                         }
                         else{
                             echo "customer_home.php";
                         }
                     }
                     else{
                         echo "index.php";
                     }
                    ?>" class="text-white" style="padding:10px;">Home</a>
            
            <!-- Barista -->
            <?php
            if( !empty($_SESSION["display_name"]) && $_SESSION["display_name"] == "Barista" ){ ?>
            <a href="barista_pending.php" class="text-white" style="padding:10px;">Pending Orders</a>
            <?php } ?>
            
            <!-- Customer -->
            <?php
            if( !empty($_SESSION["display_name"]) && $_SESSION["display_name"] == "Customer" ){ ?>
            <a href="customer_menu.php" class="text-white" style="padding:10px;">Menu</a>
            <a href="customer_myorders.php" class="text-white" style="padding:10px;">My Orders</a>
            <?php } ?>
        </div>
                
                
        <div class="col-md-4 text-right">
            <!-- right -->
            <?php
            if( !empty($_SESSION["display_name"]) ){ ?>
            <a href="index.php" class="text-white" style="padding:10px;">
                <?php
                if( $_SESSION["display_name"] == "Barista" ){
                    echo "Barista";
                }
                else{
                    echo "Customer";
                }
                ?>
            </a>
            <?php } ?>
            
            <!-- Customer -->
            <?php
            if( !empty($_SESSION["display_name"]) && $_SESSION["display_name"] == "Customer" ){ ?>
            <a href="customer_mycart.php" class="text-white" style="padding:10px;">My Cart</a>
            <?php } ?>
            
            <?php
            if( empty($_SESSION["username"]) ){ ?>
            <a href="login.php" class="text-white" style="padding:10px;">Login</a>
            <?php
            } else{ ?>
            <a href="logout.php" class="text-white" style="padding:10px;">Logout</a>
            <?php } ?>
        </div>
    </div>
    
    
    
</nav>