import './styles/main.css';
import './styles/nav.css';
import './styles/modal.css';
import switchTab from './modules/switchTab';
import { getSimilarClassElements } from './modules/dom';

const listenForNavItemClick = () => {
  const navListItems = getSimilarClassElements('nav-list-item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', switchTab);
  });
};

listenForNavItemClick();
