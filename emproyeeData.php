<?php
// Include the database connection function
include 'connection.php';

// Connect to the database
$conn = getDatabaseConnection();

// Check if the connection is successful
if ($conn) {
    // SQL statement to fetch data from the employees table
    $sql = "SELECT month, workerCount FROM employees"; // Updated table name to employees

    // Execute the query
    $result = $conn->query($sql);

    if ($result) {
        // Fetch data as an associative array
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        // Return data as JSON
        header('Content-Type: application/json');
        echo json_encode($data);
    } else {
        // Handle query error
        echo json_encode(['error' => 'Error executing the query: ' . $conn->error]);
    }

    // Close the database connection
    $conn->close();
} else {
    // Handle database connection error
    echo json_encode(['error' => 'Error connecting to the database: ' . $conn->connect_error]);
}
?>
