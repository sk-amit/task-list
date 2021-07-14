let form = document.querySelector('form');
let taskInput = document.querySelector('#new-task');
let filter = document.querySelector('#filter');
let ul = document.querySelector('#ulItems');
let clear = document.querySelector('#clearBtn');


form.addEventListener('submit', createTask);
ul.addEventListener('click', removeTask);
clear.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTask);



function createTask(e){
    if(taskInput.value===''){
        alert('please add task');
    }else{
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + ' '));
        ul.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);

        //save web local storage
        storeLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}


// remove task
function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('are you sure')){
            let ele = e.target.parentElement;
            ele.remove();

            // remove data from browser
            removeDataFromStorage(ele);
        }
    }
}


// clear task items
function clearTask(e){
    ul.innerHTML = '';
    localStorage.clear();
}


// filter task input
function filterTask(e){
    let text = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach( task => {
        let item = task.firstChild.textContent;

        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}


// store task in local storage
function storeLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') ===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// get data in browser
function getTask(task){
    let tasks;
    if(localStorage.getItem('tasks') ===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + ' '));
        ul.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
    });
};


//remove data from browser
function removeDataFromStorage(taskLi){
    let tasks;
    if(localStorage.getItem('tasks') ===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskLi;
    li.removeChild(li.lastChild);

    tasks.forEach((taskList, index)=>{
        if(li.textContent.trim() === taskList){
            tasks.splice(index, 1);
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};