// select all the elements required for adding and deletting
// todoList, todo-item , form , addTodo , newTodo
const todoList = document.querySelector("#todoList");
const todoItems = document.querySelectorAll(".todo-item");
const done = document.querySelectorAll('.done');
const deleteEl = document.querySelectorAll(".delete");
const form = document.querySelector("#form");
const newTodo = document.querySelector("#newTodo");
const addTodo = document.querySelector("#addTodo");

done.forEach(el => {
    el.addEventListener('mouseover', (e) => {
        e.target.nextElementSibling.classList.toggle('almost-done');
    })
    el.addEventListener('mouseleave', (e) => {
        e.target.nextElementSibling.classList.toggle('almost-done');
    })

    el.addEventListener('click', (e) => {
        e.target.nextElementSibling.classList.toggle('completed');
    })
})

deleteEl.forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
})


addTodo.addEventListener('click', (e) => {
    e.preventDefault();
    // creating elements for new todo item
    const newItem = document.createElement('div');
    const newChkBox = document.createElement('input');
    const newTodoText = document.createElement('div');
    const newCloseBtn = document.createElement('button');
    // setting attributes and classes
    newItem.classList.add('todo-item');
    newChkBox.classList.add('done');
    newChkBox.setAttribute('type', 'checkbox');
    newTodoText.classList.add('todo-text');
    newCloseBtn.classList.add('delete');
    newCloseBtn.innerHTML = "&times;";

    newTodoText.innerText = newTodo.value;
    newTodo.value = '';

    // adding event listeners
    newChkBox.addEventListener('mouseover', (e) => {
        e.target.nextElementSibling.classList.toggle('almost-done');
    })
    newChkBox.addEventListener('mouseleave', (e) => {
        e.target.nextElementSibling.classList.toggle('almost-done');
    })

    newChkBox.addEventListener('click', (e) => {
        e.target.nextElementSibling.classList.toggle('completed');
    })

    newCloseBtn.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
    // nesting the elements inside the todo item
    newItem.append(newChkBox, newTodoText, newCloseBtn);
    todoList.append(newItem);

})
