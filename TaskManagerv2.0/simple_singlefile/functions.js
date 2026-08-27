let Tasks = [];

function addTask(){
    let newId = tempTaskCount++;
    const task = new Task(newId, "", "", 'ongoing');
 
    task.changeTitleUI();
    task.changeDescUI();

    document.getElementById('content').appendChild(task.taskEntry);
    Tasks[tempTaskCount] = task;

    if (localAccON) {
        let cnt = String(tempTaskCount);
        localStorage.setItem(`lastTaskId`, cnt);
        console.log(`TOTALED ${localStorage.getItem(`lastTaskId`)} TASKS SUCCESSFULLY`);
        console.log(`TOTALED ${cnt} TASKS SUCCESSFULLY`);
        
    }
}

function loadTasks(){
    // for (let i = 1; i <= tempTaskCount; i++) {
    //     document.getElementById('content').appendChild(Tasks[i].taskEntry);
    // }

    //localstorage use
    if (localAccON) {
        const oldtasks = localStorage.getItem(`lastTaskId`); 
        let title = "";
        let desc = "";
        let status = "";
        for (let i = 0; i < oldtasks; i++) {
            title = localStorage.getItem(`title${i}`);
            desc = localStorage.getItem(`desc${i}`);
            status = localStorage.getItem(`stat${i}`);

            if (status == "deleted") {
                console.log("deleted stuff");
                continue;
            }
            else{
                console.log(`import status ${status}`);
            }

            const task = new Task(i, title, desc, status);
            document.getElementById('content').appendChild(task.taskEntry);
            Tasks[i] = task;
            

            console.log(localStorage.getItem(`title${i}`));
            console.log(tempTaskCount);
        }
        tempTaskCount = oldtasks;

        console.log(`LOADED ${oldtasks} OLD TASKS SUCCESSFULLY`);
    } 

    //use multiple addTasks to import

}

function toggleFinished(){
    let nonehidden = document.getElementById('hideFinish').textContent == 'Hide Finished' ? true : false;
    if(nonehidden){
        document.getElementById('hideFinish').textContent = "Show Finished";
        for (let i = 1; i <= tempTaskCount; i++) {
            if(document.getElementById(`taskTick${i}`).checked){
                document.getElementById(`taskEntry${i}`).style.display = 'none';
            }
        }
    }
    else{
        document.getElementById('hideFinish').textContent = "Hide Finished";
        for (let i = 1; i <= tempTaskCount; i++) {
            document.getElementById(`taskEntry${i}`).style.display = 'block';
            
        }
    }
}


// Function to Display tasks
function displayTasks() {
  let html = "";
  for (let i = 0; i < tasks.length; i++) {
    html += "<li>" + tasks[i] +  " <button onclick='removeTask(" + i + ")';> x</button></li>";
  }
  document.getElementById("list").innerHTML = html;
}

// Function to Add a task
function addTask() {
  let taskInput = document.getElementById("task");
  let text = taskInput.value;
  if (text === "") {
    return;
  }
  tasks.push(text);
  taskInput.value = "";
  saveTasks();
  displayTasks();
}

// Function to Remove a task
function removeTask(i) {
  tasks.splice(i, 1);
  saveTasks();
  displayTasks();
}

// Function to Clear all tasks
function clearAll() {
  tasks = [];
  saveTasks();
  displayTasks();
}

// Function to Save tasks
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to Load tasks
function loadTasks() {
  let saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
}

// Load and display tasks when page loads 
loadTasks();
displayTasks();
