<?php
include 'db_connection.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate input
    if (empty($username) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Username and password are required']);
    } else {
        // Check the connection
        if ($conn->connect_error) {
            die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
        }

        // Prepare SQL statement to retrieve hashed password for the given username
        $sql = "SELECT password FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);

        // Bind parameter
        $stmt->bind_param("s", $username);

        // Execute the statement
        $stmt->execute();

        // Bind result variable
        $stmt->bind_result($hashed_password);

        // Fetch the result
        $stmt->fetch();

        // Close the statement
        $stmt->close();

        // Verify the password
        if ($hashed_password && password_verify($password, $hashed_password)) {
            // Successful login
            echo json_encode(['success' => true]);
        } else {
            // Invalid credentials
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }

        // Close the database connection
        $conn->close();
    }
} else {
    // Invalid request method
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <style>
        /* Add styles for error messages */
        .error-message {
            color: red;
            margin-top: 10px;
        }
    </style>
    <script src="login.js"></script>
    <title>E-Matatu Login</title>
</head>
<body>
    <div class="container">
        <form id="loginForm" action="login.php" method="post">
            <h2>Login</h2>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>

            <label for="password">Password:
                <input type="password" id="password" name="password" required>
                <span class="password-toggle" id="password-toggle">&#128065;</span>
            </label>

            <div id="errorMessageContainer"></div>

            <div class="forgot-password">
                <a href="forgot_password.html">Forgot Password?</a>
            </div>

            <button id="adminLogin" type="button">Admin Login</button>
            <button id="userLogin" type="button">Driver Login</button>
        </form>

        <div class="register-link">
            <p>Don't have an account? <a href="register.html">Register here</a></p>
        </div>
    </div>
</body>
</html>

<script>
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('loginForm');
    const adminLoginButton = document.getElementById('adminLogin');
    const userLoginButton = document.getElementById('userLogin');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessageContainer = document.getElementById('errorMessageContainer');
    const passwordToggle = document.getElementById('password-toggle');

    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordToggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    adminLoginButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Attempt login with admin credentials
        attemptLogin("admin");
    });

    userLoginButton.addEventListener('click', function (event) {
        event.preventDefault();
        // Attempt login with user credentials
        attemptLogin("driver");
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Attempt login when the form is submitted
        attemptLogin();
    });

    async function attemptLogin(userType, defaultUsername, defaultPassword) {
        const username = usernameInput.value;
        const password = passwordInput.value;

        // Clear previous error messages
        clearErrorMessages();

        // Basic validation: check if username and password are provided
        if (!username || !password) {
            displayErrorMessage("Username and password are required.");
            return;
        }

        try {
            // Fetch login details from the server
            const response = await fetch('login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // Redirect to the corresponding home page based on the user's role
                const homePage = userType === "admin" ? "admin_home.html" : "driver_home.html";
                alert(`Redirecting to ${userType} home page.`);
                window.location.href = homePage;
            } else {
                displayErrorMessage(data.message || "Login failed.");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            displayErrorMessage("An error occurred. Please try again later.");
        }
    }

    function displayErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessageContainer.appendChild(errorMessage);
    }

    function clearErrorMessages() {
        while (errorMessageContainer.firstChild) {
            errorMessageContainer.removeChild(errorMessageContainer.firstChild);
        }
    }
});
</script>
