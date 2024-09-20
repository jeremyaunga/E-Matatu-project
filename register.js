document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const emailInput = document.getElementById('email');
    const contactInput = document.getElementById('contact');
    const passwordToggle = document.getElementById('password-toggle');
    const errorMessageContainer = document.getElementById('errorMessageContainer');

    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        passwordToggle.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Validate registration details
        const isValid = validateRegistrationDetails();

        if (isValid) {
            // Send registration data to the server
            registerUser();
        }
    });

    function validateRegistrationDetails() {
        // Add your validation logic here
        // For demonstration purposes, check if all fields are filled
        if (
            usernameInput.value.trim() === '' ||
            passwordInput.value.trim() === '' ||
            confirmPasswordInput.value.trim() === '' ||
            emailInput.value.trim() === '' ||
            contactInput.value.trim() === ''
        ) {
            displayErrorMessage('Please fill in all fields.');
            return false;
        }

        // Check if passwords match
        if (passwordInput.value !== confirmPasswordInput.value) {
            displayErrorMessage('Passwords do not match.');
            return false;
        }

        return true;
    }

    async function registerUser() {
        try {
            const response = await fetch('register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(new FormData(registerForm)).toString(),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                // Registration successful
                alert(data.message);
                // Redirect to the login page after successful registration
                window.location.href = 'login.html';
            } else {
                // Registration failed
                displayErrorMessage(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            displayErrorMessage('An error occurred. Please try again later.');
        }
    }

    function displayErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessageContainer.appendChild(errorMessage);
    }
});
