// Κώδικας που θα εκτελείται όταν φορτωθεί η σελίδα:
// Code that will run when the page is loaded:
//
// Γράψτε εδώ τον κώδικά σας
// Write your code here
//

//--------------------------------------------------
// Ο παραπάνω κώδικας θα κάνει χρήση των εξής συναρτήσεων:
// The above code will use the following functions:

updateTaskManager();


let inputElement = document.querySelectorAll("input#item");
inputElement = inputElement[0];

//console.log(listItems[1].className);
//console.log(tasks);
inputElement.addEventListener("keyup", (e) =>
{
    if (e.code === "Enter") {
        
        let newTaskText = inputElement.value;
        createNewTask(newTaskText);
        colorEveryOddTask();
        inputElement.value = "";

        updateTaskManager();
        
    }
});



// 1. Επιστρέφει το πλήθος των εργασιών που έχουν σημειωθεί ως ολοκληρωμένες
// 1. Returns the count of the tasks that have been marked as done
function getDoneCount() {
    const doneTasks = document.querySelectorAll('.done');
    return doneTasks.length;
    
}

// 2. Επιστρέφει το πλήθος όλων των εργασιών
// 2. Returns the total count of all the tasks
function getTotalCount() {
    const totalTasks = document.querySelectorAll('ul.task-list li');
    return totalTasks.length;

}

// 3. Χρωματίζει όλες τις εργασίες ανάλογα με τη θέση τους στο list
// 3. Colors every odd task
function colorEveryOddTask() {
    let oddLines = document.querySelectorAll('ul li:nth-child(odd) span:nth-child(2)');
    let evenLines = document.querySelectorAll('ul li:nth-child(even) span:nth-child(2)');
    for(i=0;i<oddLines.length;i++){
        //console.log(evenLines[i]);
        (oddLines[i]).setAttribute("style", "background-color:rgb(216, 215, 215)");
    }
    for(i=0;i<evenLines.length;i++){
        //console.log(evenLines[i]);
        (evenLines[i]).setAttribute("style", "background-color:white");
    }
    return ; 
}

// 4. Μετατρέπει ένα μη ολοκληρωμένο task σε ολοκληρωμένο (done) και αντίστροφα
function changeState(listELement, i){
    let classes = listELement[i].className;
    console.log(classes)
    let newClasses = "";
    if (classes.includes("done")) {
        newClasses = classes.replace("done","");
    }
    else {newClasses = classes + " done";}
    listELement[i].className = newClasses;

}

// 5. Ανανεώνει τις τιμές των μετρητών total και to-do
function updateTaskManager(){
    let leftToDoMessage = document.querySelectorAll('.left-todo');
    leftToDoMessage = leftToDoMessage[0];
    leftToDoMessage.textContent = getTotalCount()- getDoneCount();

    let totalMessage = document.querySelectorAll('.total');
    totalMessage = totalMessage[0];
    totalMessage.textContent =getTotalCount();
}

// 6. Δημιουργεί ένα νέο task στη λίστα και το εφοδιάζει με
//    τους κατάλληλους event listeners 
function createNewTask(text){
    let newItem = document.createElement('li');
    let newItemDate = document.createElement('span');
    const months = ["Ιανουαρίου",
    "Φεβρουαρίου","Μαρτίου","Απριλίου","Μαΐου","Ιουνίου",
    "Ιουλίου", "Αυγούστου","Σεπτεμβρίου","Οκτωβρίου","Νοεμβρίου",
    "Δεκεμβρίου"];
    const date = new Date();
    const date2 = new Date();
    let diff = String(Math.ceil(Math.abs(date2 - date) / (1000 * 60 * 60 * 24)));

    if (diff === '0')
        diff = "Σήμερα";
    else if (diff === '1')
        diff = "Χθες";
    else
        diff = diff + " ημέρες πριν";
    newItemDate.innerHTML = date.getDay() +" "+ months[date.getMonth()] +" "+ date.getFullYear() +
    "<br>" + diff ;

    let newItemTaskSpan = document.createElement('span');
    newItemTaskSpan.textContent = text;
    newItem.appendChild(newItemDate);
    newItem.appendChild(newItemTaskSpan);

    let toDoList = document.querySelectorAll("ul.task-list")[0];
    toDoList.appendChild(newItem);

    let task = document.querySelectorAll("ul.task-list li:last-child span:nth-child(2)")[0];
    task.addEventListener("click", function() {
            let classes = (task.parentElement).className;
            console.log(classes);
            let newClasses = "";
            if (classes.includes("done")) {
                newClasses = classes.replace("done","");
            }
            else {newClasses = classes + " done";}
            (task.parentElement).className = newClasses;
    
            updateTaskManager();
            colorEveryOddTask();
        });
    
    task.addEventListener("dblclick", function() {
        task.parentElement.remove();
        updateTaskManager();
        colorEveryOddTask();
        });
}