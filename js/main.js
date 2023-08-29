const form = document.querySelector('.todo__form');
const taskInput = document.querySelector('.todo__input');
const tasksList = document.querySelector('.tasks');
const btnEven = document.querySelector('.button_active__btn-even');
const btnOdd = document.querySelector('.button_active__btn-odd');
const btnFirst = document.querySelector('.button_active__btn-first');
const btnLast = document.querySelector('.button_active__btn-last');

let tasks = [];

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
btnEven.addEventListener('click', showEvenTasks)
btnOdd.addEventListener('click', showOddTasks)
btnFirst.addEventListener('click', showFirstTask)
btnLast.addEventListener('click', showLastTask)

/**
 * Добавление задачи
 * @param {event} event 
 */
function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)

    const cssClass = newTask.done ? "task__title task__title--done" : "task__title";

    const taskHTML = `<li id="${newTask.id}" class="task">
    <span class="${cssClass}">${newTask.text}</span>
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

function showEvenTasks() {
    const task = document.getElementsByTagName('li');
    
    for (let i = 0; i < task.length; i++) {
        if (i % 2 !== 0) {
            task[i].classList.toggle('task__active')
        }
    }
}

function showOddTasks() {
    const task = document.getElementsByTagName('li');
    
    for (let i = 0; i < task.length; i++) {
        if (i % 2 === 0) {
            task[i].classList.toggle('task__active')
        }
    }
}

function showFirstTask() {
    const task = document.getElementsByTagName('li');

    task[0].classList.toggle('task__active')
}

function showLastTask() {
    const task = document.getElementsByTagName('li');

    task[task.length-1].classList.toggle('task__active')
}