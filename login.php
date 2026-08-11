<?php

header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = mysqli_real_escape_string($conn, $data['email']);
$password = mysqli_real_escape_string($conn, $data['password']);

$sql = "SELECT * FROM users
WHERE email='$email'
AND password='$password'";

$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

    echo json_encode([
        "success" => true,
        "message" => "✅ Login Successful"
    ]);

}else{

    echo json_encode([
        "success" => false,
        "message" => "Invalid Email or Password"
    ]);

}

?>