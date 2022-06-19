// selecting static elements with dynamic data :  input, todoList, form
const inputTodo = document.querySelector("#newTodo");
const todoList = document.querySelector("#todoList");
const form = document.querySelector("form");
const submitBtn = document.querySelector("#addTodo");
const sortBy = document.querySelector("#sort");

// LOCAL STORAGE Data structure looks like this : 👇
// localStorage.todosList = [{'text':'todo text', 'completed': true}]

/*
1. define functions to add strikethrough, delete, add and select functionality
*/


function mountNewTodoItem(isComplete, fromLocalStorage) {

    // 1) create a new todo '.todo-item' item containing
    const newTodoItem = document.createElement('div');
    newTodoItem.classList.add('todo-item');
    if (isComplete) newTodoItem.classList.add('complete');

    //    -> 1 checkbox '.done' with strikethrough ✔,
    const newCheckbox = document.createElement('input');
    newCheckbox.classList.add('done');
    newCheckbox.setAttribute('type', 'checkbox');
    // STRIKETHROUGH AND COMPLETED functionality
    newCheckbox.addEventListener('mouseover', strikethroughMouseoverHandler);
    newCheckbox.addEventListener('mouseleave', strikethroughMouseleaveHandler);
    newCheckbox.addEventListener('click', completeHandler);
    if (isComplete) newCheckbox.checked = true;


    //    -> 1 div with text '.todo-text'✔,
    const newTodoText = document.createElement('div');
    newTodoText.innerText = inputTodo.value;
    newTodoText.classList.add('todo-text');
    const newItemObj = { 'text': inputTodo.value, 'completed': false };
    inputTodo.value = '';
    if (isComplete) {
        newTodoText.classList.add('completed');
        newItemObj.completed = true;
    }
    // if loading from localStorage we will not add the same items again to array and localStorage.
    if (!fromLocalStorage) {
        todoListArray.push(newItemObj);
        localStorage.setItem('todosList', JSON.stringify(todoListArray))
    }
    //    -> 1 button &times '.delete'✔; 
    const newDelBtn = document.createElement('button');
    newDelBtn.innerHTML = '&times;'
    newDelBtn.classList.add('delete');
    // adding DELETE functionality
    newDelBtn.addEventListener('click', deleteHandler);

    // append the todo item after composing it
    newTodoItem.append(newCheckbox, newTodoText, newDelBtn);
    todoList.append(newTodoItem);
}



// add, delete, strikethrough, select 
// defining addTodo functionality
function addTodoHandler(e) {
    e.preventDefault()
    mountNewTodoItem(false, false);

}

// adding ADDTODO functionality
form.addEventListener('submit', addTodoHandler);

// Defining DELETE function
function deleteHandler(e) {
    const text = e.target.previousElementSibling.innerText;
    // const targetTodoObj = todoListArray.find((item)=> item['text']===text);
    let newObj = todoListArray.find((item) => item['text'] === text);
    let index = todoListArray.indexOf(newObj);
    todoListArray.splice(index, 1);
    localStorage.setItem('todosList', JSON.stringify(todoListArray));
    e.target.parentNode.remove();
}

// Defining STRIKETHROUGH functionality by set of functions
function strikethroughMouseoverHandler(e) {
    e.target.nextElementSibling.classList.toggle('almost-done');
}
function strikethroughMouseleaveHandler(e) {
    e.target.nextElementSibling.classList.toggle('almost-done');
}
function completeHandler(e) {
    e.target.nextElementSibling.classList.toggle('completed');
    e.target.parentNode.classList.toggle('complete');
    const text = e.target.nextElementSibling.innerText;
    // updating the complete attribute in local storage
    let targetTodoObj = todoListArray.find(item => item['text'] === text);
    if (targetTodoObj['completed'])
        targetTodoObj['completed'] = false;
    else
        targetTodoObj['completed'] = true;

    localStorage.setItem('todosList', JSON.stringify(todoListArray));

}


/*
2. load all the todos from todoList from localstorage 
*/

const todoListArray = localStorage.todosList ? JSON.parse(localStorage.todosList) : [];

// LOADING TODOS FROM 
todoListArray.forEach((item) => {
    inputTodo.value = item['text'];
    mountNewTodoItem(item.completed, true);
})


// SORTING FUNCTIONALITY
sortBy.addEventListener('change', () => {
    let completeTodosArray = todoListArray.filter(item => item['completed']);
    let incompleteTodosArray = todoListArray.filter(item => !item['completed']);
    let sort = sortBy.value;

    switch (sort) {
        case 'all':
            todoList.innerHTML = '';
            todoListArray.forEach((item) => {
                inputTodo.value = item['text'];
                mountNewTodoItem(item.completed, true);
            })
            break;
        case 'completed':
            todoList.innerHTML = '';
            completeTodosArray.forEach((item) => {
                inputTodo.value = item['text'];
                mountNewTodoItem(item.completed, true);
            })
            break;
        case 'pending':
            todoList.innerHTML = '';
            incompleteTodosArray.forEach((item) => {
                inputTodo.value = item['text'];
                mountNewTodoItem(item.completed, true);
            })
            break;
    }
})
