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
      displayTodos(savedtodos);
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
    const completeButton = document.createElement("input");
    todoTitle.innerText = item.title;
    todoTitle.style.paddingLeft = "10px";
    todoTitle.style.width = "70%";
    removeButton.innerText = "remove";
    removeButton.setAttribute("class", "remove-button");
    removeButton.setAttribute("id", item.id);
    removeButton.style.fontSize = "15px";
    removeButton.style.width = "45%";
    editButton.innerText = "edit the todo";
    editButton.setAttribute("class", "edit-button");
    editButton.setAttribute("id", item.id);
    editButton.style.fontSize = "15px";
    editButton.style.width = "45%";
    if (item.completed) {
      completeButton.checked = true;
      completeButton.style.accentColor = "red";
    } else {
      completeButton.checked = false;
      completeButton.style.accentColor = "green";
    }
    completeButton.setAttribute("class", "complete-button");
    completeButton.setAttribute("id", item.id);
    completeButton.style.width = "10%";
    completeButton.setAttribute("type", "checkbox");
    todoDiv.appendChild(todoTitle);
    buttons.appendChild(removeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(completeButton);
    buttons.style.cssText = `display:flex;width:30%;justify-content:center;`;
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
  console.log("hello");
  const todos = document.querySelectorAll(".todo-wrapper-div");
  const searchBox = document.querySelector("#search-bar");
  searchBox.value = ""; //value is used for a text input and innerhtml is used for the value of tags
  const todoUserId = document.getElementById("userId");
  console.log("hello");
  console.log("new id is", savedtodos[savedtodos.length - 1].id);
  const todoId = savedtodos[savedtodos.length - 1].id + 1;
  const todoTitle = document.getElementById("title");
  const addTodo = {
    userId: Number(todoUserId.value),
    id: todoId,
    title: todoTitle.value,
    completed: false,
  };
  savedtodos.push(addTodo);
  localStorage.setItem("todos", JSON.stringify(savedtodos));
});
function removeFunctionality(tododivs) {
  const removeTodo = tododivs.querySelectorAll(".remove-button");
  removeTodo.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      //event.target is the element on which we are applying the onclick or on which we will click
      event.target.parentElement.parentElement.parentElement.remove();
      const idToBeDeleted = event.target.getAttribute("id");
      console.log(idToBeDeleted);
      for (item in savedtodos) {
        if (savedtodos[item].id == idToBeDeleted) {
          console.log(savedtodos.splice(item, 1));
        }
      }
      localStorage.setItem("todos", JSON.stringify(savedtodos));
      console.log(savedtodos);
    });
  });
}

function markCompleted(tododivs) {
  const markCompleted = tododivs.querySelectorAll(".complete-button");
  markCompleted.forEach((item) => {
    item.addEventListener("change", (event) => {
      if (
        event.target.parentElement.parentElement.style.backgroundColor ==
        "green"
      ) {
        event.target.parentElement.parentElement.style.backgroundColor = "red";
        event.target.style.accentColor = "red";
      } else {
        event.target.parentElement.parentElement.style.backgroundColor =
          "green";
        event.target.style.accentColor = "green";
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
  const todos = document.querySelectorAll(".todo-wrapper-div");
  todos.forEach((item) => {
    item.style.display = "none";
  });
  const searchWord = searchInput.value;
  todos.forEach((item) => {
    if (item.querySelector("h2").innerText.includes(searchWord)) {
      item.style.display = "block";
    }
  });
  // console.log("item 3");
  // In the first approach what I did was the every time the input event was trigerred first all the todos that were display were removed using remove then I found the titles that include the search input word and then I display all the titles that includes the search input word. In the second approach we are setting all the items as display none and the making the display of all items block which contain the search input word. On display hidden I was not able to get the innerText so I had to do display none, also display none is better as it does not take up space in the layout also, even on having display none I could get the innerText.
  // displayTodos(newArray);
});

function editFunctionality(todoitems) {
  const editButton = todoitems.querySelectorAll(".edit-button");
  editButton.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (
        document.querySelector(".todos").querySelector("form") &&
        document
          .querySelector(".todos")
          .querySelector("form")
          .querySelector("input").id == item.id
      ) {
        document.querySelector(".todos").querySelector("form").remove();
      } else {
        if (document.querySelector(".todos").querySelector("form")) {
          document.querySelector(".todos").querySelector("form").remove();
        }
        const form = document.createElement("form");
        const inputElement = document.createElement("input");
        const submitButton = document.createElement("button");
        inputElement.setAttribute("id", item.id);
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
widgetDiv.style.cssText = `width:100px;height:100px;padding-top:50px;border-radius:50%;background-color:black;position:fixed;left:50px;bottom:50px;text-align:center;cursor:pointer;color:#ffffff;`;
document.querySelector("body").appendChild(widgetDiv);

widgetDiv.addEventListener("click", (event) => {
  window.scrollTo(0, 0);
});
