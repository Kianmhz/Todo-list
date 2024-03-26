<?php
// Connection variables
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolist_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, text, date, isChecked, isPriority FROM tasks";
$result = $conn->query($sql);

$tasks = [];

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        // changes phps defual bollean values of 0 and 1 to true and false
        $row["isChecked"] = $row["isChecked"] == 1;
        $row["isPriority"] = $row["isPriority"] == 1;
        $tasks[] = $row;
    }
    echo json_encode($tasks);
} else {
    echo "0 results";
}
$conn->close();