let addTodoButton=document.querySelector(".add-todo");
let todoInput=document.querySelector(".todo-input");
let todosList=document.querySelector(".todos-list-containers");

// attach click event on addTodoButton
todoInput.addEventListener("keypress",function(e){
    if(e.key=="Enter")
    {
        addToDo();
    }
});
addTodoButton.addEventListener("click",function() {
    addToDo();    
});


function addToDo() {
    let todoInputValue=todoInput.value;
    if(todoInputValue)
    {   appendTodo(todoInputValue);
        //console.log(todoInputValue);
        // it will empty the todoInput
        todoInput.value="";
    }
}



function appendTodo(todo) {
    let todoItemDiv=document.createElement("div");
    todoItemDiv.classList.add("todo-item");
    //  <div class="todo-item"> </div>

    let pTag=document.createElement("p");
    pTag.classList.add("todo-input");
    pTag.textContent=todo;

    // <p class="todo-input">Learn Css</p>

    let DeleteTodoButton=document.createElement("button");
    DeleteTodoButton.classList.add("delete-todo");
    DeleteTodoButton.textContent="Delete";

    // <button class="delete-todo">Delete</button>
    DeleteTodoButton.addEventListener("click",deleteTodo);

    todoItemDiv.append(pTag);
    todoItemDiv.append(DeleteTodoButton);
    todosList.append(todoItemDiv);
}

function deleteTodo(e) {
 e.target.parentNode.remove();
}