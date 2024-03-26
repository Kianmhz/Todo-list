// Hide task-related buttons on load when sidebar is closed
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".task-add").style.display = "none";
  document
    .querySelectorAll(".deleteTaskBtn")
    .forEach((btn) => (btn.style.display = "none"));
  document
    .querySelectorAll(".editTaskBtn")
    .forEach((btn) => (btn.style.display = "none"));
});

// Event listener for hamburger menu click
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  // Select elements from the DOM
  let sidebar = document.querySelector(".sidebar");
  let mobile_sidebar = document.querySelector(".mobile-sidebar");
  let todo = document.getElementById("todo-container");
  let line1 = document.querySelector(".line-1");
  let line2 = document.querySelector(".line-2");
  let line3 = document.querySelector(".line-3");

  if (sidebar) {
    // Check if sidebar is in its initial state or hasn't been set by JS yet
    if (sidebar.style.left === "-15vw" || sidebar.style.left === "") {
      // Expand the sidebar
      todo.style.left = "7.5vw";
      sidebar.style.left = "0px";
      // Animate hamburger icon to cross
      line1.style.transform = "rotate(45deg)";
      line2.style.opacity = "0";
      line3.style.transform = "rotate(-45deg)";
      line3.style.top = "-16px";
      line1.style.top = "10px";
      // Using pythagoras theorem to calculate the width of the lines
      line1.style.width = "42.4px";
      line3.style.width = "42.4px";
    } else {
      // Collapse the sidebar
      todo.style.left = "0";
      line3.style.top = "0px";
      line1.style.top = "0px";
      line1.style.width = "100%";
      line3.style.width = "100%";
      sidebar.style.left = "-15vw";
      // Animate hamburger icon back to original state
      line1.style.transform = "rotate(0deg)";
      line2.style.opacity = "1";
      line3.style.transform = "rotate(0deg)";
      // Hide task-related buttons
      document.querySelector(".task-add").style.display = "none";
      document
        .querySelectorAll(".deleteTaskBtn")
        .forEach((btn) => (btn.style.display = "none"));
      document
        .querySelectorAll(".editTaskBtn")
        .forEach((btn) => (btn.style.display = "none"));
    }
  }
  if (mobile_sidebar) {
    // Check if mobile_sidebar is in its initial state or hasn't been set by JS yet
    if (
      mobile_sidebar.style.bottom === "-280px" ||
      mobile_sidebar.style.bottom === ""
    ) {
      mobile_sidebar.style.bottom = "0px";
      // Animate hamburger icon to cross
      line1.style.transform = "rotate(45deg)";
      line2.style.opacity = "0";
      line3.style.transform = "rotate(-45deg)";
      line3.style.top = "-16px";
      line1.style.top = "10px";
      // Using pythagoras theorem to calculate the width of the lines
      line1.style.width = "42.4px";
      line3.style.width = "42.4px";
    } else {
      mobile_sidebar.style.bottom = "-280px";
      line3.style.top = "0px";
      line1.style.top = "0px";
      line1.style.width = "100%";
      line3.style.width = "100%";
      // Animate hamburger icon back to original state
      line1.style.transform = "rotate(0deg)";
      line2.style.opacity = "1";
      line3.style.transform = "rotate(0deg)";
      // Hide task-related buttons
      document.querySelector(".task-add").style.display = "none";
      document
        .querySelectorAll(".deleteTaskBtn")
        .forEach((btn) => (btn.style.display = "none"));
      document
        .querySelectorAll(".editTaskBtn")
        .forEach((btn) => (btn.style.display = "none"));
    }
  }
});

const adjustSidebarForDevice = () => {
  let nav = document.querySelector("nav");
  // Check if the device width is less than or equal to 768px (common breakpoint for mobile devices)
  if (window.innerWidth <= 1000) {
    if (nav && !nav.classList.contains("mobile-sidebar")) {
      nav.classList.add("mobile-sidebar");
      nav.classList.remove("sidebar");
      nav.style.cssText = "";
    }
  } else {
    if (nav && nav.classList.contains("mobile-sidebar")) {
      nav.classList.add("sidebar");
      nav.classList.remove("mobile-sidebar");
      nav.style.cssText = "";
    }
  }
};

adjustSidebarForDevice();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    adjustSidebarForDevice();
  }, 250); // Adjust the timeout value as needed
});

// Event listener for sidebar add task button click
document.querySelector(".add").addEventListener("click", () => {
  let addTask = document.querySelector(".task-add");
  // Toggle the display of the add task input
  if (addTask.style.display === "none") {
    addTask.style.display = "block";
  } else {
    addTask.style.display = "none";
  }
});

// Event listener for sidebar delete button click
document.querySelector(".delete").addEventListener("click", () => {
  let removeTasks = document.querySelectorAll(".deleteTaskBtn");
  // Toggle the display of delete buttons for each task
  for (const removeTask of removeTasks) {
    if (removeTask.style.display === "none") {
      removeTask.style.display = "block";
    } else {
      removeTask.style.display = "none";
    }
  }
});

// Event listener for sidebar edit button click
document.querySelector(".edit").addEventListener("click", () => {
  let editTasks = document.querySelectorAll(".editTaskBtn");
  // Toggle the display of edit buttons for each task
  for (const editTask of editTasks) {
    if (editTask.style.display === "none") {
      editTask.style.display = "block";
    } else {
      editTask.style.display = "none";
    }
  }
});

// Initialize task ID counter
let taskIdCounter = 1;

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Select add task button and input field
  const addTaskButton = document.getElementById("addTaskButton");
  const dateInput = document.getElementById("date");
  const taskInput = document.getElementById("taskInput");

  // Event listener for the add task button
  addTaskButton.addEventListener("click", () => {
    const taskValue = taskInput.value.trim();
    // Check if task input is not empty
    // Convert both the input date and current date to Date objects and then to time values
    if (taskValue &&(!dateInput.value || new Date(dateInput.value + "T00:00:00").getTime() >= new Date().setHours(0, 0, 0, 0))) {
      // Add task and increment ID counter
      addTask(taskValue, dateInput.value, false, taskIdCounter++);
      // Reset input field
      taskInput.value = "";
      dateInput.value = "";
    } else {
      alert("Please enter a valid task and a future date or no date at all!");
    }
  });

  // Load tasks from local storage
  loadTasks();
});

// Function to add a new task to the list
const addTask = (text, date, isChecked = false, id, isPriority = false) => {
  const todoList = document.querySelector(".todo-list .container");
  const taskPriorityClass = isPriority ? " priority-task" : "";
  // Create HTML string for the new task
  const newTaskHTML = `
        <div class="todo${taskPriorityClass}">
            <input class="todo-state" type="checkbox" id="todo-${id}" ${isChecked ? "checked" : ""}/>
            <div class="checkbox">
                <div class="checkmark"></div>
                <span class="top"></span>
                <span class="right"></span>
                <span class="left"></span>
                <span class="bottom"></span>
            </div>
            <label class="todo-text" for="todo-${id}">${text}</label>
            <small class="todo-date">${date}</small>
            <div class="editTaskBtn" style="display:none; color:lightblue; cursor:pointer;"><i class="fa-regular fa-pen-to-square"></i></div>
            <div class="deleteTaskBtn" style="display:none; color:red; cursor:pointer;"><i class="fa-regular fa-trash-can"></i></div>
            <div class="priority"><i class="fa${isPriority ? "-solid" : "-regular"} fa-star fa-lg"></i></div>
        </div>
    `;

  // Insert the new task into the DOM
  todoList.insertAdjacentHTML("beforeend", newTaskHTML);

  const newTask = todoList.lastElementChild;

  // Event listener for delete button
  const deleteButton = newTask.querySelector(".deleteTaskBtn");
  deleteButton.addEventListener("click", function() {
    // Remove the task from DOM and save the state
    this.parentElement.remove();
    saveTasks();
  });

  const priorityButton = newTask.querySelector(".priority");
  priorityButton.addEventListener("click", function() {
    // Toggle priority status and class
    const parentTask = this.closest(".todo");
    if (parentTask.classList.contains("priority-task")) {
      this.innerHTML = '<i class="fa-regular fa-star fa-lg"></i>';
      parentTask.classList.remove("priority-task");
    } else {
      parentTask.classList.add("priority-task");
      this.innerHTML = '<i class="fa-solid fa-star fa-lg""></i>';
      // Select the title element
      const titleElement = document.querySelector(".todo-title");
      // Move the task to the top, but after the title
      todoList.insertBefore(parentTask, titleElement.nextSibling);
    }
    saveTasks();
  });

  // Event listener for edit button
  const editButton = newTask.querySelector(".editTaskBtn");
  editButton.addEventListener("click", function() {
    // Replace label with input field for editing
    const label = this.parentNode.querySelector(".todo-text");
    const oldValue = label.textContent;
    const input = document.createElement("input");
    input.type = "text";
    input.value = oldValue;
    label.replaceWith(input);

    // Focus on the input field
    input.focus();
    // Event listener for when input loses focus
    input.addEventListener("blur", () => {
      // Replace input with label and update text
      const newValue = input.value.trim();
      input.replaceWith(label);
      label.textContent = newValue || oldValue;
      // Save updated task state
      saveTasks();
    });

    // Event listener for enter key in input field
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });
  });

  // Save task state to local storage
  saveTasks();
};

// Event listener for change in checkbox state
document.addEventListener("change", (event) => {
  if (event.target.matches(".todo-state")) {
    // Save task state when checkbox state changes
    saveTasks();
  }
});

// Function to save tasks to server using PHP
const saveTasks = () => {
  const tasks = document.querySelectorAll(".todo");
  const tasksData = [];
  // Iterate over tasks and create an array of task data
  tasks.forEach((task) => {
    const text = task.querySelector(".todo-text").textContent;
    const date = task.querySelector(".todo-date").textContent;
    const isChecked = task.querySelector(".todo-state").checked;
    const isPriority = task.querySelector(".priority i").classList.contains("fa-solid");
    console.log({ text, date, isChecked, isPriority });
    tasksData.push({ text, date, isChecked, isPriority });
  });

  fetch('saveTasks.php', { // Send a fetch request to saveTasks.php
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(tasksData) // Convert tasks array to JSON string and set as request body
})
};

const loadTasks = async () => {
  try {
    // Send a fetch request to load_tasks.php and wait for the response
    const response = await fetch('load_tasks.php');
    // Wait for the response to be parsed as JSON
    const tasksData = await response.json();

    // Check if tasksData is defined and has data
    if (tasksData) {
      // Iterate over tasks data and add each task to the DOM
      tasksData.forEach((taskData) => {
        addTask(
          taskData.text,
          taskData.date,
          taskData.isChecked,
          taskIdCounter++, // Make sure taskIdCounter is defined somewhere in your code
          taskData.isPriority
        );
      });
    }
  } catch (error) {
    // Handle any errors that occur during the fetch or data processing
    console.error('Error loading tasks:', error);
  }
};


// Event listener for dark mode toggle
const lightModeColors = {
  "--primary-color": "#EEEEEE",
  "--secondary-color": "#00ADB5",
  "--tertiary-color": "#393E46",
  "--quaternary-color": "#222831",
};

const darkModeColors = {
  "--primary-color": "#222831",
  "--secondary-color": "#0F4C75",
  "--tertiary-color": "#95b4c8",
  "--quaternary-color": "#3282B8",
};

const lightmode = document.querySelector(".LDmode");

lightmode.addEventListener("click", () => {
  if (document.body.classList.contains("dark-mode")) {
    lightmode.innerHTML = "Switch to Dark mode";
    // Apply light mode colors
    applyColors(lightModeColors);
  } else {
    lightmode.innerHTML = "Switch to Light mode";
    // Apply dark mode colors
    applyColors(darkModeColors);
  }
  document.body.classList.toggle("dark-mode");
});

const applyColors = (colorScheme) => {
  const root = document.documentElement;
  Object.keys(colorScheme).forEach((key) => {
    root.style.setProperty(key, colorScheme[key]);
  });
};