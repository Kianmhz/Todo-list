<?php
session_start();
// Connection variables
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

if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SESSION["loggedin"]) {
    // Clear the existing tasks
    $stmt = $conn->prepare("DELETE FROM tasks WHERE user_id = ?");
    
    // Bind the session ID to the prepared statement as an integer
    $stmt->bind_param("i", $_SESSION["id"]);
    $stmt->execute();

    // Close the statement
    $stmt->close();

    // Get the tasks from the request
    $tasks = json_decode(file_get_contents('php://input'), true);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO tasks (text, date, isChecked, isPriority, user_id) VALUES (?, ?, ?, ?, ?)");

    // Assuming tasks is an array of tasks
    foreach ($tasks as $task) {
        $stmt->bind_param("ssiii", $task["text"], $task["date"], $task["isChecked"], $task["isPriority"], $_SESSION["id"]);
        $stmt->execute();
    }

    echo "New records created successfully";

    $stmt->close();
    $conn->close();
}
?>
