import './styles/main.css';
import './styles/nav.css';
import './styles/modal.css';
import './styles/project.css';
import './styles/todo.css';
import switchTab from './modules/switchTab';
import { getSimilarClassElements } from './modules/dom';
import { initLocalStorage } from './modules/localStorage';

const listenForNavItemClick = () => {
  const navListItems = getSimilarClassElements('nav-list-item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', switchTab);
  });
};

initLocalStorage();
listenForNavItemClick();
