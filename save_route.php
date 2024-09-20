<?php
// Assuming you have a database connection function
include 'connection.php';

// Connect to the database
$conn = getDatabaseConnection();

if ($conn) {
    // Replace this query with your actual query to fetch route details from the database
    $sql = "SELECT route_name, num_buses, traffic_condition FROM routes WHERE route_id = 1";

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $routeName = $row['route_name'];
        $numBuses = $row['num_buses'];
        $trafficCondition = $row['traffic_condition'];
    } else {
        // Handle query error or no data found
        $routeName = 'N/A';
        $numBuses = 'N/A';
        $trafficCondition = 'N/A';
    }

    // Close the database connection
    $conn->close();
} else {
    // Handle database connection error
    $routeName = 'N/A';
    $numBuses = 'N/A';
    $trafficCondition = 'N/A';
}
?>
