<nav class="navig container-fluid">
    
    
    <div class="row h3" style="display:inline;">
        <div class="col-md-8 text-left">
            <!-- left -->
            <a href="index.php" class="h1 text-white">Tsarbucks</a>
            
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
                    ?>" class="text-white">Home</a>
            
            <!-- Barista -->
            <?php
            if( !empty($_SESSION["display_name"]) && $_SESSION["display_name"] == "Barista" ){ ?>
            <a href="barista_pending.php" class="text-white">Pending Orders</a>
            <?php } ?>
            
            <!-- Customer -->
            <?php
            if( !empty($_SESSION["display_name"]) && $_SESSION["display_name"] == "Customer" ){ ?>
            <a href="customer_menu.php" class="text-white">Menu</a>
            <a href="customer_myorders.php" class="text-white">My Orders</a>
            <?php } ?>
        </div>
                
                
        <div class="col-md-4 text-right">
            <!-- right -->
            <?php
            if( !empty($_SESSION["display_name"]) ){ ?>
            <a href="index.php" class="text-white">
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
            <a href="customer_mycart.php" class="text-white">My Cart</a>
            <?php } ?>
            
            <?php
            if( empty($_SESSION["username"]) ){ ?>
            <a href="login.php" class="text-white">Login</a>
            <?php
            } else{ ?>
            <a href="logout.php" class="text-white">Logout</a>
            <?php } ?>
        </div>
    </div>
    
    
    
</nav>