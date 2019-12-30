class Task {
    constructor(UnikNumber, description, date, time) {
        this.UnikNumber = UnikNumber;
        this.description = description;
        this.date = date;
        this.time = time;
    }
}


//Global array
var toDoList = [];


// // Function - getting ifno from Local Storage
(function () {

    var str = localStorage.getItem("taskDetails");
    var tasksLocalStorage = JSON.parse(str);
    toDoList = tasksLocalStorage;

    if (toDoList === null) {
        console.log("My task array from local storage: is NULL!");
        toDoList = new Array();
    } else {
        console.log("My task array leng htfrom local storage: " + toDoList.length);

        toDoList.forEach(element => {
            addTaskToUI(element);
        });
    }
})();



// Function - pushing new item into global array
function pushTaskToArray(taskToAdd) {
    toDoList.push(taskToAdd);
}


//Function to create a new task
function createNewTask() {

    var enterInfo = document.getElementById("enterInfo");
    var childArray = enterInfo.children;


    var description = enterInfo.querySelector(".descriptionTextAria").value;
    var date = enterInfo.querySelector(".datePicker").value;
    var time = enterInfo.querySelector(".timePicker").value;

    if (description == "") {
        alert("Missing description of task.");
        return;
    }
    if (date == "") {
        alert("Missing date of task");
        return;
    }

    var newTaskUnikNumber = 0;

    if (toDoList.length > 0) {
        
        var arraySize = toDoList.length;
        var lastIndexNumber = arraySize - 1;
        var lastItemofArray = toDoList[lastIndexNumber];
        var lastUnikNumber = lastItemofArray.UnikNumber;
        newTaskUnikNumber = lastUnikNumber + 1;

        // newTaskUnikNumber = toDoList[toDoList.length-1].UnikNumber+1;
    }


    var task = new Task(newTaskUnikNumber, description, date, time);

    pushTaskToArray(task);
    localStorage.setItem('taskDetails', JSON.stringify(toDoList));

    addTaskToUI(task);
}


// Function to create a new task on main page
function addTaskToUI(task) {

    var template = document.getElementById("taskTamplate");
    var noteClone = template.cloneNode(true);
    var descriptionP = noteClone.querySelector(".descriptionP");
    var dateP = noteClone.querySelector(".dateP");
    var timeP = noteClone.querySelector(".timeP");
    var iconClose = noteClone.querySelector(".iconClose");

    iconClose.id = task.UnikNumber;
    descriptionP.innerHTML = task.description;
    dateP.innerHTML = task.date;
    timeP.innerHTML = task.time;


    var tasks = document.getElementById("tasks");

    tasks.appendChild(noteClone);
    noteClone.style.visibility = "visible";
    iconClose.style.visibility="visible";
}

// Function to delete task from array,Local Storage and main page
function deleteTask(id) {
    console.log("size of array before delete is: " + toDoList.length);


    for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].UnikNumber == id) {

            toDoList.splice(i, 1);
            localStorage.setItem('taskDetails', JSON.stringify(toDoList));

            break;
        }
    }
    console.log("size of array after delete is: " + toDoList.length);

    var allHTMLTemplatesArray = document.getElementsByClassName("taskTamplate");
    console.log("amount of template before delete" + allHTMLTemplatesArray.length)

    for (let i = 0; i < allHTMLTemplatesArray.length; i++) {
        var currentTemplate = allHTMLTemplatesArray[i];
        var iconeClose = currentTemplate.querySelector(".iconClose");
        if (iconeClose.id == id) {
            currentTemplate.remove();
            break;

        }

    }
    console.log("amount of template after delete" + allHTMLTemplatesArray.length)



}