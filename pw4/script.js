const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const activeCounter = document.getElementById('todo-counter');

function updateCounter() {
    const totalActive = todoList.querySelectorAll('li:not(.done)').length;
    activeCounter.textContent = totalActive;
}

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const taskText = todoInput.value.trim();

    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Видалити</button>
    `;

    todoList.appendChild(li);
    todoInput.value = '';
    updateCounter();
});

todoList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const itemToDelete = e.target.closest('li');
        itemToDelete.remove();
        updateCounter();
        return;
    }

    const listItem = e.target.closest('li');
    if (listItem) {
        listItem.classList.toggle('done');
        updateCounter();
    }
});