<?php
$host = "sql300.infinityfree.com";
$user = "if0_41094164";
$pass = 'F7kpmWQrIPdRoH';
$db   = "if0_41094164_test";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("DB CONNECT FAILED: " . $conn->connect_error);
}

echo "OK - DB connected";
