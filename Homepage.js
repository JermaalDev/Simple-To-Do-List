
//linking the html elements with variables to use in js 
const taskInput = document.getElementById("task-text");
const taskList = document.getElementById("task-list");

//array for tasks
const taskDisplay = [];

// Function to add task
function addTask() {
    let task = taskInput.value.trim();
    if (task !== "") {
        taskDisplay.push(task);
        taskInput.value = "";
        displayTasks()
    } else {
        alert("Please enter a task");
    }
}

//function to display tasks
function displayTasks() {
    taskList.innerHTML = ""
    taskDisplay.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        //add a delete button 
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteTask(index);

        //dynamically add a delete button to each of the tasks
        li.appendChild(deleteButton)
        //dynamically add the task to the HTML display
        taskList.appendChild(li)
    })
}

//function to delete a task
function deleteTask(index) {
    taskDisplay.splice(index, 1);
    displayTasks()
}



























