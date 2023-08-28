const form = document.querySelector('.todo__form');
const taskInput = document.querySelector('.todo__input');
const tasksList = document.querySelector('.tasks');

form.addEventListener('submit', addTask)

/**
 * Добавление задачи
 * @param {event} event 
 */
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value

    const taskHTML = `<li class="task">
    <h2 class="task__title">${taskText}</h2>
    <div class="task__container">
      <button type="button" class="button button_type_done" data-action="done" aria-label="Отметить выполненной"></button>
      <button type="button" class="button button_type_delete" data-action="delete" aria-label="Удалить"></button>
    </div>
  </li>`

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = ''
    taskInput.focus()
}

tasksList.addEventListener('click', deleteTask)

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li');
        parentNode.remove()
    }
}