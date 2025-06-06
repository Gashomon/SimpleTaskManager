let currUser = "Guest";
let currID = 0;
let tempTaskCount = 0;

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
        // verify password

        validNewAcc = true //for testing only
        if (!validNewAcc) {
            document.getElementById("loginResponse").textContent = "Invalid Account";
            return;
        }
    } else {
        let rightPass = false;
        // add new account

        if(!rightPass){
            document.getElementById("loginResponse").textContent = "Wrong Credentials";
            return;
        }
    }
    
    currUser = uname;
    //fetch user ID

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
        }
    xhttp.open("GET", 'home.html', true);
    xhttp.send();
}

class Task{
    constructor(userid, title, desc, status){
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
        
        
        this.taskTick.onclick = () => {
            this.changeStatus();
            // import code to change in backend
        }

        this.taskDel.onclick = () =>{
            this.deleteTask();
            // import code to delete in backend
        }

        this.taskTitle.ondblclick = () => {
            this.changeTitle();
            // import code to change in backend
        }
        
        this.taskDesc.ondblclick = () => {
            this.changeDesc();
            // import code to change in backend
        }

        this.changeTitle();
        this.changeDesc();
        // import code to create in backend
    }

    changeTitle(){
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
        }
    }

    changeDesc(){
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
        }
    }

    changeStatus(){
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
    }

    deleteTask(){
        if(window.confirm("Delete Task?")){
            this.taskEntry.remove();
        }
    }
}

function addTask(){
    let newId = tempTaskCount++;
    const task = new Task(newId, "", "", 'ongoing');

    document.getElementById('content').appendChild(task.taskEntry);
}

function loadTasks(){
    //use multiple addTasks
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

