const getSimilarClassElements = (elemClass) => {
  const elemArray = document.querySelectorAll(`.${elemClass}`);
  return [...elemArray];
};

const showCreateOption = (e) => {
  toggleCreateOptions('create-options');
  const option = e.target.classList[1];
  if (option === 'todo-btn') {
  } else {
  }
};

const listenForCreateOptionClick = () => {
  const createOptions = getSimilarClassElements('create-option');
  createOptions.forEach((createOption) => {
    createOption.addEventListener('click', showCreateOption);
  });
};

const toggleCreateOptions = () => {
  const wrapper = document.querySelector('.create-options');
  wrapper.classList.toggle('show-options');
};

const loadCreateOptions = () => {
  toggleCreateOptions();
  listenForCreateOptionClick();
};

export { getSimilarClassElements, loadCreateOptions };
