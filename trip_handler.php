<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check the action parameter sent from the JavaScript
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'startTrip':
                // Add logic for starting a trip
                // You can access the driver's ID from $_POST['driverId'] and perform the necessary database updates
                echo 'Trip started successfully!';
                break;

            case 'endTrip':
                // Add logic for ending a trip
                // You can access the driver's ID from $_POST['driverId'] and perform the necessary database updates
                echo 'Trip ended successfully!';
                break;

            default:
                echo 'Invalid action';
                break;
        }
    } else {
        echo 'Action parameter missing';
    }
} else {
    echo 'Invalid request method';
}

?>
