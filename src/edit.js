import { getTask,removeTodos,updateTodos } from "./todos";
const pageID = location.hash.substring(1);
let  updateTask = getTask(pageID);

const updateTaskEle = document.querySelector('#update-task');

updateTaskEle.value = updateTask

updateTaskEle.addEventListener('change', (e)=>{
    updateTask = e.target.value;
    console.log(updateTask);
})

document.querySelector('#save-task').addEventListener('click',(e)=>{
    updateTodos(pageID, updateTask);
})

document.querySelector('#discard-changes').addEventListener('click',()=>{
    removeTodos(pageID);
    location.assign('index.html');
})