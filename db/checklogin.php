<?php

$host="localhost"; // Host name
$username="root"; // Mysql username
$password="palsonicRp:"; // Mysql password
$dbname="ipaddb"; // Database name
$tbl_name="members"; // Table name

// Connect to server and select databse.
$link = mysqli_connect($host = "localhost", $username = "brad", $password = "palsonicRp:")or die("cannot connect");
$dbc = mysqli_select_db($link, $dbname)or die("cannot select DB");

// username and password sent from form
$myusername=$_POST['myusername'];
$mypassword=$_POST['mypassword'];

$sql = "SELECT * FROM members WHERE username= $myusername and password= $mypassword";

// Mysql_num_row is counting table row
$rowcount=mysqli_num_rows($sql = "SELECT COUNT(*) FROM members");

// If result matched $myusername and $mypassword, table row must be 1 row

if($rowcount==1){

// Register $myusername, $mypassword and redirect to file "login_success.php"
session_register("myusername");
session_register("mypassword");
header("location:login_success.php");
}
else {
echo "Wrong Username or Password";
}
?>