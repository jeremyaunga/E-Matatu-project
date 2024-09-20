<?php
include 'connection.php';

// Function to fetch all employees from the database
function getAllEmployees() {
    global $conn;

    $sql = "SELECT * FROM employees";
    $result = $conn->query($sql);

    $employees = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $employees[] = $row;
        }
    }

    return $employees;
}

// Function to delete an employee from the database
function deleteEmployee($employeeId) {
    global $conn;

    $sql = "DELETE FROM employees WHERE id = $employeeId";

    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}

// Handle AJAX requests
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET['action'])) {
    if ($_GET['action'] == 'getEmployees') {
        $employees = getAllEmployees();
        echo json_encode($employees);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Handle editing and creating employees
    if (isset($_POST['action'])) {
        if ($_POST['action'] == 'editEmployee') {
            // Add logic to update employee details in the database
            $employeeId = $_POST['id'];
            $newName = $_POST['name'];
            $newRole = $_POST['role'];
            $newContactNumber = $_POST['contact_number'];
            $newHireDate = $_POST['hire_date'];
            $newMonth = $_POST['month'];
            $newSalary = $_POST['salary'];
            $newWorkerCount = $_POST['workerCount'];

            $sql = "UPDATE employees SET name='$newName', role='$newRole', contact_number='$newContactNumber', hire_date='$newHireDate', month='$newMonth', salary='$newSalary', workerCount='$newWorkerCount' WHERE id=$employeeId";

            if ($conn->query($sql) === TRUE) {
                echo "Employee updated successfully";
            } else {
                echo "Error updating employee: " . $conn->error;
            }
        } elseif ($_POST['action'] == 'createEmployee') {
            // Add logic to insert a new employee into the database
            $newName = $_POST['name'];
            $newRole = $_POST['role'];
            $newContactNumber = $_POST['contact_number'];
            $newHireDate = $_POST['hire_date'];
            $newMonth = $_POST['month'];
            $newSalary = $_POST['salary'];
            $newWorkerCount = $_POST['workerCount'];

            $sql = "INSERT INTO employees (name, role, contact_number, hire_date, month, salary, workerCount) VALUES ('$newName', '$newRole', '$newContactNumber', '$newHireDate', '$newMonth', '$newSalary', '$newWorkerCount')";

            if ($conn->query($sql) === TRUE) {
                echo "New employee created successfully";
            } else {
                echo "Error creating new employee: " . $conn->error;
            }
        }
    }
}

// Close the database connection
$conn->close();
?>
