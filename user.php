<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include 'db_connection.php';

// Login logic
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["loginUsername"]) && isset($_POST["loginPassword"])) {
    $username = $_POST["loginUsername"];
    $password = $_POST["loginPassword"];

    // Connect to the database
    $conn = getDatabaseConnection();

    // Validate login credentials using prepared statements
    $stmt = $conn->prepare("SELECT username, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->bind_result($dbUsername, $dbPassword);

    if ($stmt->fetch() && password_verify($password, $dbPassword)) {
        // Simulation of a successful login
        $_SESSION["username"] = $dbUsername;
        echo json_encode(['success' => true, 'message' => 'Login successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
}

// Registration logic
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["registerUsername"]) && isset($_POST["registerPassword"]) && isset($_POST["confirmPassword"]) && isset($_POST["registerEmail"]) && isset($_POST["registerPhone"])) {
    $username = $_POST["registerUsername"];
    $password = $_POST["registerPassword"];
    $confirmPassword = $_POST["confirmPassword"];
    $email = $_POST["registerEmail"];
    $phone = $_POST["registerPhone"];

    // Validate registration data (replace this with actual validation logic)
    if (empty($username) || empty($password) || empty($confirmPassword) || empty($email) || empty($phone)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all fields']);
    } elseif ($password !== $confirmPassword) {
        echo json_encode(['success' => false, 'message' => 'Passwords do not match']);
    } else {
        // Connect to the database
        $conn = getDatabaseConnection();

        // Escape variables for security
        $username = $conn->real_escape_string($username);
        $password = $conn->real_escape_string($password);
        $email = $conn->real_escape_string($email);
        $phone = $conn->real_escape_string($phone);

        // Hash the password (for security)
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

        // SQL statement for inserting user data
        $sql = "INSERT INTO users (username, password, email, phone) VALUES ('$username', '$hashedPassword', '$email', '$phone')";

        // Execute the statement
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Registration successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again later.']);
        }

        // Close the database connection
        $conn->close();
    }
}

// Logout logic
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["logout"])) {
    // Unset all session variables
    session_unset();

    // Destroy the session
    session_destroy();

    echo json_encode(['success' => true, 'message' => 'Logout successful']);
}
?>
