let tasks = [];
let filter = 'All';

function addTask() {
    const taskTitle = document.getElementById("taskTitle").value.trim();
    const category = document.getElementById("category").value;
    const priority = document.getElementById("priority").value;

    if (taskTitle === '') {
        alert("Please enter a task title.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: taskTitle,
        category: category,
        priority: priority,
        completed: false,
        proof: null
    };

    tasks.push(newTask);
    renderTasks();
    document.getElementById("taskTitle").value = '';  // Clear input field
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => filter === 'All' || task.category === filter);

    filteredTasks.sort((a, b) => {
        if (a.priority === 'High') return -1;
        if (b.priority === 'High') return 1;
        if (a.priority === 'Medium') return -1;
        return 1;
    });

    filteredTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p class="category">Category: ${task.category}</p>
            <p class="priority">Priority: ${task.priority}</p>
            <div class="task-buttons">
                <button onclick="toggleComplete(${task.id})" class="task-btn">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})" class="task-btn delete-btn">Delete</button>
                <button onclick="addProof(${task.id})" class="task-btn">Add Proof</button>
            </div>
            <div class="proof-upload" id="proof-upload-${task.id}">
                <input type="file" onchange="uploadProof(${task.id}, event)">
            </div>
        `;
        taskList.appendChild(taskElement);
    });
}

function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

function addProof(taskId) {
    const proofInput = document.getElementById(`proof-upload-${taskId}`);
    proofInput.style.display = 'block';
}

function uploadProof(taskId, event) {
    const task = tasks.find(t => t.id === taskId);
    const proofFile = event.target.files[0];
    if (proofFile) {
        task.proof = URL.createObjectURL(proofFile);
        alert("Proof uploaded successfully!");
    }
}

function filterTasks(category) {
    filter = category;
    renderTasks();
}
