<?php

// Database connection parameters
$host = 'your_database_host';
$username = 'your_database_username';
$password = 'your_database_password';
$database = 'your_database_name';

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Function to fetch bus details from the database based on some criteria (e.g., bus ID)
function getBusDetails($busId) {
    global $conn;

    // Adjust the query based on your database schema
    $sql = "SELECT * FROM buses WHERE bus_id = $busId";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        return $result->fetch_assoc();
    } else {
        return null;
    }
}

// Handle AJAX requests
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['action'])) {
    if ($_POST['action'] == 'getBusDetails') {
        $busId = $_POST['busId'];
        $busDetails = getBusDetails($busId);
        echo json_encode($busDetails);
    }
}

// Close the database connection
$conn->close();

?>
