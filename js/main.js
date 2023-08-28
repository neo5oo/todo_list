const form = document.querySelector('.todo__form');
const taskInput = document.querySelector('.todo__input');
const tasksList = document.querySelector('.tasks');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value

    const taskHTML = `<li class="task">
    <h2 class="task__title">${taskText}</h2>
    <div class="task__container">
      <button type="button" class="button button_type_filled" aria-label="Отметить выполненной"></button>
      <button type="button" class="button button_type_remove" aria-label="Удалить"></button>
    </div>
  </li>`

  tasksList.insertAdjacentHTML('beforeend', taskHTML);

  taskInput.value = ''
  taskInput.focus()
})

