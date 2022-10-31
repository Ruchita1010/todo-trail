import {
  deleteProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from './localStorage';
import { displayProjectTodos } from './todos';
import {
  appendToWrapper,
  getSimilarClassElements,
  getUserInputs,
} from './utils';

let selectedProjectBgImg = '';
const setProjectBg = (e) => {
  const imgPath = e.target.src;
  selectedProjectBgImg = imgPath.split('/').pop();
};

const createProjectOption = (projectTitle) => {
  const projectOption = document.createElement('option');
  projectOption.value = projectTitle;
  projectOption.innerText = projectTitle;
  return projectOption;
};

const createProject = (
  projectTitle,
  highPriorityTasksCount,
  projectBg = selectedProjectBgImg
) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.innerHTML = `
  <button class="delete-project-btn">
    <span class="material-symbols-outlined icon">
      delete
    </span>
  </button>
  <img src="../src/assets/${projectBg}" alt="" />
  <div class="project-details">
    <h3 class="project-title">${projectTitle}</h3>
    <p class="high-priority-stats">High priority tasks: ${highPriorityTasksCount}</p>
  </div>
  `;
  return newProject;
};

const deleteProjectOption = (projectTitle) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOptionElement = projectOptions.querySelector(
    `option[value=${projectTitle}]`
  );
  projectOptions.removeChild(projectOptionElement);
};

const deleteProject = (e) => {
  e.stopPropagation();
  const wrapper = document.querySelector('.projects-wrapper');
  const project = e.target.parentNode;
  const projectTitle = e.target.parentNode.children[2].children[0].innerText;
  wrapper.removeChild(project);
  deleteProjectFromLocalStorage(projectTitle);
  deleteProjectOption(projectTitle);
};

// Listeners
// Listening for project background images ---
const listenForProjects = () => {
  const projects = getSimilarClassElements('project');
  projects.forEach((project) => {
    project.addEventListener('click', displayProjectTodos);
  });
};

const listenForProjectBgs = () => {
  const projectBgInput = document.querySelector('.project-bg-input');
  projectBgInput.addEventListener('click', (e) => {
    setProjectBg(e);
  });
};

const listenForProjectDeleteBtn = () => {
  const deleteBtns = getSimilarClassElements('delete-project-btn');
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', deleteProject);
  });
};

// Adding ---
const addProjectOption = (projectTitle) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOption = createProjectOption(projectTitle);
  projectOptions.appendChild(projectOption);
};

const addProject = () => {
  const userInputs = getUserInputs('project-modal');
  const [projectTitle] = userInputs;
  saveProjectToLocalStorage(projectTitle, 0, selectedProjectBgImg);
  const newProject = createProject(projectTitle, 0);
  appendToWrapper('projects-wrapper', newProject);
  listenForProjectDeleteBtn();
  // Adds to the project-options (dropdown)
  addProjectOption(projectTitle);
};

export {
  addProject,
  listenForProjects,
  listenForProjectBgs,
  listenForProjectDeleteBtn,
  createProject,
  addProjectOption,
};
