<?php
// Establish a connection to your MySQL database
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "ematatu";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the database
$sql = "SELECT * FROM driver_assignments WHERE driver_name = 'Driver Name'";
$result = $conn->query($sql);

// Check if any rows are returned
if ($result->num_rows > 0) {
    // Output data of each row
    $row = $result->fetch_assoc();
    $driverName = $row["driver_name"];
    $route = $row["route"];
    $numberOfTrips = $row["number_of_trips"];
} else {
    // No data found
    $driverName = "Unknown";
    $route = "Not assigned";
    $numberOfTrips = 0;
}

// Close the database connection
$conn->close();
?>
