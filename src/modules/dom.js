import { isThisWeek, isToday, parseISO } from 'date-fns';
import {
  getUserCreatedProjects,
  getWeekProjects,
  getTodayProjects,
  getDefaultProjectTodos,
} from './dataModifiers';
import {
  saveTodoToLocalStorage,
  saveProjectToLocalStorage,
} from './localStorage';

// Utils ---
const getSimilarClassElements = (elemClass) => {
  const elemArray = document.querySelectorAll(`.${elemClass}`);
  return [...elemArray];
};

const toggleDisplay = (elemClass, elem) => {
  const wrapper = document.querySelector(`.${elemClass}`);
  wrapper.classList.toggle(`show-${elem}`);
};

const closeModal = (e) => {
  const clickedBtn = e.target.classList[2];
  if (clickedBtn === 'project-modal-btn') {
    toggleDisplay('project-modal', 'modal');
  } else {
    toggleDisplay('todo-modal', 'modal');
  }
  toggleDisplay('modal-wrapper', 'modal');
};

const getUserInputs = (parentModalElem) => {
  const userInputs = getSimilarClassElements(`${parentModalElem} .user-input`);
  return [...userInputs].map((userInput) => userInput.children[1].value);
};

const updateMain = (wrapper) => {
  const main = document.querySelector('main');
  main.innerText = '';
  main.appendChild(wrapper);
};

/* returns active wrapper class */
const getActiveWrapperClass = () => {
  const activeWrapper = document.querySelector('main').firstElementChild;
  if (activeWrapper) {
    return activeWrapper.classList[0];
  }
  return null;
};

/* an array of classes to which the todo can be added is created and if the active wrapper class
is included in the array, then the todo can added to the active wrapper  */
const checkTodo = (todoTitle, dueDate, activeWrapperClass) => {
  let todoClasses = [];
  if (isToday(parseISO(dueDate))) {
    todoClasses.push('today-wrapper');
  } else if (isThisWeek(parseISO(dueDate))) {
    todoClasses.push('week-wrapper');
  } else {
    todoClasses.push(`${todoTitle}-wrapper`);
  }
  return todoClasses.includes(activeWrapperClass);
};

const appendToWrapper = (wrapperClass, element) => {
  const wrapper = document.querySelector(`.${wrapperClass}`);
  /* elems gets add only if their wrapper exists thus, 
  elimating the need to keep toggling display. Also, prevents cluttering of 'main' */
  if (wrapper) {
    wrapper.appendChild(element);
  }
};

let selectedProjectBgImg = '';
const setProjectBg = (e) => {
  const imgPath = e.target.src;
  selectedProjectBgImg = imgPath.split('/').pop();
};

// Creating elements ---
const createWrapper = (classArr) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(...classArr);
  return wrapper;
};

const createTodo = (title, description, date, priority) => {
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');
  newTodo.innerHTML = `
  <div class="todo-header">
    <input type="checkbox" name="todo-checkbox" id="todo-checkbox" />
    <span class="due-date-label">${date}</span>
    <span class="priority-label">${priority}</span>
    <span class="material-symbols-outlined icon delete-todo-btn"> delete </span>
  </div>
  <div class="todo-content">
      <p class="todo-title">${title}</p>
      <p class="todo-description">${description}</p>
  </div>
  `;
  return newTodo;
};

const createProjectOption = (projectTitle) => {
  const projectOption = document.createElement('option');
  projectOption.value = projectTitle;
  projectOption.innerText = projectTitle;
  return projectOption;
};

const createProject = (projectTitle, projectBg = selectedProjectBgImg) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.innerHTML = `
  <button class="delete-project-btn">
    <span class="material-symbols-outlined icon">
      delete
    </span>
  </button>
  <img src="../src/assets/${projectBg}" alt="" />
  <div class="project-details">
    <h3 class="project-title">${projectTitle}</h3>
    <p class="high-priority-stats">High priority tasks: 3</p>
  </div>
  `;
  return newProject;
};

// Adding elements ---
const addTodo = () => {
  const userInputs = getUserInputs('todo-modal');
  const [title, description, dueDate, projectTitle, priority] = userInputs;
  saveTodoToLocalStorage(title, description, dueDate, projectTitle, priority);
  /* instead of calling the required load functions again (resulting in reloading of the 
  localStorage data), we can check the active tab(wrapper) and add the new element 
  directly to the DOM after saving it to localStorage */
  const newTodo = createTodo(title, description, dueDate, priority);
  const wrapperClass = getActiveWrapperClass();
  const todoContainsActive = checkTodo(title, dueDate, wrapperClass);
  if (todoContainsActive) {
    appendToWrapper(wrapperClass, newTodo);
  }
};

const addProjectOption = (projectTitle) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOption = createProjectOption(projectTitle);
  projectOptions.appendChild(projectOption);
};

const addProject = () => {
  const userInputs = getUserInputs('project-modal');
  const [projectTitle] = userInputs;
  saveProjectToLocalStorage(projectTitle, selectedProjectBgImg);
  const newProject = createProject(projectTitle);
  appendToWrapper('projects-wrapper', newProject);
  // Adds to the project-options (dropdown)
  addProjectOption(projectTitle);
};

const addUserInputData = (e) => {
  const clickedBtn = e.target.classList[2];
  if (clickedBtn === 'project-modal-btn') {
    addProject();
  } else {
    addTodo();
  }
  closeModal(e);
};

// Listening for project background images ---
const listenForProjectBgs = () => {
  const projectBgInput = document.querySelector('.project-bg-input');
  projectBgInput.addEventListener('click', (e) => {
    setProjectBg(e);
  });
};

// Listening for modal buttons ---
const listenForDoneBtns = () => {
  const doneBtns = getSimilarClassElements('done-btn');
  doneBtns.forEach((doneBtn) => {
    doneBtn.addEventListener('click', addUserInputData);
  });
};

const listenForCloseBtnClick = () => {
  const closeBtns = getSimilarClassElements('close-btn');
  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeModal, { once: true });
  });
};

// For create options ---
const showCreateOption = (e) => {
  // hide create options
  toggleDisplay('create-options', 'options');
  // show modal
  toggleDisplay('modal-wrapper', 'modal');
  const option = e.target.classList[1];
  if (option === 'todo-btn') {
    toggleDisplay('todo-modal', 'modal');
  } else {
    toggleDisplay('project-modal', 'modal');
    /* Cannot be called in addUserInputData or elsewhere 'cause event listener is not getting 
    added to projectBg (Reason yet unknown) */
    listenForProjectBgs();
  }
  listenForDoneBtns();
  listenForCloseBtnClick();
};

const listenForCreateOptionClick = () => {
  const createOptions = getSimilarClassElements('create-option');
  createOptions.forEach((createOption) => {
    createOption.addEventListener('click', showCreateOption);
  });
};

const loadCreateOptions = () => {
  toggleDisplay('create-options', 'options');
  listenForCreateOptionClick();
};

const loadDefaultProjectTodos = () => {
  const wrapper = createWrapper(['all-wrapper', 'todos-wrapper']);
  const defaultProjectTodos = getDefaultProjectTodos();
  defaultProjectTodos.forEach((defaultProjectTodo) => {
    const { todoTitle, description, dueDate, priority } = defaultProjectTodo;
    const todo = createTodo(todoTitle, description, dueDate, priority);
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
};

const loadProjects = () => {
  const wrapper = createWrapper(['projects-wrapper']);
  const projects = getUserCreatedProjects();
  projects.forEach(({ projectTitle, selectedProjectBg }) => {
    const project = createProject(projectTitle, selectedProjectBg);
    wrapper.appendChild(project);
  });
  updateMain(wrapper);
};

const loadWeek = () => {
  const wrapper = createWrapper(['week-wrapper', 'todos-wrapper']);
  const weekTodos = getWeekProjects();
  weekTodos.forEach((weekTodo) => {
    const { todoTitle, description, dueDate, priority } = weekTodo;
    const todo = createTodo(todoTitle, description, dueDate, priority);
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
};

const loadToday = () => {
  const wrapper = createWrapper(['today-wrapper', 'todos-wrapper']);
  const todayTodos = getTodayProjects();
  todayTodos.forEach((todayTodo) => {
    const { todoTitle, description, dueDate, priority } = todayTodo;
    const todo = createTodo(todoTitle, description, dueDate, priority);
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
};

export {
  getSimilarClassElements,
  loadCreateOptions,
  loadProjects,
  loadWeek,
  loadToday,
  loadDefaultProjectTodos,
};
