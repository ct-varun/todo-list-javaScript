// let data = [];
let savedtodos;
if (localStorage.getItem("todos")) {
  savedtodos = JSON.parse(localStorage.getItem("todos"));
  console.log("fetched the data from localStorage", savedtodos);
  displayTodos(savedtodos);
} else {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((item) => {
      savedtodos = item;
      console.log("fetched the data from api", savedtodos);
    })
    .then((item) => localStorage.setItem("todos", JSON.stringify(savedtodos)))
    .then(() => {
      // savedtodos.sort((a, b) => b.id - a.id);
      displayTodos(savedtodos);
      editFunctionality();
    });
}

function displayTodos(todolist) {
  const bodyElement = document.querySelector("body");
  todolist.forEach((item) => {
    const todoDivWrapper = document.createElement("div");
    const todoDiv = document.createElement("div");
    const buttons = document.createElement("div");
    const todoTitle = document.createElement("h2");
    const removeButton = document.createElement("button");
    const editButton = document.createElement("button");
    const completeButton = document.createElement("button");
    todoTitle.innerText = item.title;
    todoTitle.style.paddingLeft = "10px";
    removeButton.innerText = "remove";
    removeButton.setAttribute("class", "remove-button");
    removeButton.setAttribute("id", item.id);
    removeButton.style.fontSize = "15px";
    removeButton.style.width = "30%";
    editButton.innerText = "edit the todo";
    editButton.setAttribute("class", "edit-button");
    editButton.setAttribute("id", item.id);
    editButton.style.fontSize = "15px";
    editButton.style.width = "30%";
    if (item.completed) {
      completeButton.innerText = "mark as incomplete";
    } else {
      completeButton.innerText = "mark as complete";
    }
    completeButton.setAttribute("class", "complete-button");
    completeButton.setAttribute("id", item.id);
    completeButton.style.cssText = `width:40%;`;
    completeButton.style.fontSize = "15px";
    todoDiv.appendChild(todoTitle);
    buttons.appendChild(removeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(completeButton);
    buttons.style.cssText = `display:flex;width:30%;justify-content:space-between;`;
    todoDiv.appendChild(buttons);
    const divForTodos = document.querySelector(".todos");
    todoDivWrapper.setAttribute("class", "todo-wrapper-div");
    todoDivWrapper.append(todoDiv);
    divForTodos.prepend(todoDivWrapper);
    todoDiv.style.cssText = `display:flex;justify-content:space-between;margin:10px 0;
            border:1px solid green;
            text-align:center;`;
    if (item.completed) {
      todoDiv.style.backgroundColor = "red";
    } else {
      todoDiv.style.backgroundColor = "green";
    }
    removeFunctionality(todoDiv);
    markCompleted(todoDiv);
    editFunctionality(todoDiv);
  });
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   const formdata = new FormData(form);
  //   console.log("hello", formdata);
  const todos = document.querySelectorAll(".todo-wrapper-div");
  // const todosToBeDeleted = document.querySelector(".todos");
  // for (let i = todosToBeDeleted.children.length - 1; i >= 0; i--) {
  //   console.log(todosToBeDeleted.children[i].remove());
  //   // console.log(divForTodos.children[i]);
  // }
  // displayTodos(savedtodos);
  todos.forEach((item) => {
    item.style.display = "block";
    console.log(item, "hello");
  });
  const searchBox = document.querySelector("#search-bar");
  searchBox.value = ""; //value is used for a text input and innerhtml is used for the value of tags
  const todoUserId = document.getElementById("userId");
  const todoId = savedtodos.length + 1;
  const todoTitle = document.getElementById("title");
  const addTodo = {
    userId: Number(todoUserId.value),
    id: todoId,
    title: todoTitle.value,
    completed: false,
  };
  savedtodos.push(addTodo);
  localStorage.setItem("todos", JSON.stringify(savedtodos));
  displayTodos([addTodo]);
});

function removeFunctionality(tododivs) {
  const removeTodo = tododivs.querySelectorAll(".remove-button");
  removeTodo.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      //   console.log(event.target.parentElement);
      //event.target is the element on which we are applying the onclick or on which we will click
      event.target.parentElement.parentElement.parentElement.remove();
      const idToBeDeleted = event.target.getAttribute("id");
      savedtodos.splice(idToBeDeleted - 1, 1);
      localStorage.setItem("todos", JSON.stringify(savedtodos));
    });
  });
}

function markCompleted(tododivs) {
  const markCompleted = tododivs.querySelectorAll(".complete-button");
  markCompleted.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      //   console.log(event.target.parentElement);
      if (
        event.target.parentElement.parentElement.style.backgroundColor ==
        "green"
      ) {
        event.target.parentElement.parentElement.style.backgroundColor = "red";
        event.target.innerText = "mark as Incomplete";
      } else {
        event.target.parentElement.parentElement.style.backgroundColor =
          "green";
        event.target.innerText = "mark as Complete";
      }
      const idToBeMarked = event.target.getAttribute("id");
      savedtodos.forEach((item) => {
        if (item.id == idToBeMarked) {
          if (item.completed) {
            item.completed = false;
          } else {
            item.completed = true;
          }
        }
      });
      localStorage.setItem("todos", JSON.stringify(savedtodos));
    });
  });
}

const searchInput = document.getElementById("search-bar");
searchInput.setAttribute("placeholder", "search your tasks");
searchInput.addEventListener("input", (event) => {
  // const divForTodos = document.querySelector(".todos");
  // for (let i = divForTodos.children.length - 1; i >= 0; i--) {
  //   console.log(divForTodos.children[i].remove());
  //   // console.log(divForTodos.children[i]);
  // }
  const todos = document.querySelectorAll(".todo-wrapper-div");
  todos.forEach((item) => {
    item.style.display = "none";
    // console.log("item");
  });
  //for visibility:hidden innerText does not show, innerText shows for display none and also for opacity zero
  // console.log("item 2");
  const searchWord = searchInput.value;
  // const newArray = savedtodos.filter((item) => item.title.includes(searchWord));
  // todos.forEach((item) => {
  //   console.log(item.querySelector("h2").innerText.includes(searchWord));
  // });
  todos.forEach((item) => {
    if (item.querySelector("h2").innerText.includes(searchWord)) {
      item.style.display = "block";
    }
  });
  // console.log("item 3");
  //In the first approach what I did was the every time the input event was trigerred first all the todos that were display were removed using remove then I found the titles that include the search input word and then I display all the titles that includes the search input word. In the second approach we are setting all the items as display none and the making the display of all items block which contain the search input word.
  // displayTodos(newArray);
});

function editFunctionality(todoitems) {
  const editButton = todoitems.querySelectorAll(".edit-button");
  editButton.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (document.querySelector(".todos").querySelector("form")) {
        document.querySelector(".todos").querySelector("form").remove();
      } else {
        const form = document.createElement("form");
        const inputElement = document.createElement("input");
        const submitButton = document.createElement("button");
        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("placeholder", "write the new task here");
        submitButton.setAttribute("type", "submit");
        inputElement.style.cssText = `width:100%;padding:10px;margin-bottom:10px;font-size:20px;`;
        submitButton.innerText = "submit";
        submitButton.style.cssText = `display:block;width:100%;padding:7px;`;
        form.appendChild(inputElement);
        form.appendChild(submitButton);
        item.parentElement.parentElement.parentElement.appendChild(form);
        inputElement.addEventListener("input", (event) => {
          const value = inputElement.value;
          const titleChangeLocation =
            inputElement.parentElement.parentElement.querySelector("h2");
          titleChangeLocation.innerText = inputElement.value;
          // titleChangeLocation.value = inputElement.value;
          const idOfEdit = item.getAttribute("id");
          savedtodos.find((item) => item.id == idOfEdit).title =
            inputElement.value;
          localStorage.setItem("todos", JSON.stringify(savedtodos));
        });
        submitButton.addEventListener("click", (event) => {
          event.preventDefault();
          form.remove();
        });
      }
    });
  });
}
const widgetDiv = document.createElement("div");
widgetDiv.innerText = "to the top";
widgetDiv.style.cssText = `width:100px;height:100px;padding-top:50px;border-radius:50%;background-color:black;position:fixed;left:50px;bottom:50px;text-align:center;color:#ffffff;`;
window.scrollTop = 0;
document.querySelector("body").appendChild(widgetDiv);

widgetDiv.addEventListener("click", (event) => {
  var currentScroll =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (currentScroll > 0) {
    // window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, 0); // Adjust the speed by changing the divisor
  }
});
