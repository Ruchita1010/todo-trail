import { isThisWeek, isToday, parseISO } from 'date-fns';
import { retrieveStoredData } from './firebase/firebaseDataActions';

// removes the default project(project having title="All")
const getUserCreatedProjects = async () => {
  const storedData = await retrieveStoredData();
  const userCreatedProjects = storedData.filter(
    (project) => project.projectTitle !== 'all'
  );
  return userCreatedProjects;
};

// default project: all
const getDefaultProjectTodos = async () => {
  const storedProjects = await retrieveStoredData();
  return storedProjects
    .filter((storedProject) => storedProject.projectTitle === 'all')
    .map((storedProject) => {
      return storedProject.todos.map((todo) => todo);
    })
    .flat();
};

const getTodayTodos = async () => {
  const storedProjects = await retrieveStoredData();
  return storedProjects
    .map((storedProject) => {
      return storedProject.todos.map((todo) => todo);
    })
    .flat()
    .filter((todo) => isToday(parseISO(todo.dueDate)));
};

const getWeekTodos = async () => {
  const storedProjects = await retrieveStoredData();
  return storedProjects
    .map((storedProject) => {
      return storedProject.todos.map((todo) => todo);
    })
    .flat()
    .filter((todo) => isThisWeek(parseISO(todo.dueDate)));
};

const getProjectOptions = async () => {
  const storedProjects = await retrieveStoredData();
  return storedProjects.map((storedProject) => storedProject.projectTitle);
};

const getProjectTodos = async (projectTitle) => {
  const storedProjects = await getUserCreatedProjects();
  // finds the project object and returns it's todos array
  return storedProjects.find(
    (storedProject) => storedProject.projectTitle === projectTitle
  ).todos;
};

const getProjectId = async (projectTitle) => {
  const projects = await retrieveStoredData();
  for (const project of projects) {
    if (project.projectTitle === projectTitle) {
      return project.id;
    }
  }
};

export {
  getDefaultProjectTodos,
  getUserCreatedProjects,
  getProjectId,
  getProjectOptions,
  getProjectTodos,
  getTodayTodos,
  getWeekTodos,
};
