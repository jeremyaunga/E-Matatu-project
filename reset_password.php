<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $email = $_GET["email"];
    $token = $_GET["token"];

    // Check if the email and token match in the database
    $sql = "SELECT user_id FROM users WHERE email = ? AND reset_token = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $email, $token);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Email and token are valid, allow the user to reset the password
        // ...

        // Clear the reset_token in the database after the password is reset
        $sqlUpdate = "UPDATE users SET reset_token = NULL WHERE email = ?";
        $stmtUpdate = $conn->prepare($sqlUpdate);
        $stmtUpdate->bind_param("s", $email);
        $stmtUpdate->execute();
        $stmtUpdate->close();
    } else {
        // Invalid email or token
        echo "Invalid email or token";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
