<?php
session_start();

if( !empty($_POST)){
    $username=$_POST["username"];
    $password=$_POST["password"];
    
    $conn = "mysql:host=localhost;dbname=immersive_db";
    try {
        $db = new PDO($conn, "root", "root", [
            PDO::ATTR_PERSISTENT => true
        ]); // use the proper root credentials
        // echo "connected to database";
    }
    catch(PDOException $e) {
        echo "not connected to database";
        die("Could not connect: " . $e->getMessage());
    }
    //echo "<br><br>";
    $user = $db->prepare("SELECT * FROM `tsarbucks`.`users` WHERE username = ?");
    if($user->execute([$username])) {
        // fetch all matching records and dump them to the screen
        $result = $user->fetchAll();
        //var_dump($result);
        //echo "<br><br>";
        //foreach ( $result as $db_username ){}
        for( $i = 0; $i < sizeof($result); $i++ ){
            $db_username=$result[$i]["username"];
            $db_password=$result[$i]["password"];
            if( ($db_username == $username ) and ($db_password == $password) ){
                // create shopping cart
                $_SESSION["mycart"] = array();
                $_SESSION["cart_size"] = 0;
                
                $_SESSION["username"] = $username;
                $_SESSION["password"] = $password;
                $_SESSION["user_id"] = $result[$i]["user_id"];
                //echo $_SESSION["username"] . "<br>";
                //echo $_SESSION["password"];
                
                if( $result[$i]["display_name"] == "Barista"){
                    $_SESSION["display_name"] = "Barista";
                    header("Location: barista_home.php", true); // true to replace the header
                    exit();
                }
                else{
                    $_SESSION["display_name"] = "Customer";
                    header("Location: customer_home.php", true); // true to replace the header
                    exit();
                }                
            }
            // echo $db_username . " " . $db_password;
        }
        
        /*
        $db_username=$result[0]["username"];
        $db_password=$result[0]["password"];
        if( $username == $db_username && $password == $db_password ){
            $_SESSION["username"] = $username;
            $_SESSION["password"] = $password;
            echo $_SESSION["username"] . "<br>";
            echo $_SESSION["password"];
        }*/
    }
    else{
        echo "couldn't retrieve";
    }
}
    ?>

<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>

<div class="page text-center">
    <div class="h1">Login</div>

    <form method="POST"
          action="login.php">
        <div>Username:</div>
        <input type="text" name="username"><br>
        <br>
        <div>Password:<br></div>
        <input type="text" name="password">
        <br>
        <br>
        <input type="submit" name="submit" value="Submit">
        <br>
        
    </form>
</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>