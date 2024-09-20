<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];

    // Check if the email exists in the database
    $sql = "SELECT user_id, username FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Generate a unique reset token
        $resetToken = bin2hex(random_bytes(32));

        // Store the reset token in the database
        $sqlUpdate = "UPDATE users SET reset_token = ? WHERE email = ?";
        $stmtUpdate = $conn->prepare($sqlUpdate);
        $stmtUpdate->bind_param("ss", $resetToken, $email);
        $stmtUpdate->execute();

        // Close the statement
        $stmtUpdate->close();

        // Close the connection
        $conn->close();

        // Construct the reset link
        $resetLink = "http://yourwebsite.com/reset_password.php?email=$email&token=$resetToken";

        // Send an email with the reset link
        $to = $email;
        $subject = "Password Reset Instructions";
        $message = "Hello,\r\n\r\n";
        $message .= "You have requested to reset your password. Click the link below to reset your password:\r\n";
        $message .= "$resetLink\r\n\r\n";
        $message .= "If you did not request a password reset, please ignore this email.\r\n\r\n";
        $message .= "Best regards,\r\n";
        $message .= "Your Company Name";

        // Additional headers
        $headers = "From: your-email@example.com" . "\r\n";

        // Send the email
        mail($to, $subject, $message, $headers);

        // Provide feedback to the user
        echo json_encode(['success' => true, 'message' => 'Password reset instructions sent to your email.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Email not found in the database']);
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="forgot_password.css">
    <title>Forgot Password</title>
    <script src="recover_password.js" defer></script>
</head>
<body>
    <div class="container">
        <form id="forgotPasswordForm" action="recover_password.php" method="post">
            <h2>Forgot Password</h2>

            <label for="email">Enter your email:</label>
            <input type="email" id="email" name="email" required>

            <button type="button" id="recoverPasswordBtn">Recover Password</button>
        </form>

        <div class="login-link">
            <p>Remember your password? <a href="login.html">Login here</a></p>
        </div>
    </div>
</body>
</html>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const recoverPasswordBtn = document.getElementById("recoverPasswordBtn");

    if (recoverPasswordBtn) {
        recoverPasswordBtn.addEventListener("click", function () {
            // Get the email value from the form
            const email = document.getElementById("email").value;

            // Check if the email is not empty
            if (email.trim() !== "") {
                // Display a pop-up message with the recovery instructions
                alert("Password recovery instructions sent to " + email);
            } else {
                // Display an alert if the email is empty
                alert("Please enter your email before recovering your password.");
            }
        });
    }
});
</script>

<style>
body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background: url('E-Matatu project/images/Matatus_Catalyst.webp') center/cover no-repeat #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.container {
    background-color: rgba(83, 172, 72, 0.493);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 6px;
}

input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #2980b9;
}

.login-link {
    margin-top: 15px;
    text-align: center;
}

.login-link a {
    color: #3498db;
    text-decoration: none;
}

.success-message {
    color: green;
    margin-bottom: 15px;
}
</style>
