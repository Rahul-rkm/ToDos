// select all the elements required for adding and deleting
// todoList, todo-item , form , addTodo , newTodo
const todoList = document.querySelector("#todoList");
const todoItems = document.querySelectorAll(".todo-item");
const done = document.querySelectorAll('.done');
const deleteEl = document.querySelectorAll(".delete");
const form = document.querySelector("#form");
const newTodo = document.querySelector("#newTodo");
const addTodo = document.querySelector("#addTodo");

// adding local storage functionality
const todoListArray = localStorage.todosList ? JSON.parse(localStorage.todosList) : [];

if (localStorage.todosList) {
    todoListArray.forEach(item => {
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

        // putting todo text value
        newTodoText.innerText = item;

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
            // removing from todoListArray
            todoListArray.splice(todoListArray.indexOf(e.target.previousElementSibling), 1);
            // updating in localStorage
            localStorage.setItem('todosList', JSON.stringify(todoListArray));
            e.target.parentNode.remove();
        })
        // nesting the elements inside the todo item
        newItem.append(newChkBox, newTodoText, newCloseBtn);
        todoList.append(newItem);
    })
}


// adding strikethrough to the todo-text : FOR EACH todo-item
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

// adding ability to delete todo-items with delete button : FOR EACH
deleteEl.forEach(el => {
    el.addEventListener('click', (e) => {
        e.target.parentNode.remove();
    })
})

// ability to create new todo to the list
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
    // set todoText value
    newTodoText.innerText = newTodo.value;
    // storing in localStorage
    todoListArray.push(newTodo.value);
    localStorage.setItem('todosList', JSON.stringify(todoListArray));
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
        // removing from todoListArray
        todoListArray.splice(todoListArray.indexOf(e.target.previousElementSibling), 1);
        // updating in localStorage
        localStorage.setItem('todosList', JSON.stringify(todoListArray));
        e.target.parentNode.remove();
    })
    // nesting the elements inside the todo item
    newItem.append(newChkBox, newTodoText, newCloseBtn);
    todoList.append(newItem);

})
