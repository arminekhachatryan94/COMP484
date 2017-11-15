<?php
session_start();

// remove item from cart
$id = $_POST["id"];
$_SESSION["cart_total"]++;
$_SESSION["mycart"][$id]++;

//echo "Location: http://csun.edu"; // true to replace the header
//echo 2;

//echo $_SESSION["cart_total"];
//$_POST["id"] = null;
//$_POST["submit"] = null;
?>

<html>
<head>
    <meta http-equiv="refresh" content="0; url=../customer_mycart.php"/>
</head>
<body>
<!-- #! /usr/local/bin/php -->
    </body>
</html>