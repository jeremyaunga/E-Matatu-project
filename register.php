<?php
include 'db_connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];
    $email = $_POST["email"];
    $contact = isset($_POST["contact"]) ? $_POST["contact"] : '';

    $error_message = ''; // Initialize an empty error message

    if (empty($username) || empty($password) || empty($confirm_password) || empty($email) || empty($contact)) {
        $error_message = 'Please fill in all fields';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = 'Invalid email address';
    } elseif ($password !== $confirm_password) {
        $error_message = 'Passwords do not match';
    } else {
        // SQL statement for inserting user data
        $sql = "INSERT INTO users (username, password, email, contact) VALUES (?, ?, ?, ?)";

        // Create a prepared statement
        $stmt = $conn->prepare($sql);

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        // Bind parameters to the statement
        $stmt->bind_param("ssss", $username, $hashed_password, $email, $contact);

        // Execute the statement
        if ($stmt->execute()) {
            // Registration successful
            // Redirect to login page using JavaScript
            echo "<script>window.location.href='login.html';</script>";
            exit();
        } else {
            // Handle database error
            $error_message = 'Registration failed. Please try again later.';
        }

        // Close the statement
        $stmt->close();
    }

    // Close the database connection
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="register.css">
    <title>E-Matatu Registration</title>
</head>
<body>
    <div class="container">
        <form id="registerForm" action="register.php" method="post">
            <h2>Register</h2>

            <?php if (!empty($error_message)): ?>
                <div class="error-message" style="color: red;"><?php echo $error_message; ?></div>
            <?php endif; ?>

            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:</label>
            <div class="password-input-container">
                <input type="password" id="password" name="password" required>
                <span class="password-toggle" id="password-toggle">&#128065;</span>
            </div>

            <label for="confirm_password">Confirm Password:</label>
            <input type="password" id="confirm_password" name="confirm_password" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>

            <label for="contact">Contact:</label>
            <input type="text" id="contact" name="contact" required>

            <button type="submit">Register</button>
        </form>

        <div class="login-link">
            <p>Already have an account? <a href="login.html">Login here</a></p>
        </div>
    </div>
</body>
</html>
