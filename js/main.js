const form = document.querySelector('.todo__form');
const taskInput = document.querySelector('.todo__input');
const tasksList = document.querySelector('.tasks');
const btnEven = document.querySelector('.button_active__btn-even');
const btnOdd = document.querySelector('.button_active__btn-odd');
const btnFirst = document.querySelector('.button_active__btn-first');
const btnLast = document.querySelector('.button_active__btn-last');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function(task) {
    renderTask(task);
})

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)
btnEven.addEventListener('click', showEvenTasks)
btnOdd.addEventListener('click', showOddTasks)
btnFirst.addEventListener('click', delFirstTask)
btnLast.addEventListener('click', delLastTask)

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

    saveToLocalStorage();

    renderTask(newTask);

    taskInput.value = ''
    taskInput.focus()
}

/**
 * Удаление задач
 * @param {event} event 
 */
function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);
    const index = tasks.findIndex(function(task) {
        return task.id === id;
    });

    tasks.splice(index, 1);

    saveToLocalStorage();

    parentNode.remove();
}

/**
 * Отмечаем выполнение задачи
 * @param {event} event 
 */
function doneTask(event) {
    if(event.target.dataset.action !== 'done') return

    const parentNode = event.target.closest('li');

    const id = Number(parentNode.id);

    const taskObj = tasks.find(function(task) {
        return task.id === id;
    })

    taskObj.done = !taskObj.done

    saveToLocalStorage();

    const taskTitle = parentNode.querySelector('.task__title');
    taskTitle.classList.toggle('task__title--done');
    parentNode.classList.toggle('task__done');
    
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

function delFirstTask() {
    const task = document.getElementsByTagName('li');

    task[0].remove();
}

function delLastTask() {
    const task = document.getElementsByTagName('li');

    task[task.length-1].remove();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    const cssClass = task.done ? "task__title task__title--done" : "task__title";

    const taskHTML = `<li id="${task.id}" class="task">
    <span class="${cssClass}">${task.text}</span>
    <div class="task__container">
      <button type="button" class="button button_type_done" data-action="done" aria-label="Отметить выполненной"></button>
      <button type="button" class="button button_type_delete" data-action="delete" aria-label="Удалить"></button>
    </div>
  </li>`

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}
