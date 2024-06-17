let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let todoPriorityInput = document.getElementById("todoPriorityInput");
let priorityDisplay = document.getElementById("priorityDisplay");

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

todoPriorityInput.addEventListener("change", function() {
    priorityDisplay.textContent = "Selected Priority: " + todoPriorityInput.value;
});

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userCategoryElement = document.getElementById("todoCategoryInput");
    let userDueDateElement = document.getElementById("todoDueDateInput");
    let userPriorityElement = document.getElementById("todoPriorityInput");

    let userInputValue = userInputElement.value.trim();
    let userCategoryValue = userCategoryElement.value.trim();
    let userDueDateValue = userDueDateElement.value;
    let userPriorityValue = userPriorityElement.value;

    if (userInputValue === "") {
        alert("Enter Valid Text");
        return;
    }

    todosCount += 1;

    let newTodo = {
        text: userInputValue,
        category: userCategoryValue,
        dueDate: userDueDateValue,
        priority: userPriorityValue,
        uniqueNo: todosCount,
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
    userCategoryElement.value = "";
    userDueDateElement.value = "";
    userPriorityElement.value = "Low";
}


addTodoButton.onclick = function() {
    onAddTodo();
};

function onTodoStatusChange(checkboxId, labelId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    labelElement.classList.toggle("checked");
    
    if (checkboxElement.checked) {
        todoElement.classList.add("completed");
    } else {
        todoElement.classList.remove("completed");
    }

    let todoIndex = todoList.findIndex(todo => todo.uniqueNo === parseInt(todoId.replace("todo", "")));
    todoList[todoIndex].isChecked = checkboxElement.checked;
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    if (todo.isChecked) {
        todoElement.classList.add("completed");
    }
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = `${todo.text} [${todo.category}] (${todo.dueDate}) - ${todo.priority}`;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");

    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };

    deleteIconContainer.appendChild(deleteIcon);

    todoItemsContainer.appendChild(todoElement);
}


for (let todo of todoList) {
    createAndAppendTodo(todo);
}