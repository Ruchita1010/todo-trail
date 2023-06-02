import { loadProjects } from './loaders';
import {
  saveTodoToFirebase,
  deleteTodoFromFirebase,
  updateCheckedAttrInFirebase,
  updateCountInFirebase,
} from '../firebase/firebaseDataActions';
import {
  appendToWrapper,
  addAndCheckActiveWrapperClass,
  getActiveWrapperClass,
} from './utils';
import { v4 as uuidv4 } from 'uuid';

const createTodo = ({
  todoId,
  todoTitle,
  projectTitle,
  description,
  dueDate,
  priority,
  checkedAttr,
}) => {
  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');
  newTodo.dataset.todoId = todoId;
  newTodo.dataset.projectTitle = projectTitle;
  newTodo.innerHTML = `
  <div class="todo-header">
    <input type="checkbox" name="todo-checkbox" ${checkedAttr}/>
    <span class="due-date-label">${dueDate}</span>
    <span class="priority-label">${priority}</span>
    <button class="delete-todo-btn">
      <span class="material-symbols-outlined delete-todo-icon icon"> delete </span>
    </button>
  </div>
  <div class="todo-content">
      <p class="todo-title">${todoTitle}</p>
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

const deleteTodo = async (e) => {
  const wrapper = document.querySelector('.todos-wrapper');
  const todo = e.target.parentNode.parentNode;
  const todoId = todo.dataset.todoId;
  const projectTitle = todo.dataset.projectTitle;
  wrapper.removeChild(todo);
  deleteTodoFromFirebase(todoId, projectTitle);
  const priority = e.target.previousElementSibling.innerText;
  if (priority === 'High') {
    await updateCountInFirebase(projectTitle, 'decrement');
    updateCountInDOM();
  }
};

const markTodoCompleted = (e) => {
  const checkbox = e.target.children[0].querySelector('input');
  const todoId = e.target.dataset.todoId;
  const projectTitle = e.target.dataset.projectTitle;
  if (checkbox.checked) {
    checkbox.checked = false;
    updateCheckedAttrInFirebase(todoId, projectTitle, '');
    return;
  }
  checkbox.checked = true;
  updateCheckedAttrInFirebase(todoId, projectTitle, 'checked');
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
const addTodo = async (userInputs) => {
  const [todoTitle, description, dueDate, projectTitle, priority] = userInputs;
  if (!todoTitle) return;
  const todo = {
    todoId: uuidv4(),
    todoTitle,
    projectTitle,
    description,
    dueDate,
    priority,
    checkedAttr: '',
  };
  saveTodoToFirebase(todo);
  // Adding to DOM if the tab is active
  const wrapperClass = getActiveWrapperClass();
  const todoHasActiveWrapperClass = addAndCheckActiveWrapperClass(
    projectTitle,
    dueDate,
    wrapperClass
  );
  /* instead of calling the required load functions again (resulting in reloading of the 
  Firebase data), we can check the active tab(wrapper) and add the new element 
  directly to the DOM after saving it to Firebase */
  if (todoHasActiveWrapperClass) {
    const todoElement = createTodo(todo);
    appendToWrapper(wrapperClass, todoElement);
    listenForTodos();
  }
  if (projectTitle !== 'all' && priority === 'High') {
    await updateCountInFirebase(projectTitle, 'increment');
    updateCountInDOM();
  }
};

export { addTodo, createTodo, listenForTodos };
