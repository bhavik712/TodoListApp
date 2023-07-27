import { getTodos,createTodos,saveTodos,removeTodos,searchTodos,sortTodos,showOnlyPendingTodos } from "./todos";

let todoList = getTodos();

const showTodoList = (todoList) =>{
    document.querySelector('#show-todo').innerHTML = '';
    todoList.forEach ((todo)=>{

        const taskEle = document.createElement('h2');
        taskEle.textContent = todo.task;
        document.querySelector('#show-todo').appendChild(taskEle);

        const statusEle = document.createElement('button');
        let status = todo.completed ? 'completed' : 'pending';
        statusEle.textContent = status;
        taskEle.appendChild(statusEle);

        const updateEle = document.createElement('button');
        updateEle.textContent = 'Update Task';
        taskEle.appendChild(updateEle);

        const updateStatusEle = document.createElement('button');
        updateStatusEle.textContent = 'Update status'
        taskEle.appendChild(updateStatusEle);

        const deleteTodoele = document.createElement('button');
        deleteTodoele.textContent ='Delete ToDo';
        taskEle.appendChild(deleteTodoele);

        updateEle.addEventListener('click', (e)=>{
            location.assign(`edit.html#${todo.id}`);
            showTodoList(todoList);

        })

        updateStatusEle.addEventListener('click',(e)=>{
            todo.completed = todo.completed ? false : true;
            saveTodos();
            showTodoList(todoList);

        })

        deleteTodoele.addEventListener('click',()=>{
            removeTodos (todo.id)
            showTodoList(todoList);
        })
    })
}

document.querySelector('#add-todo').addEventListener('click', (e)=>{
    const todoID = createTodos();
    location.assign(`edit.html#${todoID}`);
    // showTodoList(todoList);
})

document.querySelector('#search-todo').addEventListener('input',(e)=>{
    const searchResultTodos = searchTodos(e.target.value);
    if(searchResultTodos.length){
        showTodoList(searchResultTodos);
    }else{
        document.querySelector('#show-todo').innerHTML = '';
        const resultEle = document.createElement('h2');
        resultEle.textContent = 'sorry No to do Found';
        document.querySelector('#show-todo').appendChild(resultEle);
    }
    
})

document.querySelector('#sort-todo').addEventListener('click', ()=>{
    sortTodos();
    showTodoList(todoList);
})

document.querySelector('#hidden-completed').addEventListener('change',(e)=>{
    if(e.target.checked){
        const pendinglist = showOnlyPendingTodos();
        showTodoList(pendinglist);
    }else{
        showTodoList(todoList);

    }
})
showTodoList(todoList);