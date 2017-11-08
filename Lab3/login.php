<!-- add stylesheets and scripts !-->
<?php include "templates/head.php"; ?>

<div class="page text-center">
    <div class="h1">Login</div>

    <form method="POST" action="<? echo $_SERVER['SCRIPT_NAME']; ?>">
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
    <?php
        if (!empty($_POST)) {
            echo "username: " . $_POST["username"];
            echo "<br>";
            echo "password: " . $_POST["password"];
            
            session_start();
            echo __DIR__;
        }
    ?>

</div>

<!-- add remaining scripts -->
<?php include "templates/footer.php"; ?>