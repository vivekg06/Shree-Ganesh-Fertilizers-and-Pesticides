<?php

// Return JSON response
header("Content-Type: application/json");

// Include database connection
include "db.php";

// Read JSON data from frontend
$data = json_decode(file_get_contents("php://input"), true);

// Check if data received
if(!$data){
    echo json_encode([
        "message" => "No data received"
    ]);
    exit;
}

// Validate required fields
if(
    empty($data['name']) ||
    empty($data['phone']) ||
    empty($data['items'])
){
    echo json_encode([
        "message" => "Missing required fields"
    ]);
    exit;
}

// Get values
$name    = mysqli_real_escape_string($conn, $data['name']);
$phone   = mysqli_real_escape_string($conn, $data['phone']);
$total   = intval($data['totalAmount'] ?? 0);

// Convert items array to a readable string e.g. "DAP x2; Urea x1"
$items_text = '';
foreach($data['items'] as $item){
    $items_text .= $item['product'] . " x" . $item['quantity'] . "; ";
}
$product  = mysqli_real_escape_string($conn, rtrim($items_text, '; '));
$quantity = $total; // storing total amount in quantity column

$order_date = date("Y-m-d H:i:s");

// Insert query
$sql = "INSERT INTO orders
(name, phone, product, quantity, order_date)
VALUES
('$name', '$phone', '$product', '$quantity', '$order_date')";

// Execute query
if(mysqli_query($conn, $sql)){

    echo json_encode([
        "message" => "✅ Order placed successfully"
    ]);

}else{

    echo json_encode([
        "message" => "Database Error: " . mysqli_error($conn)
    ]);

}

// Close connection
mysqli_close($conn);

?>

