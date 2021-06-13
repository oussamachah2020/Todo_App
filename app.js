//<--Elements Selection-->
const Input = document.querySelector(".itemIn");
const Content = document.querySelector(".items-container");
const list = document.querySelector(".items-list");
const Counter = document.querySelector(".counterAndClear");
const clearBtn = document.querySelector(".ClearBtn");
const Container = document.querySelector(".container");
const SunImg = document.getElementById("dark_mode");
const Header = document.querySelector(".header");
const Options = document.querySelector(".options");
const FilterBtn = document.querySelectorAll(".btn");
//<---------------------->

console.log(FilterBtn);
console.log(Counter);

let item = 0;  
//<--Store the item in a local Storage-->

//<-------------------------------------->

//<--Count the Items from in the Enter and the delete-->
function countItems() {
  item++;
  Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;
  Counter.style.display = "block";
  clearBtn.style.display = "block";
  console.log(Counter);
}

function DecreaseItems() {
  item--;
  Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;

  if (item == 0) {
    clearBtn.style.display = "none";
    Counter.style.display = "none";
  }
}

function restoreItems() {
  item = 0;
  Counter.innerHTML = `<span class="Items_Counter">${item} items left</span>`;

  if (item == 0) {
    Counter.style.display = "none";
    clearBtn.style.display = "none";
    Content.style.display = "none";
  }
}
//<----------------------------------------------------->
const check = "check";
const uncheck = "circle";
const Line_Through = "lineThrough";
const src1 = "image/icon-check.svg";
const src2 = "image/BR.png";
let LIST,id;

let data = localStorage.getItem("Todo");
console.log(data);

if(data) {
  LIST = JSON.parse(data);
  loadList(LIST);
  id = LIST.length;
}else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function(item) {
      addTodo(item.name,item.id,item.done,item.trash);
  });
}

function addTodo(Todo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? check : uncheck;
  const Line = done ? Line_Through : "";
  const IMAGE = done ? src1 : src2;

  const item = `<ul class="items-list">
    <li>
        <p class="It">
            <img src="${IMAGE}" class="${DONE}" id="${id}" job="Done">
            <span class="text ${Line}">${Todo}</span> 
            <img src="image/icon-cross.svg" class="deleteBtn" job="remove">  
        </p>                  
    </li>  
</ul>`;

  const position = "beforeend";
  list.insertAdjacentHTML(position, item);

  countItems();
}

Input.addEventListener("keyup", addItem);
function addItem(event) {
  const Todo = Input.value;
  if (event.keyCode == 13 && Todo.length > 0) {
    console.log(Todo);

    if (Todo) {
      addTodo(Todo, id, false, false);
      LIST.push({
        name: Todo,
        id: id,
        trash: false,
        done: false,
      });
      id++;

      localStorage.setItem("Todo",JSON.stringify(LIST));
    }
    Input.value = "";
  }
}
//<------------------------>
function ItemDone(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(Line_Through);

  if (element.classList.contains(check)) {
    element.src = src1;
    DecreaseItems();
  } else if (element.classList.contains(uncheck)) {
    element.src = src2;
    countItems();
  }

  LIST[element.id].done = [element.id].done ? false : true;
}

function RemoveItem(element) {
  element.parentNode.parentNode.remove(element.parentNode);
  //LIST[element.id].trash = true;

  DecreaseItems();
}

list.addEventListener("click", (event) => {
  const element = event.target;
  const JobValue = element.attributes.job.value;

  console.log(element);

  if (JobValue === "Done") {
    ItemDone(element);
  } else if (JobValue === "remove") {
    RemoveItem(element);
  }

  localStorage.setItem("Todo",JSON.stringify(LIST));
});

//<--Modes-->
function LightMode() {
  Container.classList.remove("dark");
  SunImg.src = "image/icon-moon.svg";
  document.body.style.background = "hsl(0, 0%, 98%)";
  Header.style.backgroundImage = 'url("image/bg-mobile-light.jpg")';
  Input.classList.remove("itemIn");
  Input.classList.add("lightInput");
  Options.style.background = "hsl(0, 0%, 98%)";
  Content.classList.remove("items-container");
  Content.classList.add("lightList");
}

function DarkMode() {
  Container.classList.add("dark");
  SunImg.src = "image/icon-sun.svg";
  document.body.style.background = "hsl(235, 21%, 11%)";
  Header.style.backgroundImage = "url('image/bg-mobile-dark.jpg')";
  Input.classList.add("itemIn");
  Input.classList.remove("lightInput");
  Options.style.background = "hsl(235, 24%, 19%)";
  Content.classList.add("items-container");
  Content.classList.remove("lightList");
}
//<--------->

//<--Modes Switcher-->
SunImg.addEventListener("click", () => {
  const On = Container.classList.contains("dark");

  if (On) {
    LightMode();
  } else {
    DarkMode();
  }
});
//<----------------->

//<--Clear the list and the local storage-->
clearBtn.addEventListener("click", () => {
  localStorage.clear();

  Counter.style.display = "none";
  clearBtn.style.display = "none";

  restoreItems();
});
//<------------------>

/*FilterBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const Sym = e.currentTarget.dataset.id;
    console.log(Sym);
    //const Checked = list.classList.contains(check);
    //const Uncheck = list.classList.contains(uncheck);

    if (Sym === "Active") {
      list.classList.remove(uncheck);
    }
  });
});*/

