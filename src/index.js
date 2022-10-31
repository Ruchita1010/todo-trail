import './styles/main.css';
import './styles/nav.css';
import './styles/modal.css';
import './styles/project.css';
import './styles/todo.css';
import switchTab from './modules/switchTab';
import { initLocalStorage, checkLocalStorage } from './modules/localStorage';
import {
  displayBgForEmptyLocalStorage,
  getSimilarClassElements,
  loadDefaultProjectTodos,
  loadProjectOptionsFromLocalStorage,
} from './modules/dom';

const pageLoad = () => {
  if (!checkLocalStorage()) {
    loadDefaultProjectTodos();
    loadProjectOptionsFromLocalStorage();
    return;
  }
  initLocalStorage();
  displayBgForEmptyLocalStorage();
};

const listenForNavItemClick = () => {
  const navListItems = getSimilarClassElements('nav-list-item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', switchTab);
  });
};

window.onload = pageLoad;
listenForNavItemClick();
