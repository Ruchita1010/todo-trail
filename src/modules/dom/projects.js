import {
  deleteProjectFromLocalStorage,
  saveProjectToLocalStorage,
} from '../localStorage';
import { displayProjectTodos } from './projectTodos';
import {
  getActiveWrapperClass,
  getSimilarClassElements,
  appendToWrapper,
} from './utils';
import pattern0 from '../../assets/pattern-images/pattern-0.png';
import { v4 as uuidv4 } from 'uuid';

const createProjectOption = (projectTitle) => {
  const projectOption = document.createElement('option');
  projectOption.value = projectTitle;
  projectOption.innerText = projectTitle;
  return projectOption;
};

const createProject = ({
  projectId,
  projectTitle,
  projectBg,
  highPriorityTasksCount,
}) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  newProject.dataset.projectId = projectId;
  newProject.innerHTML = `
  <button class="delete-project-btn">
    <span class="material-symbols-outlined icon">
      delete
    </span>
  </button>
  <img src="${projectBg}" alt="" />
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
  const wrapper = document.querySelector('.projects-wrapper');
  const project = e.target.parentNode;
  const projectId = project.dataset.projectId;
  const projectTitle = project.children[2].children[0].innerText;
  wrapper.removeChild(project);
  deleteProjectFromLocalStorage(projectId);
  deleteProjectOption(projectTitle);
};

const checkClickedTarget = (e) => {
  if (e.target.classList.contains('delete-project-btn')) {
    deleteProject(e);
    return;
  }
  displayProjectTodos(e);
};

const listenForProjects = () => {
  const projects = getSimilarClassElements('project');
  projects.forEach((project) => {
    project.addEventListener('click', checkClickedTarget);
  });
};

const addProjectOption = (projectTitle) => {
  const projectOptions = document.querySelector('#project-options');
  const projectOption = createProjectOption(projectTitle);
  projectOptions.appendChild(projectOption);
};

const createProjectObject = (projectTitle) => {
  const projectId = uuidv4();
  const projectBg =
    document.querySelector('input[name="project-bg"]:checked')?.value ??
    pattern0;
  return {
    projectId,
    projectTitle,
    projectBg,
    highPriorityTasksCount: 0,
  };
};

const addProject = (userInputs) => {
  const [projectTitle] = userInputs;
  if (!projectTitle) return;
  const project = createProjectObject(projectTitle);
  saveProjectToLocalStorage(project);
  // Adds to the project-options (dropdown)
  addProjectOption(projectTitle);
  // Adding to DOM if the tab is active
  const activeWrapper = getActiveWrapperClass();
  if (activeWrapper === 'projects-wrapper') {
    const projectElement = createProject(project);
    appendToWrapper('projects-wrapper', projectElement);
    listenForProjects();
  }
};

export { addProject, addProjectOption, createProject, listenForProjects };
