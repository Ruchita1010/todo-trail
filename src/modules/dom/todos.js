import { loadProjects } from './loaders';
import {
  saveTodoToLocalStorage,
  deleteTodoFromLocalStorage,
  updateCheckedAttrInLocalStorage,
  updateCountInLocalStorage,
} from '../localStorage';
import { appendToWrapper, checkTodo, getActiveWrapperClass } from './utils';

const createTodo = (title, description, date, priority, checkedattr = '') => {
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');
  newTodo.innerHTML = `
  <div class="todo-header">
    <input type="checkbox" name="todo-checkbox" id="todo-checkbox" ${checkedattr}/>
    <span class="due-date-label">${date}</span>
    <span class="priority-label">${priority}</span>
    <button class="delete-todo-btn">
      <span class="material-symbols-outlined icon"> delete </span>
    </button>
  </div>
  <div class="todo-content">
      <p class="todo-title">${title}</p>
      <p class="todo-description">${description}</p>
  </div>
  `;
  return newTodo;
};

const updateCountInDOM = () => {
  // Only if the projects tab is active
  const activeWrapper = getActiveWrapperClass();
  if (activeWrapper === 'projects-wrapper') {
    loadProjects();
  }
};

const deleteTodo = (e) => {
  const wrapper = document.querySelector('.todos-wrapper');
  const todo = e.target.parentNode.parentNode;
  const todoTitle =
    e.target.parentNode.nextElementSibling.children[0].innerText;
  wrapper.removeChild(todo);
  deleteTodoFromLocalStorage(todoTitle);
  const projectTitle = e.currentTarget.classList[0].replace(/-wrapper/, '');
  const priority = e.target.previousElementSibling.innerText;
  if (projectTitle !== 'all' && priority === 'High') {
    updateCountInLocalStorage(projectTitle, 'decrement');
    updateCountInDOM();
  }
};

const markTodoCompleted = (e) => {
  const checkbox = e.target.children[0].querySelector('input');
  const todoTitle = e.target.children[1].firstElementChild.innerText;
  if (checkbox.checked) {
    checkbox.checked = false;
    updateCheckedAttrInLocalStorage(todoTitle, '');
    return;
  }
  checkbox.checked = true;
  updateCheckedAttrInLocalStorage(todoTitle, 'checked');
};

const checkClickedTarget = (e) => {
  if (e.target.classList.contains('delete-todo-btn')) {
    deleteTodo(e);
  }
  if (e.target.classList.contains('todo')) {
    markTodoCompleted(e);
  }
};

const listenForTodos = () => {
  const wrapper = document.querySelector('.todos-wrapper');
  wrapper.addEventListener('click', checkClickedTarget);
};

// Adding elements ---
const addTodo = (userInputs) => {
  const [title, description, dueDate, projectTitle, priority] = userInputs;
  saveTodoToLocalStorage(title, description, dueDate, projectTitle, priority);
  // Adding to DOM if the tab is active
  const wrapperClass = getActiveWrapperClass();
  const todoContainsActive = checkTodo(projectTitle, dueDate, wrapperClass);
  /* instead of calling the required load functions again (resulting in reloading of the 
  localStorage data), we can check the active tab(wrapper) and add the new element 
  directly to the DOM after saving it to localStorage */
  if (todoContainsActive) {
    const newTodo = createTodo(title, description, dueDate, priority);
    appendToWrapper(wrapperClass, newTodo);
    listenForTodos();
  }
  if (projectTitle !== 'all' && priority === 'High') {
    updateCountInLocalStorage(projectTitle, 'increment');
    updateCountInDOM();
  }
};

export { addTodo, createTodo, listenForTodos };
