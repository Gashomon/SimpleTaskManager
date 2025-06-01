function insert(id){
    document.getElementById(id).innerHTML ="Hello, this is insert function";
}

function append(id){
    pp = document.createElement("p");
    pp.textContent = "HIII this is a test to append function";
    document.getElementById(id).appendChild(pp);
}

function show(id){
    pages.forEach(page => {
        if (page == id) {   
            document.getElementById(page).style.opacity = '1';
        } else {
            document.getElementById(page).style.opacity = '0';
        }
    });    
}

class User{
    
}

class Task{
    constructor(id, title, desc){
        this.taskEntry = document.createElement("div");
        this.taskTitle = document.createElement("h1");
        this.taskDesc = document.createElement("p");
        this.taskTick = document.createElement("input");

        this.taskTitle.textContent = title;
        this.taskDesc.textContent = desc;
        this.taskTick.type = "Checkbox";

        this.taskEntry.id = "taskEntry";
        this.taskTitle.id = "taskTitle";
        this.taskDesc.id = "taskDesc";
        this.taskTick.id = "taskTick";

        this.taskEntry.appendChild(this.taskTick);
        this.taskEntry.appendChild(this.taskTitle);
        this.taskEntry.appendChild(this.taskDesc);


    }
}

function create(id, title, desc){
    let task = new Task(id, title, desc);
    document.getElementById(id).appendChild(task.taskEntry);
}

function clone(sourceid, destid){
    clone = document.getElementById(sourceid).cloneNode(true);
    document.getElementById(destid).appendChild(clone);
}

function loadDoc(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.getElementById(id).innerHTML = this.responseText;
    //   document.getElementById(id).innerHTML = "paosdpoaspdo";
    }
    xhttp.open("GET", "login.html", true);
    xhttp.send();
  }





  const pages = ['home', 'about', 'login']

  function show(id){
      pages.forEach(page => {
          if (page == id) {   
              document.getElementById(page).style.opacity = '1';
              // document.getElementById(page).style.zIndex = '1';
          } else {
              document.getElementById(page).style.opacity = '0';
              // document.getElementById(page).style.zIndex = '-1';
          }
  
          if (id == 'login') {
              document.getElementById('navhome').style.opacity = '0';
              document.getElementById('navlogin').style.opacity = '0';
          } else {
              document.getElementById('navhome').style.opacity = '1';
              document.getElementById('navlogin').style.opacity = '1';
          }
      });
  }


  function toggleNavItem(element, func){
    const elm = document.getElementById(element);
    if(elm.onclick == null){
        document.getElementById(element).onclick = func;
        document.getElementById(element).className = "navitem";
    }
    else{
        document.getElementById(element).onclick = func;
        document.getElementById(element).className = "navItemDisabled";
    }
    
}