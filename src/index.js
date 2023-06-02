import './styles/main.css';
import './styles/nav.css';
import './styles/modal.css';
import './styles/project.css';
import './styles/todo.css';
import switchTab from './modules/switchTab';
import { getProjectOptions } from './modules/dataModifiers';
import { addProjectOption } from './modules/dom/projects';
import { loadDefaultProjectTodos } from './modules/dom/loaders';
import { getSimilarClassElements } from './modules/dom/utils';

const listenForNavItemClick = () => {
  const navListItems = getSimilarClassElements('nav-list-item');
  navListItems.forEach((navListItem) => {
    navListItem.addEventListener('click', switchTab);
  });
};

const loadProjectOptionsFromFirebase = async () => {
  const storedProjectsTitles = await getProjectOptions();
  storedProjectsTitles.forEach((storedProjectTitle) => {
    addProjectOption(storedProjectTitle);
  });
};

const pageLoad = () => {
  loadDefaultProjectTodos();
  loadProjectOptionsFromFirebase();
};

window.onload = pageLoad;
listenForNavItemClick();
