document.addEventListener("DOMContentLoaded", function () {
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    const amountInput = document.getElementById('amount');
    const fromInput = document.getElementById('from');
    const destinationInput = document.getElementById('destination');

    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();
        calculateAmount();
    });

    function calculateAmount() {
        // Example function to calculate the amount based on distance or other logic
        // You may replace this with your actual calculation logic
        const baseAmount = 50;
        const distance = calculateDistance(fromInput.value, destinationInput.value);
        const amount = baseAmount + distance * 20;
        amountInput.value = amount.toFixed(2);
    }

    function calculateDistance(from, destination) {
        // Example function to calculate distance
        // You may replace this with your actual calculation logic or API call
        const distance = Math.abs(destination.length - from.length);
        return distance;
    }

    // Login modal
    const loginModal = document.getElementById('loginModal');
    const loginOpenButton = document.getElementById('loginButton');
    const loginCloseButton = document.getElementById('loginClose');
    const loginForm = document.getElementById('loginForm');
    const loginUsernameInput = document.getElementById('loginUsername');
    const loginPasswordInput = document.getElementById('loginPassword');

    loginOpenButton.addEventListener('click', function () {
        loginModal.style.display = 'block';
    });

    loginCloseButton.addEventListener('click', function () {
        loginModal.style.display = 'none';
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Add your login logic here
        // For demonstration, redirect to the main page after successful login
        window.location.href = 'main.html';
        // Replace this with your actual login logic
    });
    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get registration form data
        const formData = new FormData(registerForm);

        // Make an AJAX request to the registration PHP script
        fetch('user.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success message and redirect to login form
                alert(data.message);
                loginModal.style.display = 'block';
            } else {
                // Show error message for registration failure
                displayErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Error during registration:', error);
            displayErrorMessage('An error occurred. Please try again later.');
        });
    });

    // Register modal
    const registerModal = document.getElementById('registerModal');
    const registerOpenButton = document.getElementById('registerButton');
    const registerCloseButton = document.getElementById('registerClose');
    const registerUsernameInput = document.getElementById('registerUsername');
    const registerPasswordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerEmailInput = document.getElementById('registerEmail');
    const registerPhoneInput = document.getElementById('registerPhone');

    registerOpenButton.addEventListener('click', function () {
        registerModal.style.display = 'block';
    });

    registerCloseButton.addEventListener('click', function () {
        registerModal.style.display = 'none';
    });

    // Close the modals if the user clicks outside the modal
    window.addEventListener('click', function (event) {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    function displayErrorMessage(message) {
        alert(message);
    }
});
