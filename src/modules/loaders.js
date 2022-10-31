import {
  getDefaultProjectTodos,
  getProjectOptions,
  getTodayProjects,
  getUserCreatedProjects,
  getWeekProjects,
} from './dataModifiers';
import { listenForCreateOptionClick } from './modals';
import {
  addProjectOption,
  createProject,
  listenForProjectDeleteBtn,
  listenForProjects,
} from './projects';
import { createTodo, listenForTodos } from './todos';
import { createWrapper, toggleDisplay, updateMain } from './utils';

// Loading functions
const loadDefaultProjectTodos = () => {
  const wrapper = createWrapper(['all-wrapper', 'todos-wrapper']);
  const defaultProjectTodos = getDefaultProjectTodos();
  defaultProjectTodos.forEach((defaultProjectTodo) => {
    const { todoTitle, description, dueDate, priority, checkedattr } =
      defaultProjectTodo;
    const todo = createTodo(
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

const loadProjects = () => {
  const wrapper = createWrapper(['projects-wrapper']);
  const projects = getUserCreatedProjects();
  projects.forEach(
    ({ projectTitle, highPriorityTasksCount, selectedProjectBg }) => {
      const project = createProject(
        projectTitle,
        highPriorityTasksCount,
        selectedProjectBg
      );
      wrapper.appendChild(project);
    }
  );
  updateMain(wrapper);
  listenForProjects();
  listenForProjectDeleteBtn();
};

const loadWeek = () => {
  const wrapper = createWrapper(['week-wrapper', 'todos-wrapper']);
  const weekTodos = getWeekProjects();
  weekTodos.forEach((weekTodo) => {
    const { todoTitle, description, dueDate, priority, checkedattr } = weekTodo;
    const todo = createTodo(
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

const loadToday = () => {
  const wrapper = createWrapper(['today-wrapper', 'todos-wrapper']);
  const todayTodos = getTodayProjects();
  todayTodos.forEach((todayTodo) => {
    const { todoTitle, description, dueDate, priority, checkedattr } =
      todayTodo;
    const todo = createTodo(
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

const loadCreateOptions = () => {
  toggleDisplay('create-options', 'options');
  listenForCreateOptionClick();
};

// For initial page load
const loadProjectOptionsFromLocalStorage = () => {
  const storedProjectsTitles = getProjectOptions();
  storedProjectsTitles.forEach((storedProjectTitle) => {
    addProjectOption(storedProjectTitle);
  });
};

export {
  loadDefaultProjectTodos,
  loadToday,
  loadCreateOptions,
  loadWeek,
  loadProjects,
  loadProjectOptionsFromLocalStorage,
};
