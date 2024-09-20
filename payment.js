document.addEventListener("DOMContentLoaded", function () {
    const makePaymentButton = document.getElementById('makePayment');
    const generateReceiptButton = document.getElementById('generateReceipt');

    makePaymentButton.addEventListener('click', function () {
        // Validate fields before making payment
        if (validateFields()) {
            // Add logic to handle payment
            alert('Payment successful!');
        } else {
            alert('Please fill in all fields before making a payment.');
        }
    });

    generateReceiptButton.addEventListener('click', function () {
        // Validate fields before generating receipt
        if (validateFields()) {
            // Add logic to generate receipt
            generateReceipt();
        } else {
            alert('Please fill in all fields before generating a receipt.');
        }
    });

    function validateFields() {
        // Validate that all required fields are filled
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
        const amount = document.getElementById('amount').value.trim();

        return cardNumber !== '' && expiryDate !== '' && cvv !== '' && amount !== '';
    }

    function generateReceipt() {
        // Get customer details
        const cardNumber = document.getElementById('cardNumber').value;
        const amount = document.getElementById('amount').value;

        // Fetch bus details from the database using AJAX
        const busId = 1; // Replace with the actual bus ID or some identifier
        fetchBusDetails(busId)
            .then((busDetails) => {
                // Display printable receipt
                const printableReceipt = `
                    <h2>Receipt</h2>
                    <p><strong>Customer Details:</strong></p>
                    <p>Card Number: ${cardNumber}</p>
                    <p><strong>Payment Details:</strong></p>
                    <p>Amount Paid: ${amount}</p>
                    <p><strong>Bus Details:</strong></p>
                    <p>Departure: ${busDetails.departure}</p>
                    <p>Expected Arrival: ${busDetails.expectedArrival}</p>
                    <p>Bus Details: ${busDetails.busDetails}</p>
                `;

                const receiptWindow = window.open('', '_blank');
                receiptWindow.document.write(printableReceipt);
                receiptWindow.document.close();
                receiptWindow.print();
            })
            .catch((error) => {
                console.error('Error fetching bus details:', error);
                alert('Error fetching bus details. Please try again.');
            });
    }

    function fetchBusDetails(busId) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'payment.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                    reject('Failed to fetch bus details');
                }
            };
            xhr.send(`action=getBusDetails&busId=${busId}`);
        });
    }
});
