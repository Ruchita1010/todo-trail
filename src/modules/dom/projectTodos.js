import { getProjectTodos } from '../dataModifiers';
import { createTodo, listenForTodos } from './todos';
import { createWrapper, updateMain } from './utils';

// For projects in the projects-wrapper ---
const displayProjectTodos = async (e) => {
  const projectTitle = e.target.children[2].children[0].innerText;
  const projectTodos = await getProjectTodos(projectTitle);
  const wrapper = createWrapper([`${projectTitle}-wrapper`, 'todos-wrapper']);
  projectTodos.forEach((projectTodo) => {
    const todo = createTodo(projectTodo);
    wrapper.appendChild(todo);
  });
  updateMain(wrapper);
  listenForTodos();
};

export { displayProjectTodos };
