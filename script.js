// Event listener for hamburger menu click
document
  .querySelector(".hamburger-menu")
  .addEventListener("click", function () {
    // Select elements from the DOM
    let sidebar = document.querySelector(".sidebar");
    let todo = document.getElementById("todo-container");
    let line1 = document.querySelector(".line-1");
    let line2 = document.querySelector(".line-2");
    let line3 = document.querySelector(".line-3");

    // Check the current state of the sidebar and toggle it
    if (sidebar.style.left === "-15vw") {
      // Expand the sidebar
      todo.style.left = "10vw";
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
  });

// Event listener for sidebar add task button click
document.querySelector(".add").addEventListener("click", function () {
  let addTask = document.querySelector(".task-add");
  // Toggle the display of the add task input
  if (addTask.style.display === "none") {
    addTask.style.display = "block";
  } else {
    addTask.style.display = "none";
  }
});

// Event listener for sidebar delete button click
document.querySelector(".delete").addEventListener("click", function () {
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
document.querySelector(".edit").addEventListener("click", function () {
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
document.addEventListener("DOMContentLoaded", function () {
  // Select add task button and input field
  const addTaskButton = document.getElementById("addTaskButton");
  const dateInput = document.getElementById("date");
  const taskInput = document.getElementById("taskInput");

  // Event listener for the add task button
  addTaskButton.addEventListener("click", function () {
    const taskValue = taskInput.value.trim();
    // Check if task input is not empty
    // Convert both the input date and current date to Date objects and then to time values
    if (
      taskValue &&
      (!dateInput.value ||
        new Date(dateInput.value + "T00:00:00").getTime() >=
          new Date().setHours(0, 0, 0, 0))
    ) {
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
function addTask(text, date, isChecked = false, id, isPriority = false) {
  const todoList = document.querySelector(".todo-list .container");
  const taskPriorityClass = isPriority ? " priority-task" : "";
  // Create HTML string for the new task
  const newTaskHTML = `
        <div class="todo${taskPriorityClass}">
            <input class="todo-state" type="checkbox" id="todo-${id}" ${
    isChecked ? "checked" : ""
  }/>
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
            <div class="priority"><i class="fa${
              isPriority ? "-solid" : "-regular"
            } fa-star fa-lg"></i></div>
        </div>
    `;

  // Insert the new task into the DOM
  todoList.insertAdjacentHTML("beforeend", newTaskHTML);

  const newTask = todoList.lastElementChild;

  // Event listener for delete button
  const deleteButton = newTask.querySelector(".deleteTaskBtn");
  deleteButton.addEventListener("click", function () {
    // Remove the task from DOM and save the state
    this.parentElement.remove();
    saveTasks();
  });

  const priorityButton = newTask.querySelector(".priority");
  priorityButton.addEventListener("click", function () {
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
  editButton.addEventListener("click", function () {
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
    input.addEventListener("blur", function () {
      // Replace input with label and update text
      const newValue = input.value.trim();
      input.replaceWith(label);
      label.textContent = newValue || oldValue;
      // Save updated task state
      saveTasks();
    });

    // Event listener for enter key in input field
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        input.blur();
      }
    });
  });

  // Save task state to local storage
  saveTasks();
}

// Event listener for change in checkbox state
document.addEventListener("change", (event) => {
  if (event.target.matches(".todo-state")) {
    // Save task state when checkbox state changes
    saveTasks();
  }
});

// Function to save tasks to local storage
function saveTasks() {
  const tasks = document.querySelectorAll(".todo");
  const tasksData = [];
  // Iterate over tasks and create an array of task data
  tasks.forEach((task) => {
    const text = task.querySelector(".todo-text").textContent;
    const date = task.querySelector(".todo-date").textContent;
    const isChecked = task.querySelector(".todo-state").checked;
    const isPriority = task
      .querySelector(".priority i")
      .classList.contains("fa-solid");
    console.log({ text, date, isChecked, isPriority });
    tasksData.push({ text, date, isChecked, isPriority });
  });

  // Save tasks array to local storage
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// Function to load tasks from local storage
function loadTasks() {
  const tasksData = JSON.parse(localStorage.getItem("tasks"));

  // Iterate over tasks data and add each task to DOM
  if (tasksData) {
    tasksData.forEach((taskData) => {
      addTask(
        taskData.text,
        taskData.date,
        taskData.isChecked,
        taskIdCounter++,
        taskData.isPriority
      );
    });
  }
}

const lightModeColors = {
  "--primary-color": "#EEEEEE",
  "--secondary-color": "#00ADB5",
  "--tertiary-color": "#393E46",
  "--quaternary-color": "#222831",
};

const darkModeColors = {
  "--primary-color": "#222831",
  "--secondary-color": "#0F4C75",
  "--tertiary-color": "#BBE1FA",
  "--quaternary-color": "#3282B8",
};

const lightmode = document.querySelector(".LDmode");

lightmode.addEventListener("click", function () {
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

function applyColors(colorScheme) {
  const root = document.documentElement; // Reference to the :root element
  Object.keys(colorScheme).forEach((key) => {
    root.style.setProperty(key, colorScheme[key]);
  });
}
