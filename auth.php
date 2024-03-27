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

    // Assign POST variables
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate inputs
    if (empty($username) || empty($password)) {
        echo "Username and password are required.";
    } else {
        // Prepare SQL to select the user from the database
        // IMPORTANT: Use prepared statements to avoid SQL injection
        $sql = "SELECT id, username, password FROM users WHERE username = ?";

        // Assuming $conn is your database connection
        $stmt = $conn->prepare($sql);
        if ($stmt === false) {
            echo "Error with SQL preparation: " . $conn->error;
        } else {
            $stmt->bind_param("s", $username);
            if ($stmt->execute()) {
                $result = $stmt->get_result();
                if ($result->num_rows > 0) {
                    $user = $result->fetch_assoc();
                    // Verify the password
                    if (password_verify($password, $user['password'])) {
                        // Password is correct, so start a new session
                        // Store data in session variables
                        $_SESSION["loggedin"] = true;
                        $_SESSION["id"] = $user['id'];
                        $_SESSION["username"] = $user['username'];

                        // Redirect user to welcome page
                        header("location: main.php");
                    } else {
                        // Display an error message if password is not valid
                        echo "The password you entered was not valid.";
                    }
                } else {
                    // Display an error message if username doesn't exist
                    echo "No account found with that username.";
                }
            } else {
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
    }
}
