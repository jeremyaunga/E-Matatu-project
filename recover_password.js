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
