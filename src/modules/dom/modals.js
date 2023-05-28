import loadProjectBgsOptions from './projectBgs';
import { addProject } from './projects';
import { addTodo } from './todos';
import {
  clearInputFields,
  closeModal,
  getSimilarClassElements,
  getUserInputs,
  toggleDisplay,
} from './utils';

const addUserInputData = (e) => {
  const clickedBtn = e.target.classList[2];
  if (clickedBtn === 'project-modal-btn') {
    const userInputs = getUserInputs('project-modal');
    addProject(userInputs);
    clearInputFields('project-modal');
  } else {
    const userInputs = getUserInputs('todo-modal');
    addTodo(userInputs);
    clearInputFields('todo-modal');
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
    loadProjectBgsOptions();
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

export { listenForCreateOptionClick };
