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
    `.${parentModalElem} .user-input`
  );
  return [...userInputDivs].map((userInput) => userInput.children[1].value);
};

const createTodo = () => {
  const [title, description, date, project, priority] =
    getUserInputs('todo-modal');
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');
  newTodo.innerHTML = ` <p>Title ${title}</p>
        <p>Project ${project}</p>
        <p>Due Date ${date}</p>
        <p>Priority ${priority}</p>
        <p>Desc ${description}</p>`;
  return newTodo;
};

const addTodo = () => {
  const newTodo = createTodo();
  updateMain(newTodo);
};

const createProject = (title) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.innerHTML = `<p>Title ${title}</p>`;
  return newProject;
};

const addProject = () => {
  const [title] = getUserInputs('project-modal');
  const newProject = createProject(title);
  updateMain(newProject);
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
