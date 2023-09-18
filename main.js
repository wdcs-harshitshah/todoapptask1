let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let data = JSON.parse(localStorage.getItem("data")) || [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value.trim() === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
  }
};

let acceptData = () => {
  const task = {
    text: textInput.value.trim(),
    date: dateInput.value,
    description: textarea.value,
    checked: false
  };

  data.push(task);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let toggleCheckbox = (taskId) => {
  data[taskId].checked = !data[taskId].checked;
  localStorage.setItem("data", JSON.stringify(data));
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.id = index;
    taskDiv.innerHTML = `
      <input type="checkbox" ${task.checked ? "checked" : ""} onclick="toggleCheckbox(${index})">
      <span class="fw-bold">${task.text}</span>
      <span class="small text-secondary">${task.date}</span>
      <p>${task.description}</p>
      <span class="options">
        <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(${index});createTasks()" class="fas fa-trash-alt"></i>
      </span>`;
    tasks.appendChild(taskDiv);
  });

  resetForm();
};

let filterTasks = (filterType) => {
  const filteredData = data.filter(task => {
    if (filterType === 'checked') {
      return task.checked;
    } else if (filterType === 'unchecked') {
      return !task.checked;
    }
    return true; 
  });

  tasks.innerHTML = "";  
  filteredData.forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.id = index;
    taskDiv.innerHTML = `
      <input type="checkbox" ${task.checked ? "checked" : ""} onclick="toggleCheckbox(${index})">
      <span class="fw-bold">${task.text}</span>
      <span class="small text-secondary">${task.date}</span>
      <p>${task.description}</p>
      <span class="options">
        <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick="deleteTask(${index});createTasks()" class="fas fa-trash-alt"></i>
      </span>`;
    tasks.appendChild(taskDiv);
  });
};

let deleteTask = (taskId) => {
  data.splice(taskId, 1);
  localStorage.setItem("data", JSON.stringify(data));
};

let editTask = (taskId) => {
  textInput.value = data[taskId].text;
  dateInput.value = data[taskId].date;
  textarea.value = data[taskId].description;
  deleteTask(taskId);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || []
    console.log(data);
    createTasks();
})();



