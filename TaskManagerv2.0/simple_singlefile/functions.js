let jsonStringKey = "tasks"
let Tasks = [];
let openTasks = [];
let closeTasks = [];
let toTask = "add";

function addTask(){
  toTask = "add";
  document.getElementById("actionBox").style.display = "";
}

function deleteTask(){
  toTask = "delete";
  document.getElementById("actionBox").style.display = "";
}

function editTask(){
  toTask = "add";
  document.getElementById("actionBox").style.display = "";
}

function toggleFinished(){
   
}

function acceptAction(){

}

function cancelAction(){
  document.getElementById("actionBox").style.display = "none";
}

function deleteAllTask() {

}

function saveTasks() {
}

function loadTasks() {
}