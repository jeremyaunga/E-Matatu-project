document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the workers table
    fetchWorkerData();

    // Initialize and show the map
    initMap();

    // Handle the "Book Ticket" button click
    const bookTicketButton = document.getElementById('bookTicket');
    bookTicketButton.addEventListener('click', function () {
        // Redirect to the user_home page for booking
        window.location.href = 'user_home.html';
    });

    // Handle the "Make Payment" button click
    const makePaymentButton = document.getElementById('makePayment');
    makePaymentButton.addEventListener('click', function () {
        // Redirect to the e_pay page for payment
        window.location.href = 'e_pay.html';
    });
});

function fetchWorkerData() {
    // Use fetch or other methods to get data from the server
    fetch('emproyeeData.php')
        .then(response => response.json())
        .then(data => {
            // Update the workerCount span with the fetched data
            document.getElementById('emproyeeCount').innerText = data.length;

            // Sample data for the chart
            const chartData = {
                labels: data.map(worker => worker.month),
                datasets: [{
                    label: "Number of emproyees",
                    data: data.map(worker => worker.workerCount),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            const chartConfig = {
                type: 'bar',
                data: chartData,
            };

            const ctx = document.getElementById('workerChart').getContext('2d');
            new Chart(ctx, chartConfig);
        })
        .catch(error => console.error('Error fetching worker data:', error));
}

function initMap() {
    const mapOptions = {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
}
