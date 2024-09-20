// login.js
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
