<?php
$conn= new mysqli('127.0.0.1','root','','ematatu');

if (!$conn)
{
    error_reporting(0);
    die("Could not connect to mysql".mysqli_error($conn));
}

?>