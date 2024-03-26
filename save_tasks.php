<?php
// Connection variables
$servername = "10.0.0.31";
$username = "root";
$password = "";
$dbname = "todolist_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connections
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Clear the existing tasks
$conn->query("DELETE FROM tasks");

// Get the tasks from the request
$tasks = json_decode(file_get_contents('php://input'), true);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO tasks (text, date, isChecked, isPriority) VALUES (?, ?, ?, ?)");

// Assuming tasks is an array of tasks
foreach ($tasks as $task) {
    $stmt->bind_param("ssii", $task["text"], $task["date"], $task["isChecked"], $task["isPriority"]);
    $stmt->execute();
}

echo "New records created successfully";

$stmt->close();
$conn->close();