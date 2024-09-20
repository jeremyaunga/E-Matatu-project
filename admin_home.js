document.addEventListener("DOMContentLoaded", function () {
    const homeBtn = document.getElementById("homeBtn");
    const busActivitiesBtn = document.getElementById("busActivitiesBtn");
    const routeManagementBtn = document.getElementById("routeManagementBtn");
    const paymentMethodsBtn = document.getElementById("paymentMethodsBtn");
    const employeesBtn = document.getElementById("employeesBtn");
    const logoutBtn = document.getElementById("logoutBtn");

    // Fetch user data and update the DOM
    fetch('data.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userCount').textContent = data.totalUsers;

            // Update the chart with fetched data
            const fundChart = new Chart(document.getElementById('fundChart').getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ["January", "February", "March", "April", "May"],
                    datasets: [{
                        label: "Monthly Fund Collection",
                        data: data.monthlyFundData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                }
            });
        });

    homeBtn.addEventListener("click", function () {
        window.location.href = "home.html";
    });

    busActivitiesBtn.addEventListener("click", function () {
        window.location.href = "bus_activities.html";
    });

    routeManagementBtn.addEventListener("click", function () {
        window.location.href = "route_management.html";
    });

    paymentMethodsBtn.addEventListener("click", function () {
        window.location.href = "payment_methods.html";
    });

    employeesBtn.addEventListener("click", function () {
        window.location.href = "employees.html";
    });

    logoutBtn.addEventListener("click", function () {
        window.location.href = "login.html";
    });
});
