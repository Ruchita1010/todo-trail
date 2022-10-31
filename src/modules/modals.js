import { addProject, listenForProjectBgs } from './projects';
import { addTodo } from './todos';
import { closeModal, getSimilarClassElements, toggleDisplay } from './utils';

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

export { listenForCreateOptionClick };
