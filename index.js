/* Note: Where the javascript and html need to interact, it should be done from the javascrip

The to-do list should be capable of the following task:
1.view all projects /
2.view all todos in each project (probably just the title and duedate.. perhaps changing color for different priorities) /
3.expand a single todo to see/edit its details <--
4.delete a todo <--

The to-do item should be capable of the following task:
1.title /
2.description <--
3.dueDate <--
4.priority <-- (I know how to tackle this one)

*/



// Imports:
// import _ from "date-fns";
// import { id } from "date-fns/locale";

// Global variables
let list = [];

// Documents the details of a todo item
class todo {
  constructor(id, task) {
    this.id = id;
    this.task = task;
  }
  getID() {
    return this.id;
  }
  getTask() {
    return this.task;
  }
  setTask(task) {
    this.task = task;
  }
}

// I don't really like using factory functions nor modules and I much prefer class, that said, I am not sure how I am supposed to devide my code up into classes in this case

const ToDoList = (() => {

  // The list container is just an outter box that contains all the contents
  const listContainer = document.querySelector(".list-container");

  // Tracks the ID of each todos
  let id_Counter = 0;

  // adding the trash button <<---------- Current stuck on this
  const trash_button_list = Array.from(document.querySelectorAll('.trash')); // Why does the list remain empty?
  console.log(trash_button_list);
  // trash_button.addEventListener('click', function(){
  // })

  // Is the reason for the code line 50-57 not working due to the fact that the todo container is overriding the trash button or is it that the trash button list is somehow empty
  for (let i = 0; i < trash_button_list.length; i++){
    trash_button_list[i].addEventListener("click",remove(i));
  }

  function remove(i){
    list.splice(i,1);
  }

  const expand_button = document.querySelector(".view-all");
  let expanded = false;

  // Expand all function
  expand_button.addEventListener("click", function () {
    const details = Array.from(document.querySelectorAll(".details"));
    if (!expanded) {
      for (let i = 0; i < details.length; i++) {
        details[i].style.display = "flex";
      }
      expanded = true;
    } else {
      for (let i = 0; i < details.length; i++) {
        details[i].style.display = "none";
      }
      expanded = false;
    }
  });

  // creates the todo button
  listContainer.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
      const currentTask = readTask();

      if (currentTask != "") {
        id_Counter++;
        const element = new todo(id_Counter, currentTask); // stores the todo (task information)
        element.setTask(currentTask);
        list.push(element);
        render(element);
      }
    }

    const todoContainer_div = Array.from(
      document.querySelectorAll(".todoContainer")
    );
    const details = Array.from(document.querySelectorAll(".details"));

    for (let i = 0; i < todoContainer_div.length; i++) {
      let showing = false;

      todoContainer_div[i].addEventListener("click", function () {
        if (!showing) {
          showing = true;
          details[i].style.display = "flex";
        } else if (showing) {
          showing = false;
          details[i].style.display = "none";
        }
      });
    }
  });

  // reads the inner text of the input field
  function readTask() {
    const input = document.querySelector(".todo");
    let task = input.value;
    input.value = ""; //  resets input value
    return task;
  }

  // note to self, need to pass the element around and not rely on the index of the todo container as that is subject to change
  function creatText(i, element) {
    const listElement = document.createElement("div");

    listElement.innerText = list[i].getTask();
    listElement.classList.add("listElement");

    
    const trash = document.createElement("img");
    trash.src = "images/trash.png";
    trash.classList.add("trash");

    listElement.appendChild(trash);
    return listElement;
  }

  function createImage() {
    const img = document.createElement("img");
    img.src = "images/down.png";
    img.classList.add("downArrow");
    return img;
  }

  function details(element) {
    const details = document.createElement("input");
    details.innerText = details.value; // don't really get why the input field would just dissapear
    // details.innerText = "This is the ID: " + element.getID(); // need to turn this into user input
    details.classList.add("details");
    return details;
  }

  // Renders the todo list
  function render(element) {
    for (let i = list.length - 1; i < list.length; i++) {
      const todoContainer = document.createElement("div");

      // Content of the task
      todoContainer.appendChild(createImage());

      // This extra div is just for sake of styling
      const dummy = document.createElement("div");
      dummy.classList.add("dummy");
      dummy.appendChild(creatText(i, element));
      dummy.appendChild(details(element));

      todoContainer.appendChild(dummy);

      todoContainer.classList.add("todoContainer");
      listContainer.appendChild(todoContainer);
    }
  }
})();

// I have no idea why this is still working after I commented out the imports, could you explain?
const dateDisplay = (() => {
  const date_div = document.querySelector(".date");
  console.log(date_div);
  const date_display = document.createElement("div");
  date_display.classList.add("date_display");
  const current_date = new Date();
  date_display.innerText = current_date;
  date_div.appendChild(date_display);
})();