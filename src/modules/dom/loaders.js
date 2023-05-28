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
    const { todoId, todoTitle, description, dueDate, priority, checkedattr } =
      projectTodo;
    const todo = createTodo(
      todoId,
      todoTitle,
      description,
      dueDate,
      priority,
      checkedattr
    );
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
  listenForTodos();
};

// default project: all
const loadDefaultProjectTodos = () => {
  const wrapper = createWrapper(['all-wrapper', 'todos-wrapper']);
  const defaultProjectTodos = getDefaultProjectTodos();
  loadTodos(wrapper, defaultProjectTodos);
};

const loadToday = () => {
  const wrapper = createWrapper(['today-wrapper', 'todos-wrapper']);
  const todayTodos = getTodayTodos();
  loadTodos(wrapper, todayTodos);
};

const loadWeek = () => {
  const wrapper = createWrapper(['week-wrapper', 'todos-wrapper']);
  const weekTodos = getWeekTodos();
  loadTodos(wrapper, weekTodos);
};

const loadCreateOptions = () => {
  toggleDisplay('create-options', 'options');
  listenForCreateOptionClick();
};

const loadProjects = () => {
  const wrapper = createWrapper(['projects-wrapper']);
  const userCreatedProjects = getUserCreatedProjects();
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
