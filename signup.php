<?php
// Start the session
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connections
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Include your database connection file here (make sure to handle your database connection properly)
    // require 'db_connection.php';

    // Assign POST variables to more convenient variables
    $fullName = $_POST['F-name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirm-password'];

    // Validate the inputs (basic validation)
    if (empty($fullName) || empty($username) || empty($email) || empty($password) || empty($confirmPassword)) {
        echo "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
    } elseif ($password !== $confirmPassword) {
        echo "Passwords do not match.";
    } else {
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare SQL (use your actual table name and fields)
        // The SQL statement you use here should match your database schema
        // IMPORTANT: This is a simplified example; use prepared statements to avoid SQL injection
        $sql = "INSERT INTO users (fullName, username, email, password) VALUES (?, ?, ?, ?)";

        // Assuming $conn is your database connection
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            echo "Error with SQL preparation: " . $conn->error;
        } else {
            $stmt->bind_param("ssss", $fullName, $username, $email, $hashedPassword);
            if ($stmt->execute()) {
                echo "Signup successful!";
                // Redirect to another page or show a success message
                header("Location: login.php");
            } else {
                echo "Error with execution: " . $stmt->error;
            }
        }
    }
}
