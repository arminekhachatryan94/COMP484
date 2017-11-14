<nav class="navig container-fluid">
    
    <div class="row h4" style="display:inline;">
        <div class="col-md-8 text-left">
            <!-- left -->
            <a href="<?php
                     if( !empty($_SESSION["user_role"]) ){
                         if( $_SESSION["user_role"] == "barista" ){
                             echo "barista_home.php";
                         }
                         else{
                             echo "customer_home.php";
                         }
                     }
                     else{
                         echo "index.php";
                     }
                    ?>" class="h1 text-white" style="padding:10px;">Tsarbucks</a>
            
            <a href="<?php
                     if( !empty($_SESSION["user_role"]) ){
                         if( $_SESSION["user_role"] == "barista" ){
                             echo "barista_home.php";
                         }
                         else{
                             echo "customer_home.php";
                         }
                     }
                     else{
                         echo "index.php";
                     }
                    ?>" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-home"></span>
                Home
            </a>
            
            <!-- Barista -->
            <?php
            if( !empty($_SESSION["user_role"]) && $_SESSION["user_role"] == "barista" ){ ?>
            <a href="barista_pending.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-book"></span>
                Pending Orders
            </a>
            <?php } ?>
            
            <!-- Customer -->
            <?php
            if( !empty($_SESSION["user_role"]) && $_SESSION["user_role"] == "customer" ){ ?>
            <a href="customer_menu.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-book"></span>
                Menu
            </a>
            <a href="customer_myorders.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-briefcase"></span>
                My Orders
            </a>
            <?php } ?>
        </div>
                
                
        <div class="col-md-4 text-right">
            <!-- right -->
            <?php
            if( !empty($_SESSION["user_role"]) ){
                if( $_SESSION["user_role"] == "barista" ){ ?>
                    <a href="barista_home.php" class="text-white" style="padding:10px;">Barista</a>
                <?php }
                else{ ?>
                    <a href="customer_home.php" class="text-white" style="padding:10px;">Customer</a>
                <?php }
            } ?>

            <!-- Customer -->
            <?php
            if( !empty($_SESSION["user_role"]) && $_SESSION["user_role"] == "customer" ){ ?>
            <a href="customer_mycart.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-shopping-cart"></span>
                My Cart
                <?php
                    if($_SESSION["cart_total"] > 0 ){
                        echo $_SESSION["cart_total"];
                    }
                ?>
            </a>
            <?php } ?>
            
            <?php
            if( empty($_SESSION["username"]) ){ ?>
            <a href="login.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-log-out"></span>
                Login
            </a>
            <?php
            } else{ ?>
            <a href="logout.php" class="text-white" style="padding:10px;">
                <span class="glyphicon glyphicon-log-out"></span>
                Logout
            </a>
            <?php } ?>
        </div>
    </div>
    
    
    
</nav>