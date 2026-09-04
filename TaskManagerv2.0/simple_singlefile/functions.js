let jsonStringKey = "tasks"
let Tasks = {};
let openTasks = [];
let closeTasks = [];
let toTask = "";
let historyIndex = 0; 

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
    loadHistoryIndex();
    this.id = historyIndex++;
    Tasks[this.id] = this;
  }

  toggleDone(){
    if (this.doneButton.textContent == 'Open'){
      this.doneButton.textContent = "Close";
    }
    else{
      this.doneButton.textContent = "Open";
    }
  }

  deleteTask(){
    this.task.remove();
  }
}

function addTask(){
  toTask = "add";
  document.getElementById("actionBox").style.display = "";
}

function deleteTask(){
  toTask = "delete";
  document.getElementById("actionBox").style.display = "";
}

function editTask(){
  toTask = "edit";
  document.getElementById("actionBox").style.display = "";
}

function toggleFinished(){
   
}

function acceptAction(){
  switch (toTask) {
    case "add":
      document.getElementById("openTasks").appendChild(new Task(taskName=document.getElementById("inputText").value).task);
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
}

function deleteAllTask() {

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