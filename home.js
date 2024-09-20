document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const usernameDisplay = document.getElementById('usernameDisplay');
    const logoutForm = document.getElementById('logoutForm');
    const paymentMethodsSection = document.getElementById('paymentMethodsSection');
    const bookingHistorySection = document.getElementById('bookingHistorySection');
    const specialOffersSection = document.getElementById('specialOffersSection');

    // Check if the user is logged in
    const username = localStorage.getItem('username');
/*
    if (username) {
        // Display welcome message
        usernameDisplay.textContent = username;
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'login.html';
    }
*/
    // Logout form submission
    logoutForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Clear user data and redirect to login page
        localStorage.removeItem('username');
        window.location.href = 'user_home.html';
    });

    // Load payment methods, booking history, and special offers
    loadPaymentMethods();
    loadBookingHistory();
    loadSpecialOffers();

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get login form data
        const formData = new FormData(loginForm);

        // Make an AJAX request to the login PHP script
        fetch('user.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store username in local storage for future reference
                localStorage.setItem('username', formData.get('loginUsername'));
                // Redirect to home page on successful login
                window.location.href = 'user_home.html';
            } else {
                // Show error message for login failure
                displayErrorMessage(data.message);
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            displayErrorMessage('An error occurred. Please try again later.');
        });
    });
});

// Function to display error messages
function displayErrorMessage(message) {
    // Replace this with your actual error message display logic
    alert(message);
}
