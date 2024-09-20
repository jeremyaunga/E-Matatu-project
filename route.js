document.addEventListener("DOMContentLoaded", function () {
    // Set up event listener for update route button
    const updateRouteButton = document.getElementById('updateRoute');
    updateRouteButton.addEventListener('click', function () {
        // Handle updating route details (replace with your logic)
        alert('Update Route Details');
    });

    // Set up event listener for add new route button
    const addNewRouteButton = document.getElementById('addNewRoute');
    addNewRouteButton.addEventListener('click', function () {
        // Display a window for adding a new route
        displayAddNewRouteWindow();
    });
});

function displayAddNewRouteWindow() {
    // Create a modal or a custom window for adding a new route
    const newRouteWindow = window.open('', 'Add New Route', 'width=400,height=300,scrollbars=yes');
    
    // Populate the window with form elements for new route details
    newRouteWindow.document.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add New Route</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 20px;
                }

                h2 {
                    color: #333;
                }

                form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 8px;
                }

                input {
                    padding: 8px;
                    margin-bottom: 16px;
                }

                button {
                    padding: 10px;
                    background-color: #4caf50;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <h2>Add New Route</h2>
            <form id="newRouteForm">
                <label for="routeName">Route Name:</label>
                <input type="text" id="routeName" name="routeName" required><br>

                <label for="numBuses">Number of Buses:</label>
                <input type="number" id="numBuses" name="numBuses" required><br>

                <button type="button" onclick="saveNewRoute()">Save Changes</button>
            </form>
        </body>
        </html>
    `);
}

function saveNewRoute() {
    const routeName = window.opener.document.getElementById('routeName').value;
    const numBuses = window.opener.document.getElementById('numBuses').value;

    if (!routeName || !numBuses || isNaN(numBuses)) {
        alert('Please enter valid route details.');
        return;
    }

    const routeData = {
        routeName: routeName,
        numBuses: parseInt(numBuses),
    };

    fetch('save_route.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(routeData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('New route saved successfully!');
            window.close();
        } else {
            alert('Failed to save new route. ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while saving the new route.');
    });
}
