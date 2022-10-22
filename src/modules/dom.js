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
  const userInputDivs = getSimilarClassElements(
    `${parentModalElem} .user-input`
  );
  return [...userInputDivs].map((userInput) => userInput.children[1].value);
};

const appendToWrapperDiv = (wrapperClass, newProject) => {
  const wrapperDiv = document.querySelector(`.${wrapperClass}-wrapper`);
  wrapperDiv.appendChild(newProject);
};

let selectedProjectBgImg = '';
const setProjectBg = (e) => {
  const imgPath = e.target.src;
  selectedProjectBgImg = imgPath.split('/').pop();
};

// Creating elements ---
const createTodo = ([title, description, date, , priority]) => {
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

const createProject = ([projectTitle]) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.innerHTML = `
  <button class="delete-project-btn">
    <span class="material-symbols-outlined icon">
      delete
    </span>
  </button>
  <img src="../src/assets/${selectedProjectBgImg}" alt="" />
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
  const newTodo = createTodo(userInputs);
  appendToWrapperDiv('todos', newTodo);
};

const addProjectOption = ([projectTitle]) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOption = createProjectOption(projectTitle);
  projectOptions.appendChild(projectOption);
};

const addProject = () => {
  const userInputs = getUserInputs('project-modal');
  const newProject = createProject(userInputs);
  appendToWrapperDiv('projects', newProject);
  // Adds to the project-options (dropdown)
  addProjectOption(userInputs);
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

export { getSimilarClassElements, loadCreateOptions };
