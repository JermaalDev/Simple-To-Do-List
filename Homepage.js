// linking the html elements with variables to use in js 
const taskInput = document.getElementById("task-text");
const taskList = document.getElementById("task-list");

// Load tasks from localStorage
let taskDisplay = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add task
function addTask() {
    let task = taskInput.value.trim();
    if (task !== "") {
        taskDisplay.push({ text: task, status: "pending" });
        taskInput.value = "";
        saveTasks();
        displayTasks();
    } else {
        alert("Please enter a task");
    }
}

// Link the input field to detect the Enter key press to add a task
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { 
        addTask(); 
    }
});

// Function to display tasks
function displayTasks(filter = "all") {
    taskList.innerHTML = "";  // Clear current task list

    // Filter tasks based on the selected filter
    let filteredTasks = taskDisplay.filter(task => 
        filter === "all" || task.status === filter
    );

    // If no tasks match the filter, show a message
    if (filteredTasks.length === 0) {
        const message = document.createElement("li");
        message.textContent = `There are no ${filter} tasks.`;
        message.style.fontStyle = "italic";
        taskList.appendChild(message);
    } else {
        filteredTasks.forEach((task, index) => {
            const li = document.createElement("li");

            // Create a span element for the task text
            const taskText = document.createElement("span");
            taskText.textContent = task.text;

            // If the task is completed, style it differently
            if (task.status === "completed") {
                taskText.style.color = "var(--secondary-color)";
                taskText.classList.add("completed");
                li.style.borderLeft = "5px solid var(--secondary-color)";  
            } else {
                taskText.style.color = "var(--primary-color)";
                li.style.borderLeft = "5px solid var(--primary-color)";  
            }

            // Add a delete button with updated style
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteTask(index);
            deleteButton.classList.add("delete-button");  

            // Add a button to mark the task as complete
            if (task.status !== "completed") { 
                const completeButton = document.createElement("button");
                completeButton.textContent = "Complete";
                completeButton.onclick = () => markComplete(index);
                li.appendChild(taskText);
                li.appendChild(completeButton);  
            } else {
                li.appendChild(taskText);  
            } 

            // Append the delete button
            li.appendChild(deleteButton);

            // Add the list item to the task list
            taskList.appendChild(li);
        });
    }
}

// Function to mark task as completed
function markComplete(index) {
    taskDisplay[index].status = "completed";
    saveTasks();
    displayTasks();
}

// Function to delete task
function deleteTask(index) {
    taskDisplay.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Function to filter tasks based on the status
function filterTasks(status) {
    displayTasks(status); 
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskDisplay));
}

// Display all tasks on page load
displayTasks();
