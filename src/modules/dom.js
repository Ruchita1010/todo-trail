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

const updateMain = (elem) => {
  const main = document.querySelector('main');
  main.appendChild(elem);
};

const getUserInputs = (parentModalElem) => {
  const userInputDivs = getSimilarClassElements(
    `${parentModalElem} .user-input`
  );
  return [...userInputDivs].map((userInput) => userInput.children[1].value);
};

// Creating elements ---
const createTodo = ([title, description, date, , priority]) => {
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');
  newTodo.innerHTML = ` <p>Title ${title}</p>
  <p>Project ${project}</p>
  <p>Due Date ${date}</p>
  <p>Priority ${priority}</p>
  <p>Desc ${description}</p>`;
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
  newProject.innerHTML = `<p>Title ${projectTitle}</p>`;
  return newProject;
};

// Adding elements ---
const addTodo = () => {
  const userInputs = getUserInputs('todo-modal');
  const newTodo = createTodo(userInputs);
  updateMain(newTodo);
};

const addProjectOption = ([projectTitle]) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOption = createProjectOption(projectTitle);
  projectOptions.appendChild(projectOption);
};

const addProject = () => {
  const userInputs = getUserInputs('project-modal');
  const newProject = createProject(userInputs);
  updateMain(newProject);
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
