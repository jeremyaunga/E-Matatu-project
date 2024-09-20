document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display graph data
    fetchGraphData();

    // Set up event listener for bus search
    const busSearchInput = document.getElementById('busSearch');
    busSearchInput.addEventListener('input', function () {
        const searchTerm = busSearchInput.value.trim();
        // Fetch and display bus details based on the search term
        fetchBusDetails(searchTerm);
    });

    // Set up event listener for remove bus button
    const removeBusButton = document.getElementById('removeBus');
    removeBusButton.addEventListener('click', function () {
        const confirmDelete = confirm("Are you sure you want to remove this bus?");
        if (confirmDelete) {
            // Perform the actual delete operation (replace with your logic)
            alert("Bus removed successfully!");
            // Optionally, you can fetch and display updated graph and bus details
            fetchGraphData();
            fetchBusDetails(busSearchInput.value.trim());
        }
    });

    // Set up event listener for update bus button
    const updateBusButton = document.getElementById('updateBus');
    updateBusButton.addEventListener('click', function () {
        // Enable editing of bus details (replace with your logic)
        enableEditing();
    });

    // Set up event listener for save changes button
    const saveChangesButton = document.getElementById('saveChanges');
    saveChangesButton.addEventListener('click', function () {
        // Save the edited bus details (replace with your logic)
        saveChanges();
    });

    // Set up event listener for new registration button
    const newRegistrationButton = document.getElementById('newRegistration');
    newRegistrationButton.addEventListener('click', function () {
        // Open a new window for new registration
        openNewRegistrationWindow();
    });

    // Set up event listener for save new bus button
    const saveNewBusButton = document.getElementById('saveNewBus');
    saveNewBusButton.addEventListener('click', function () {
        // Save the new bus details (replace with your logic)
        saveNewBus();
    });
});

function openNewRegistrationWindow() {
    // Open a new window for new registration
    const newWindow = window.open('new_registration.html', 'New Registration', 'width=400,height=400');
    newWindow.focus();
}

// Add other functions as needed

// The rest of your existing JavaScript code...
document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display graph data
    fetchGraphData();

    // Set up event listener for bus search
    const busSearchInput = document.getElementById('busSearch');
    busSearchInput.addEventListener('input', function () {
        const searchTerm = busSearchInput.value.trim();
        // Fetch and display bus details based on the search term
        fetchBusDetails(searchTerm);
    });

    // Set up event listener for remove bus button
    const removeBusButton = document.getElementById('removeBus');
    removeBusButton.addEventListener('click', function () {
        const confirmDelete = confirm("Are you sure you want to remove this bus?");
        if (confirmDelete) {
            // Perform the actual delete operation (replace with your logic)
            alert("Bus removed successfully!");
            // Optionally, you can fetch and display updated graph and bus details
            fetchGraphData();
            fetchBusDetails(busSearchInput.value.trim());
        }
    });

    // Set up event listener for update bus button
    const updateBusButton = document.getElementById('updateBus');
    updateBusButton.addEventListener('click', function () {
        // Enable editing of bus details (replace with your logic)
        enableEditing();
    });

    // Set up event listener for save changes button
    const saveChangesButton = document.getElementById('saveChanges');
    saveChangesButton.addEventListener('click', function () {
        // Save the edited bus details (replace with your logic)
        saveChanges();
    });

    // Set up event listener for new registration button
    const newRegistrationButton = document.getElementById('newRegistration');
    newRegistrationButton.addEventListener('click', function () {
        // Initiate a new registration (replace with your logic)
        initiateNewRegistration();
    });

    // Set up event listener for save new bus button
    const saveNewBusButton = document.getElementById('saveNewBus');
    saveNewBusButton.addEventListener('click', function () {
        // Save the new bus details (replace with your logic)
        saveNewBus();
    });
});

function fetchGraphData() {
    // Fetch and display graph data
    // Replace this with actual data fetching logic
    const data = {
        labels: ["Bus1", "Bus2", "Bus3", "Bus4", "Bus5"],
        datasets: [{
            label: "Number of Trips",
            data: [10, 15, 8, 12, 20],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    // Render graph
    renderGraph(data);
}

function fetchBusDetails(busName) {
    // Fetch and display bus details based on the search term
    // Replace this with actual data fetching logic
    const busDetails = {
        driver: "John Doe",
        conductor: "Jane Doe",
        route: "Route 1",
        totalTrips: 20,
        tripsDone: 12,
        remainingTrips: 8,
        registrationNumber: "ABC123",
    };

    // Render bus details
    renderBusDetails(busDetails);
}

function renderGraph(data) {
    const ctx = document.getElementById('busGraph').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: data,
    });
}

function renderBusDetails(busDetails) {
    const detailsContainer = document.getElementById('busDetails');
    detailsContainer.innerHTML = `
        <h2>Bus Details</h2>
        <p>Driver: <span id="driver">${busDetails.driver}</span></p>
        <p>Conductor: <span id="conductor">${busDetails.conductor}</span></p>
        <p>Route: <span id="route">${busDetails.route}</span></p>
        <p>Total Trips: <span id="totalTrips">${busDetails.totalTrips}</span></p>
        <p>Trips Done: <span id="tripsDone">${busDetails.tripsDone}</span></p>
        <p>Remaining Trips: <span id="remainingTrips">${busDetails.remainingTrips}</span></p>
        <p>Registration Number: <span id="registrationNumber">${busDetails.registrationNumber}</span></p>
    `;
}

function enableEditing() {
    // Enable editing of bus details
    document.getElementById('driver').contentEditable = true;
    document.getElementById('conductor').contentEditable = true;
    document.getElementById('route').contentEditable = true;
    document.getElementById('totalTrips').contentEditable = true;
    document.getElementById('tripsDone').contentEditable = true;
    document.getElementById('remainingTrips').contentEditable = true;
    document.getElementById('registrationNumber').contentEditable = true;

    // Change the text of the save changes button
    document.getElementById('saveChanges').innerText = 'Save Changes';
}

function saveChanges() {
    // Save the edited bus details
    // Replace this with actual logic to save changes (e.g., make an API call)
    alert('Changes saved successfully!');

    // After saving changes, disable editing and revert the button text
    disableEditing();
}

function initiateNewRegistration() {
    // Clear existing bus details and enable editing for new registration
    clearBusDetails();
    enableEditing();

    // Change the text of the save changes button
    document.getElementById('saveChanges').innerText = 'Save New Registration';
}

function saveNewBus() {
    // Save the new bus details
    // Replace this with actual logic to save new bus (e.g., make an API call)
    alert('New bus registered successfully!');

    // After saving new bus, disable editing and revert the button text
    disableEditing();
}

function disableEditing() {
    // Disable editing of bus details
    document.getElementById('driver').contentEditable = false;
    document.getElementById('conductor').contentEditable = false;
    document.getElementById('route').contentEditable = false;
    document.getElementById('totalTrips').contentEditable = false;
    document.getElementById('tripsDone').contentEditable = false;
    document.getElementById('remainingTrips').contentEditable = false;
    document.getElementById('registrationNumber').contentEditable = false;

    // Revert the text of the save changes button
    document.getElementById('saveChanges').innerText = 'Save Changes';
}

// Add more functions as needed
