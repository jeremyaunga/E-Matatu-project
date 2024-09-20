document.addEventListener("DOMContentLoaded", function () {
    // Replace [Driver Name] with the actual driver's name
    const driverName = "whale";
    document.querySelector('.header h1').innerText = `Welcome, ${driverName}!`;

    const startTripButton = document.getElementById('startTrip');
    const endTripButton = document.getElementById('endTrip');

    startTripButton.addEventListener('click', function () {
        // Add logic for starting a trip
        startTrip();
    });

    endTripButton.addEventListener('click', function () {
        // Add logic for ending a trip
        endTrip();
    });

    function startTrip() {
        // Replace this with actual logic to start a trip
        // Example: Make an AJAX or Fetch API request to update trip status in the database
        // You might want to send the driver's ID or other relevant information
        fetch('trip_handler.php?action=startTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'driverId=1', // Replace with the actual driver's ID or relevant information
        })
            .then(response => response.text())
            .then(message => {
                alert(message);
                // You can perform additional actions after starting the trip
            })
            .catch(error => console.error('Error starting trip:', error));
    }

    function endTrip() {
        //  an AJAX or Fetch API request to update trip status in the database
        // To send the driver's ID or other relevant information
        fetch('trip_handler.php?action=endTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'driverId=1', // Replace with the actual driver's ID or relevant information
        })
            .then(response => response.text())
            .then(message => {
                alert(message);
                // You can perform additional actions after ending the trip
            })
            .catch(error => console.error('Error ending trip:', error));
    }
});
