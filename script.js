const enterbtn= document.querySelector(".enter-btn");
const input= document.getElementById("text-input");
const todolistbox= document.getElementById("todo-list");
const checkboxele= document.querySelector(".box");
const todos= [];

function enterPressed(event){
    if(event.keyCode=== 13){
        pushTodo();
    }
}
function pushTodo(){
    if(input.value.length!= 0){
        var todoitem= {
            task: input.value,
            uid:  input + "-" + new Date().getTime().toString(),
            formattedtime: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
            isCompleted: 'false'
        }
        todos.unshift(todoitem);
        removeTodo();
    }
    else{
        alert("please enter a task");
    }
}

function removeTodo(){
    const itemBodies= document.getElementsByClassName("item-body");
    Array.from(itemBodies).forEach(itemBody => itemBody.remove());
    render();
}

function render(){
    todos.forEach(todo => display(todo))
}   

function display(todo){
    var itemBodyDiv = document.createElement('div');
        itemBodyDiv.classList.add('item-body');
        itemBodyDiv.setAttribute("id", todo.uid);

    var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.classList.add('cbox');
    
    var taskdatediv= document.createElement('div');
        taskdatediv.classList.add('ptag');

    var taskpara= document.createElement('p');
        taskpara.classList.add('todo');
        taskpara.textContent= todo.task;

    var date= document.createElement('p');
        date.classList.add('datetime');
        date.textContent= todo.formattedtime;

    var deletebox= document.createElement('div');
        deletebox.classList.add('del-box');
        deletebox.textContent= "X";
        
    
    todolistbox.appendChild(itemBodyDiv); 
    itemBodyDiv.appendChild(checkbox);
    itemBodyDiv.appendChild(taskdatediv);
    taskdatediv.appendChild(taskpara);
    taskdatediv.appendChild(date);
    itemBodyDiv.appendChild(deletebox);

    input.value= "";
    checkbox.addEventListener('change',()=> toggle(event));
    deletebox.addEventListener('click',()=> deleteTask(event))
}

function toggle(event){
    const checkedEleId= event.target.parentElement.id;
    todos.forEach(todo =>{
            if(checkedEleId===todo.uid){
                var currIndex= todos.indexOf(todo);
                if(event.target.checked){
                    element= todos.splice(currIndex,1)[0];
                    todos.push(element); 
                }
               /* else if(!event.target.checked){
                    var toIndex;
                    toIndex= fromIndex;
                   const newfromIndex= todos.indexOf(todo);
                   element= todos.splice(newfromIndex,1)[0];
                   todos.splice(toIndex,0,element);
                }*/
            }
        })
    
}


function deleteTask(event){
    event.target.parentElement.remove();
    const delEleId= event.target.parentElement.id;
    todos.forEach(todo => {
        if(todo.uid=== delEleId){
            const index= todos.indexOf(todo);
            todos.splice(index,1);
        }
    })
}