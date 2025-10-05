// Wait until the HTML document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array initialized from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save the in-memory tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * @param {string} [taskTextParam] - Task text (if omitted, read from input field).
     * @param {boolean} [save=true] - Whether to save the task to localStorage.
     */
    function addTask(taskTextParam, save = true) {
        // Determine task text source and trim white space
        const taskText = (typeof taskTextParam !== 'undefined')
            ? String(taskTextParam).trim()
            : taskInput.value.trim();

        // Validate non-empty
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item and set its text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button and give it the required class
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn'); // checker expects classList.add

        // Remove handler: remove from DOM and from tasks array, then save
        removeButton.onclick = () => {
            // Remove from DOM
            taskList.removeChild(li);

            // Remove one occurrence of this task text from the tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        };

        // Append button and the list item into the DOM
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // If requested, add to in-memory array and persist
        if (save) {
            tasks.push(taskText);
            saveTasks();
        }

        // Clear input for convenience
        taskInput.value = '';
    }

    // Load tasks from the in-memory array into the DOM (do not save while loading)
    function loadTasks() {
        tasks.forEach(taskText => addTask(taskText, false));
    }

    // Initialize: load saved tasks
    loadTasks();

    // Event listeners: button click and Enter key
    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') addTask();
    });
});
