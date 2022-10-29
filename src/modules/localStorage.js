const initLocalStorage = () => {
  // default project: All
  const projects = [{ projectTitle: 'all', todos: [] }];
  localStorage.setItem('projects', JSON.stringify(projects));
};

const saveTodoToLocalStorage = (
  todoTitle,
  description,
  dueDate,
  inputtedProjectTitle,
  priority
) => {
  const todo = { todoTitle, description, dueDate, priority };
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    if (storedProject.projectTitle === inputtedProjectTitle) {
      storedProject.todos.push(todo);
    }
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const saveProjectToLocalStorage = (projectTitle, selectedProjectBg) => {
  const project = {
    projectTitle,
    selectedProjectBg,
    todos: [],
  };
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.push(project);
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const retrieveStoredData = () => {
  const storedData = JSON.parse(localStorage.getItem('projects'));
  return storedData;
};

export {
  initLocalStorage,
  saveTodoToLocalStorage,
  saveProjectToLocalStorage,
  retrieveStoredData,
};
