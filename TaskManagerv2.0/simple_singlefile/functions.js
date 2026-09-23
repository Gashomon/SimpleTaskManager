let jsonStringKey = "tasks"
let Tasks = {};
let toTask = "";
let historyIndex = 0; 
let currentTaskID = historyIndex;

const limit = 300;

class Task{
  constructor(taskName, load=false, id=null, taskState="open"){
    this.task = document.createElement("div");
    this.name = document.createElement("h4");
    this.doneButton = document.createElement("button");
    this.editButton = document.createElement("button");
    this.deleteButton = document.createElement("button");
    
    this.id = 0;
    this.state = "open";
    
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

    
    this.createTask(taskName, load, id, taskState);
  }

  createTask(name, load, id, taskState){
    this.name.textContent = name;
    if(load){
      this.id = id;
      if(taskState == "close") {
        this.state = 'close';
        this.doneButton.textContent = "Open";
        this.editButton.disabled = true;
        this.task.className = "homeMain taskMain darken";
      }
    }
    else{
    this.id = historyIndex++;
    }
    
    this.task.id = this.id;
    this.updateTask();
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
    this.updateTask();
    saveTasks();
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
    delete Tasks[this.id];
    saveTasks();
  }

  updateTask(){
    Tasks[this.id] = [this.name.textContent, this.state];
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
      Tasks[currentTaskID][0] = [document.getElementById("inputText").value];
      break;

    default:
      window.alert("Error: no set Action");
      break;
  }
  saveTasks();
  cancelAction();
}

function cancelAction(){
  toTask = "";
  document.getElementById("inputText").value = "";
  document.getElementById("actionBox").style.display = "none";
  if(Object.values(Tasks).length != 0){
    document.getElementById(currentTaskID).className = "homeMain taskMain";
  }
}

function deleteAllTask() {
  document.getElementById("openTasks").textContent="";
  document.getElementById("doneTasks").textContent="";
  Tasks = {};
  historyIndex=0;
  localStorage.removeItem(historyIndex);
  localStorage.removeItem(jsonStringKey);
  cancelAction();
}

function toggleFinished(){
  buttonText = document.getElementById("hideFinished").textContent;
  if(buttonText == "Hide Finished"){
    document.getElementById("doneTasks").style.display = "none";
    document.getElementById("hideFinished").textContent = "Show Finished";
  }
  else{
    document.getElementById("doneTasks").style.display = "";
    document.getElementById("hideFinished").textContent = "Hide Finished";
  }
}

function saveTasks() {
  localStorage.setItem(jsonStringKey, JSON.stringify(Tasks));
  localStorage.setItem('historyIndex', historyIndex);
}

function loadHistoryIndex(){
  historyIndex = localStorage.getItem('historyIndex');

  if(historyIndex != null && !Number.isInteger(historyIndex)){
    historyIndex = 0;
  }
}

function loadTasks() {
  if(localStorage.getItem(jsonStringKey) != null){
    Tasks = JSON.parse(localStorage.getItem(jsonStringKey));
    if (Tasks.length > 0)
      historyIndex = Object.keys(Tasks).at(-1) +2;
  }
  Object.entries(Tasks).forEach((taskRecord) => {
    id = taskRecord[0];
    taskname = taskRecord[1][0];
    state = taskRecord[1][1];
    if(state == "close") {
      document.getElementById("doneTasks").appendChild(new Task(taskName=taskname, load=true, id=id, taskState=state).task);
    }
    else{
      document.getElementById("openTasks").appendChild(new Task(taskName=taskname, load=true, id=id, taskState=state).task);
    }
  });

}