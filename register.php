<?php

header("Content-Type: application/json");

include "db.php";

// Read JSON
$data = json_decode(file_get_contents("php://input"), true);

// Validate
if(
    empty($data['full_name']) ||
    empty($data['email']) ||
    empty($data['phone']) ||
    empty($data['password'])
){
    echo json_encode([
        "message" => "Please fill all required fields"
    ]);
    exit;
}

// Get data
$full_name = mysqli_real_escape_string($conn, $data['full_name']);
$email = mysqli_real_escape_string($conn, $data['email']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$password = mysqli_real_escape_string($conn, $data['password']);
$address = mysqli_real_escape_string($conn, $data['address']);
$city = mysqli_real_escape_string($conn, $data['city']);
$state = mysqli_real_escape_string($conn, $data['state']);
$pincode = mysqli_real_escape_string($conn, $data['pincode']);

$created_at = date("Y-m-d H:i:s");

// Check existing email or phone
$check = "SELECT * FROM users 
WHERE email='$email' OR phone='$phone'";

$result = mysqli_query($conn, $check);

if(mysqli_num_rows($result) > 0){

    echo json_encode([
        "message" => "Email or Phone already registered"
    ]);

}else{

    // Insert user
    $sql = "INSERT INTO users
    (
        full_name,
        email,
        phone,
        password,
        address,
        city,
        state,
        pincode,
        created_at
    )

    VALUES
    (
        '$full_name',
        '$email',
        '$phone',
        '$password',
        '$address',
        '$city',
        '$state',
        '$pincode',
        '$created_at'
    )";

    if(mysqli_query($conn, $sql)){

        echo json_encode([
            "message" => "✅ Registration Successful"
        ]);

    }else{

        echo json_encode([
            "message" => mysqli_error($conn)
        ]);

    }

}

mysqli_close($conn);

?>