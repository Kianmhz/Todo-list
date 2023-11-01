document.querySelector('.hamburger-menu').addEventListener('click', function() {
    let sidebar = document.querySelector('.sidebar');
    let todo = document.getElementById('1');
    let line1 = document.querySelector('.line-1');
    let line2 = document.querySelector('.line-2');
    let line3 = document.querySelector('.line-3');
    
    if (sidebar.style.left === '-300px') {
        todo.style.left = '200px';
        sidebar.style.left = '0px';
        line1.style.transform = 'rotate(45deg)';
        line2.style.opacity = '0';
        line3.style.transform = 'rotate(-45deg)';
        line3.style.top = '-16px';
        line1.style.top = '10px';
        line1.style.width = '42.4px';
        line3.style.width = '42.4px';

    } else {
        todo.style.left = '0px';
        line3.style.top = '0px';
        line1.style.top = '0px';
        line1.style.width = '100%';
        line3.style.width = '100%';
        sidebar.style.left = '-300px';
        line1.style.transform = 'rotate(0deg)';
        line2.style.opacity = '1';
        line3.style.transform = 'rotate(0deg)';
    }
});

document.querySelector('.add').addEventListener('click', function() {
    let addTask = document.querySelector('.task-input');

    if (addTask.style.display === 'none') {
        addTask.style.display = 'block';
    } else {
        addTask.style.display = 'none';
    }
});

document.querySelector('.delete').addEventListener('click', function() {
    let removeTask = document.querySelector('.deleteTaskBtn');

    if (removeTask.style.display === 'none') {
        removeTask.style.display = 'block';
    } else {
        removeTask.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('addTaskButton');
    const todoList = document.querySelector('.todo-list .container');
    const taskInput = document.getElementById('taskInput');

    let taskIdCounter = 1;

    // Function to add a task
    addTaskButton.addEventListener('click', function() {
        const taskValue = taskInput.value.trim(); // Get the user input and remove any spaces from start/end

        if (taskValue) {  // Only add the task if it's not empty
            const newTaskHTML = `
                <div class="todo">
                    <input class="todo-state" type="checkbox" id="todo-${taskIdCounter}" />
                    <div class="checkbox">
                        <div class="checkmark"></div>
                        <span class="top"></span>
                        <span class="right"></span>
                        <span class="left"></span>
                        <span class="bottom"></span>
                    </div>
                    <label class="todo-text" for="todo-${taskIdCounter}">${taskValue}</label>
                    <button class="deleteTaskBtn" style="display:none;">Delete</button>
                </div>
            `;

            todoList.insertAdjacentHTML('beforeend', newTaskHTML);
            
            // Add event listener to the delete button of the newly added task
            const lastTaskDeleteButton = todoList.lastElementChild.querySelector('.deleteTaskBtn');
            lastTaskDeleteButton.addEventListener('click', function() {
                this.parentElement.remove(); // This will delete the task when its delete button is clicked
            });

            taskIdCounter++;
            taskInput.value = '';  // Clear the input field
        } else {
            alert('Please enter a valid task!');
        }
    });
});

