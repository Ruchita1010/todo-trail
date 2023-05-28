import { isThisWeek, isToday, parseISO } from 'date-fns';

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

const getUserInputs = (modalClass) => {
  const userInputs = getSimilarClassElements(`${modalClass} .user-input`);
  return [...userInputs].map((userInput) => userInput.children[1].value);
};

const clearInputFields = (modalClass) => {
  const userInputs = getSimilarClassElements(`${modalClass} .user-input`);
  const dropdownInputs = document.getElementsByTagName('select');
  userInputs.forEach((userInput) => {
    userInput.children[1].value = '';
  });
  // Puts default value in the dropdown as above code renders them empty
  [...dropdownInputs].forEach((dropdownInput) => {
    dropdownInput.selectedIndex = 0;
  });
};

/* an array of classes to which the todo can be added is created and if the active wrapper class
is included in the array, then the todo can added to the active wrapper  */
const addAndCheckActiveWrapperClass = (
  projectTitle,
  dueDate,
  activeWrapperClass
) => {
  let todoClasses = [];
  if (isToday(parseISO(dueDate))) {
    todoClasses.push('today-wrapper');
  }
  if (isThisWeek(parseISO(dueDate))) {
    todoClasses.push('week-wrapper');
  }
  todoClasses.push(`${projectTitle}-wrapper`);
  return todoClasses.includes(activeWrapperClass);
};

const createWrapper = (classArr) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add(...classArr);
  return wrapper;
};

/* returns active wrapper class */
const getActiveWrapperClass = () => {
  const activeWrapper = document.querySelector('main').firstElementChild;
  if (activeWrapper) {
    return activeWrapper.classList[0];
  }
  return null;
};

const appendToWrapper = (wrapperClass, element) => {
  const wrapper = document.querySelector(`.${wrapperClass}`);
  /* elems gets add only if their wrapper exists thus, 
  elimating the need to keep toggling display. Also, prevents cluttering of 'main' */
  if (wrapper) {
    wrapper.appendChild(element);
  }
};

const updateMain = (wrapper) => {
  const main = document.querySelector('main');
  main.innerText = '';
  main.appendChild(wrapper);
};

export {
  appendToWrapper,
  addAndCheckActiveWrapperClass,
  clearInputFields,
  closeModal,
  createWrapper,
  getActiveWrapperClass,
  getSimilarClassElements,
  getUserInputs,
  toggleDisplay,
  updateMain,
};
