import {
  deleteProjectFromFirebase,
  saveProjectToFirebase,
} from '../firebase/firebaseDataActions';
import { displayProjectTodos } from './projectTodos';
import {
  getActiveWrapperClass,
  getSimilarClassElements,
  appendToWrapper,
  getImagePath,
} from './utils';

const createProjectOption = (projectTitle) => {
  const projectOption = document.createElement('option');
  projectOption.value = projectTitle;
  projectOption.innerText = projectTitle;
  return projectOption;
};

const createProject = ({
  projectTitle,
  backgroundImage,
  highPriorityTasksCount,
}) => {
  const newProject = document.createElement('div');
  newProject.classList.add('project');
  const imgPath = getImagePath(backgroundImage);
  newProject.innerHTML = `
  <button class="delete-project-btn">
    <span class="material-symbols-outlined icon">
      delete
    </span>
  </button>
  <img src="${imgPath}" alt="" />
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
  const projectTitle = project.children[2].children[0].innerText;
  wrapper.removeChild(project);
  deleteProjectFromFirebase(projectTitle);
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
  const backgroundImage =
    document.querySelector('input[name="project-bg"]:checked')?.value ??
    'pattern-0.png';
  return {
    projectTitle,
    backgroundImage,
    highPriorityTasksCount: 0,
  };
};

const addProject = (userInputs) => {
  const [projectTitle] = userInputs;
  if (!projectTitle) return;
  const project = createProjectObject(projectTitle);
  saveProjectToFirebase(project);
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
