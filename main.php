<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <script src="https://kit.fontawesome.com/bc8482cdd5.js" crossorigin="anonymous"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="main.css" />
  <title>Todo-list</title>
</head>

<body>
  <div class="hamburger-menu">
    <div class="line line-1"></div>
    <div class="line line-2"></div>
    <div class="line line-3"></div>
  </div>

  <!-- sidebar -->
  <nav class="sidebar">
    <ul>
      <li class="add">Add a task</li>
      <div class="task-add">
        <input type="text" placeholder="Enter your task" id="taskInput" />
        <input type="date" id="date" />
        <button id="addTaskButton"><i class="fa-solid fa-plus"></i></button>
      </div>
      <li class="edit">Edit a task</li>
      <li class="delete">Delete a task</li>
      <li class="LDmode">Switch to Dark mode</li>
    </ul>
    <footer>
      <div class="footer-line"></div>
      <?php if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] == true): ?>
          <a href="/logout.php">
              <strong>Logout</strong>
          </a>
      <?php else: ?>
          <a href="/login.php">
              <strong>Log in</strong>
          </a>
      <?php endif; ?>
      <div class="footer-line"></div>
  </footer>
    <!-- <footer>
        <div class="footer-line"></div>
          <a href="https://github.com/Kianmhz">
            Designed by <strong>Kianmhz</strong>
          </a>
        <div class="footer-line"></div>
      </footer> -->
  </nav>
  <!-- todo list -->
  <div class="todo-list">
    <div class="container" id="todo-container">
      <?php
      // Check if the user is logged in, otherwise use 'Guest'
      $username = isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true ? htmlspecialchars($_SESSION["username"]) : 'My';
      ?>
      <h1 class="todo-title"><?php echo $username; ?> To-do List</h1>
    </div>
  </div>
  <script src="script.js"></script>
</body>

</html>