import { v4 } from "uuid";
let todoList = [];

const loadTodos = () =>{
    const todoJSON = localStorage.getItem('todoList');

    if(todoJSON){
        return JSON.parse(todoJSON);
    }else{
        return [];
    }
}

todoList = loadTodos();

const saveTodos = ()=>{
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

const getTodos = () => todoList;

const createTodos = ()=>{
    const todoID = v4();
    todoList.push({
        id: todoID,
        task: '',
        completed: false
    })
    saveTodos();
    return todoID;
}

const getTask=(id) =>{
    const todo = todoList.find((item) => item.id === id);
    return todo.task; 
}

const updateTodos = (id,task) =>{
    const updatedTodo = todoList.find((item)=>item.id === id);
    updatedTodo.task = task;
    saveTodos();
    location.assign('index.html');
}

const removeTodos = (id) =>{
    const index = todoList.findIndex((todo)=>todo.id === id);
    todoList.splice(index,1);
    saveTodos();
}

const searchTodos = (searchText) =>{
    return todoList.filter((todo)=>todo.task.toLowerCase().includes(searchText.toLowerCase()))
}

const sortTodos = ()=>{
    todoList.sort((a,b)=>{
        if(a.completed < b.completed){
            return -1;
        }
    })
}

const showOnlyPendingTodos = () =>{
    return todoList.filter((todo)=>!todo.completed)
}
export {getTodos,createTodos,getTask,updateTodos,saveTodos,removeTodos,searchTodos,sortTodos,showOnlyPendingTodos};