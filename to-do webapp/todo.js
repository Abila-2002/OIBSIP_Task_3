function addTask() {
    const Input = document.getElementById("task");
    const taskText = Input.value.trim();

    if (taskText !== "") {
        const selectElement = document.querySelector(".sel");
        const selectedOption = selectElement.value;
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" onclick="completeTask(this)">
            <span>${taskText}</span>
            <span class="edit" onclick="editTask(this)">&#9998;</span>
            <span class="delete" onclick="deleteTask(this)">&#128465;</span> `;

        const todoList = document.querySelector(".todo-list");
        todoList.appendChild(listItem);
        Input.value = "";
        listItem.scrollIntoView({behavior: "smooth", block: "start"});
        filterTasks();
    }
}

function completeTask(checkbox) {
    const taskItem = checkbox.parentElement;
    const spanElement = taskItem.querySelector("span");

    if (checkbox.checked) {
        spanElement.classList.add("completed");
    } else {
        spanElement.classList.remove("completed");
    }
}

function editTask(editIcon) {
    const taskItem = editIcon.parentElement;
    const spanElement = taskItem.querySelector("span");
    const taskText = spanElement.textContent;
    const updatedText = prompt("Edit task:", taskText);

    if (updatedText !== null && updatedText.trim() !== "") {
        spanElement.textContent = updatedText;
    }
}

function deleteTask(deleteIcon) {
    const taskItem = deleteIcon.parentElement;
    taskItem.remove();
}

function filterTasks() {
    const selectElement = document.querySelector(".sel");
    const selectedOption = selectElement.value;
    const taskItems = document.querySelectorAll(".todo-list li");

    const completedTasks = [];
    const pendingTasks = [];

    taskItems.forEach((taskItem) => {
        const spanElement = taskItem.querySelector("span");
        const isCompleted = spanElement.classList.contains("completed");

        if (selectedOption === "all" || (selectedOption === "completed" && isCompleted) || (selectedOption === "pending" && ! isCompleted)) {
            taskItem.style.display = "block";
            if (isCompleted) {
                completedTasks.push(taskItem);
            } else {
                pendingTasks.push(taskItem);
            }
        } else {
            taskItem.style.display = "none";
        }
    });

    const messageElement = document.querySelector(".message");
    messageElement.style.display = "none"; // Hide the message by default

    if (selectedOption === "completed" && completedTasks.length === 0) {
        messageElement.textContent = "No completed tasks to display.";
        messageElement.style.display = "block";
    } else if (selectedOption === "pending" && pendingTasks.length === 0) {
        messageElement.textContent = "No pending tasks to display.";
        messageElement.style.display = "block";
    }
}

