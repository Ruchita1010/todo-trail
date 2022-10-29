import './styles/main.css';
import './styles/nav.css';
import './styles/modal.css';
import './styles/project.css';
import './styles/todo.css';
import switchTab from './modules/switchTab';
import { getSimilarClassElements } from './modules/dom';
import { initLocalStorage } from './modules/localStorage';
import { loadDefaultProjectTodos } from './modules/dom';

const pageLoad = () => {
  if (localStorage.projects) {
    loadDefaultProjectTodos();
    return;
  }
  initLocalStorage();
};

const listenForNavItemClick = () => {
  const navListItems = getSimilarClassElements('nav-list-item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', switchTab);
  });
};

window.onload = pageLoad;
listenForNavItemClick();
