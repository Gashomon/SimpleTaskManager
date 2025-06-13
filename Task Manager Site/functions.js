let currUser = "Guest";
let currID = 0;
let tempTaskCount = 0;
let Tasks = [];

const localUSer = "Guest"
const localPass = "ge"
let localAccON = false

function loadLogin(){
    document.getElementById('navlogin').onclick = () => {loadLogin();}
    document.getElementById('navhome').onclick = () => {null}
    document.getElementById('navhome').title = "login to Continue"; 
    show('login');
    document.getElementById("footText").textContent += new Date().getFullYear();
}

function show(page){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById('content').innerHTML = this.responseText;
        }
    xhttp.open("GET", page+'.html', true);
    xhttp.send();
}

function login(){
    const uname = document.getElementById('loginForm').elements[0].value;
    const pass = document.getElementById('loginForm').elements[1].value;
    const toSignup = document.getElementById('loginForm').elements[2].checked;

    // fetch user data using username

    if (toSignup) {
        let validNewAcc = false;
        
        // add new account

        validNewAcc = true //for testing only
        if (!validNewAcc) {
            document.getElementById("loginResponse").textContent = "Invalid Account";
            return;
        }
    } else {
        let rightPass = false;
        
        if (uname == localUSer) {
            rightPass = true;
        }
        // verify password

        if(!rightPass){
            document.getElementById("loginResponse").textContent = "Wrong Credentials";
            return;
        }
    }
    
    currUser = uname;
    //fetch user ID

    if (uname == localUSer && pass ==localPass) {
        if (typeof(Storage) !== "undefined") {
            localAccON = true
        } 
        else {
            localAccON = false
            document.getElementById("loginResponse").textContent = "Can't Load Local User";
            return;
        }
        
    }
    else{
        localAccON = false
    }

    tempTaskCount = 0;

    // toggleNavItem('navhome', 'loadHome()');  
    loadHome(currID, currUser);

    
}

function logout(){
    if(window.confirm("Are you sure Log Out?")){
        loadLogin();
    }
}

function loadHome(userid=currID, username=currUser){
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById('content').innerHTML = this.responseText;
        document.getElementById('greeting').textContent = `WELCOME ${username}!`;

        document.getElementById('navlogin').onclick = () => {logout();}
        document.getElementById('navhome').onclick = () => {loadHome();}
        document.getElementById('navhome').title = null; 

        loadTasks();
        }
    xhttp.open("GET", 'home.html', true);
    xhttp.send();
}

class Task{
    constructor(taskid, title, desc, status){
        this.taskEntry = document.createElement("div");
        this.taskTitle = document.createElement("h1");
        this.taskDesc = document.createElement("p");
        this.taskTick = document.createElement("input");
        this.taskDel = document.createElement("button");

        this.taskTitle.textContent = title;
        this.taskDesc.textContent = desc;
        this.taskTick.type = "Checkbox";
        this.taskTitle.title = "Double Click to Change";
        this.taskDesc.title = "Double Click to Change";
        this.taskTick.title = "Mark as Done";
        this.taskDel.title = "Delete Task";
        this.status = status;
        this.tmpid = tempTaskCount;
        this.id = taskid;

        this.taskEntry.className = "taskEntry";
        this.taskTitle.className = "taskText taskTitle";
        this.taskDesc.className = "taskText taskDesc";
        this.taskTick.className = "taskBtn taskTick";
        this.taskDel.className = "taskBtn taskDel";

        this.taskEntry.id = `taskEntry${this.tmpid}`;
        this.taskTitle.id = `taskTitle${this.tmpid}`;
        this.taskDesc.id = `taskDesc${this.tmpid}`;
        this.taskTick.id = `taskTick${this.tmpid}`;
        this.taskDel.id = `taskDel${this.tmpid}`;

        this.taskEntry.appendChild(this.taskTick);
        this.taskEntry.appendChild(this.taskTitle);
        this.taskEntry.appendChild(this.taskDesc);
        this.taskEntry.appendChild(this.taskDel);

        this.checkStatus();

        //apply backend

        if (localAccON) {
            localStorage.setItem(`title${taskid}`, title)
            localStorage.setItem(`desc${taskid}`, desc)
            localStorage.setItem(`stat${taskid}`, status)
        }
        
        this.taskTick.onclick = () => {
            this.changeStatusUI();
        }

        this.taskDel.onclick = () =>{
            this.deleteTaskUI();
        }

        this.taskTitle.ondblclick = () => {
            this.changeTitleUI();
        }
        
        this.taskDesc.ondblclick = () => {
            this.changeDescUI();
        }
    }

    changeTitleUI(){
        const tmpTitle = document.createElement("input");
        tmpTitle.type = "text";
        tmpTitle.placeholder = "Task Name";
        tmpTitle.className = "tmpTaskTitle";
        tmpTitle.maxLength = 10;
        // tmpTitle.value = this.taskTitle.textContent; //store old value. doesnt clear initial data.
        
        this.taskEntry.replaceChild(tmpTitle, this.taskTitle);

        tmpTitle.onchange = () => {
            this.taskTitle.textContent = tmpTitle.value;
            this.taskEntry.replaceChild(this.taskTitle, tmpTitle);

            this.changeTitle();
        }
    }

    changeDescUI(){
        const tmpDesc = document.createElement("input");
        tmpDesc.type = "text";
        tmpDesc.placeholder = "Task Description";
        tmpDesc.className = "tmpTaskDesc";
        tmpDesc.maxLength = 50;
        // tmpDesc.value = this.taskDesc.textContent; //store old value. doesnt clear initial data.
        
        this.taskEntry.replaceChild(tmpDesc, this.taskDesc);

        tmpDesc.onchange = () => {
            this.taskDesc.textContent = tmpDesc.value;
            this.taskEntry.replaceChild(this.taskDesc, tmpDesc);

            this.changeDesc();
        }
    }

    changeStatusUI(){
        if(this.taskTick.checked){
            this.status = "Done";
            this.taskEntry.style.backgroundColor = "hsl(36, 10%, 50%)";
            this.taskTitle.style.backgroundColor = "hsl(160, 10%, 35%)";
            this.taskDesc.style.backgroundColor = "hsl(180, 10%, 57%)";
        }
        else{
            this.status = "Ongoing";
            this.taskEntry.style.backgroundColor = "hsl(36, 100%, 90%)";
            this.taskTitle.style.backgroundColor = "hsl(160, 100%, 75%)";
            this.taskDesc.style.backgroundColor = "hsl(180, 100%, 97%)";
        }
        this.changeStatus();
    }

    deleteTaskUI(){
        if(window.confirm("Delete Task?")){
            this.taskEntry.remove();
            this.deleteTask();
        }
    }

    checkStatus(){
        if (this.status == "Done") {
            this.taskTick.checked = true;
        }
        this.changeStatusUI();
        console.log(this.status);
        
    }

    //backend codes
    changeTitle(){
        if (localAccON) {
            localStorage.setItem(`title${this.id}`,  this.taskTitle.textContent);
            console.log(`title is ${localStorage.getItem(`title${this.id}`)}`);
        }   
    }

    changeDesc(){
        if (localAccON) {
            localStorage.setItem(`desc${this.id}`, this.taskDesc.textContent);
            console.log(`desc is ${localStorage.getItem(`desc${this.id}`)}`);
        }
    }

    changeStatus(){
        if (localAccON) {
            localStorage.setItem(`stat${this.id}`, this.status)
            console.log(`status is ${localStorage.getItem(`stat${this.id}`)}`);
        }
    }

    deleteTask(){
        if (Tasks.length == 1) {
            Tasks = []
        } else {
            Tasks.splice(this.tmpid,1);
        }

        if (localAccON) {
            localStorage.setItem(`stat${this.id}`, "deleted");

            if (Tasks.length == 0) {
                localStorage.clear();
                localStorage.setItem(`lastTaskId`, String(0))
                console.log("cleared");
            }
            console.log(Tasks.length);
        }
    }
}

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

