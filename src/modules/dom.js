const getSimilarClassElements = (elemClass) => {
  const elemArray = document.querySelectorAll(`.${elemClass}`);
  return [...elemArray];
};

const toggleDisplay = (elemClass, elem) => {
  const wrapper = document.querySelector(`.${elemClass}`);
  wrapper.classList.toggle(`show-${elem}`);
};

function closeModal(e) {
  const clickedBtn = e.target.classList[2];
  if (clickedBtn === 'project-close-btn') {
    toggleDisplay('project-modal', 'modal');
  } else {
    toggleDisplay('todo-modal', 'modal');
  }
  toggleDisplay('modal-wrapper', 'modal');
}

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
