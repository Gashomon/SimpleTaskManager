let jsonStringKey = "tasks"
let Tasks = {};
let openTasks = [];
let closeTasks = [];
let toTask = "";
let historyIndex = 0; 
let currentTaskID = historyIndex;

const limit = 300;
const editEvent = new Event('editTask');
const deleteEvent = new Event('deleteTask');

class Task{
  constructor(taskName){
    this.task = document.createElement("div");
    this.name = document.createElement("h4");
    this.doneButton = document.createElement("button");
    this.editButton = document.createElement("button");
    this.deleteButton = document.createElement("button");
    
    this.id = 0;
    this.state = "open";
    
    this.createTask(taskName);
    this.task.id = this.id;
    this.doneButton.textContent = "Close";
    this.editButton.textContent = "Edit";
    this.deleteButton.textContent = "Delete";

    this.task.className = "homeMain taskMain";
    this.name.className = "subText";
    this.doneButton.className = "homeItem";
    this.editButton.className = "homeItem";
    this.deleteButton.className = "homeItem";
    
    this.task.appendChild(this.name);
    this.task.appendChild(this.doneButton);
    this.task.appendChild(this.editButton);
    this.task.appendChild(this.deleteButton);

    this.doneButton.onclick = () => {this.toggleDone()};
    this.editButton.onclick = () => {this.editTask()};
    this.deleteButton.onclick =() => {this.deleteTask()};
  }

  createTask(name){
    this.name.textContent = name;
    this.id = historyIndex++;
    Tasks[this.id] = this;
  }

  toggleDone(){
    if (this.state == 'open'){
      this.state = 'close';
      this.doneButton.textContent = "Open";
      this.editButton.disabled = true;
      this.task.className = "homeMain taskMain darken";
      document.getElementById("doneTasks").appendChild(this.task);
    }
    else{
      this.state = 'open';
      this.doneButton.textContent = "Close";
      this.editButton.disabled = false;
      this.task.className = "homeMain taskMain";
      document.getElementById("openTasks").appendChild(this.task);
    }
  }

  editTask(){
    if (toTask == "add") return; 
    currentTaskID = this.id;
    toTask = "edit";
    document.getElementById("actionBox").style.display = "";
    document.getElementById("actionButton").textContent = "Edit Task";
    this.task.className = "homeMain taskMain selected";
  }

  deleteTask(){
    this.task.remove();
    historyIndex--;
    delete Tasks[this.id];
  }
}

function addTask(){
  if(toTask == "edit") return;
  toTask = "add";
  document.getElementById("actionBox").style.display = "";
  document.getElementById("actionButton").textContent = "Add Task";
}

function editTask(){
  
}

function delteTask(){
}


function acceptAction(){
  switch (toTask) {
    case "add":
      if (historyIndex >= limit) {
        window.alert("Reached limit. delete somme tasks first");
        return;
      }
        document.getElementById("openTasks").appendChild(new Task(taskName=document.getElementById("inputText").value).task);
      break;
    
    case "edit":
      document.getElementById(currentTaskID).firstChild.textContent = document.getElementById("inputText").value;
      document.getElementById(currentTaskID).className = "homeMain taskMain";
      break;

    default:
      window.alert("Error: no set Action");
      break;
  }
  cancelAction();
}

function cancelAction(){
  toTask = "";
  document.getElementById("inputText").value = "";
  document.getElementById("actionBox").style.display = "none";
  document.getElementById(currentTaskID).className = "homeMain taskMain";
}

function deleteAllTask() {
  document.getElementById("openTasks").textContent="";
  document.getElementById("doneTasks").textContent="";
  Tasks = {};
  localStorage.removeItem(historyIndex);
}

function saveTasks() {

}

function loadTasks() {

}

function loadHistoryIndex(){
  historyIndex = localStorage.getItem('historyIndex');

  if(historyIndex == null && !Number.isInteger(historyIndex)){
    historyIndex = 0;
  }
}