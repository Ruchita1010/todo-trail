import {
  getDefaultProjectTodos,
  getTodayTodos,
  getUserCreatedProjects,
  getWeekTodos,
} from '../dataModifiers';
import { listenForCreateOptionClick } from './modals';
import { createProject, listenForProjects } from './projects';
import { createTodo, listenForTodos } from './todos';
import { createWrapper, toggleDisplay, updateMain } from './utils';

// helper function for loading todos
const loadTodos = (wrapper, projectTodos) => {
  projectTodos.forEach((projectTodo) => {
    const todo = createTodo(projectTodo);
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
  listenForTodos();
};

// default project: all
const loadDefaultProjectTodos = async () => {
  const wrapper = createWrapper(['all-wrapper', 'todos-wrapper']);
  const defaultProjectTodos = await getDefaultProjectTodos();
  loadTodos(wrapper, defaultProjectTodos);
};

const loadToday = async () => {
  const wrapper = createWrapper(['today-wrapper', 'todos-wrapper']);
  const todayTodos = await getTodayTodos();
  loadTodos(wrapper, todayTodos);
};

const loadWeek = async () => {
  const wrapper = createWrapper(['week-wrapper', 'todos-wrapper']);
  const weekTodos = await getWeekTodos();
  loadTodos(wrapper, weekTodos);
};

const loadCreateOptions = () => {
  toggleDisplay('create-options', 'options');
  listenForCreateOptionClick();
};

const loadProjects = async () => {
  const wrapper = createWrapper(['projects-wrapper']);
  const userCreatedProjects = await getUserCreatedProjects();
  userCreatedProjects.forEach((userCreatedProject) => {
    const project = createProject(userCreatedProject);
    wrapper.appendChild(project);
  });
  updateMain(wrapper);
  listenForProjects();
};

export {
  loadCreateOptions,
  loadDefaultProjectTodos,
  loadProjects,
  loadToday,
  loadWeek,
};
