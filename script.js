// Wait for the entire HTML document to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Select key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    function addTask() {
        // Get the input value and remove extra spaces
        const taskText = taskInput.value.trim();

        // Check if the input is empty
        if (taskText === '') {
            alert('Please enter a task.');
            return; // Stop execution
        }

        // Create a new <li> element for the task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create a "Remove" button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';

        // ✅ Use classList.add instead of className
        removeButton.classList.add('remove-btn');

        // When the remove button is clicked, delete the corresponding task
        removeButton.onclick = () => {
            taskList.removeChild(li);
        };

        // Append the remove button to the task item
        li.appendChild(removeButton);

        // Add the task item to the list
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Add event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
