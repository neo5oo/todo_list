const form = document.querySelector('.todo__form');
const taskInput = document.querySelector('.todo__input');
const tasksList = document.querySelector('.tasks');
const task = document.querySelector('.task');

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

/**
 * Добавление задачи
 * @param {event} event 
 */
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value

    const taskHTML = `<li class="task">
    <span class="task__title">${taskText}</span>
    <div class="task__container">
      <button type="button" class="button button_type_done" data-action="done" aria-label="Отметить выполненной"></button>
      <button type="button" class="button button_type_delete" data-action="delete" aria-label="Удалить"></button>
    </div>
  </li>`

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = ''
    taskInput.focus()
}

/**
 * Удаление задач
 * @param {event} event 
 */
function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('li');
        parentNode.remove()
    }
}

/**
 * Отмечаем выполнение задачи
 * @param {event} event 
 */
function doneTask(event) {
    if(event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('li');
        const taskTitle = parentNode.querySelector('.task__title');
        taskTitle.classList.toggle('task__title--done');
        parentNode.classList.toggle('task__done');
    }
}

