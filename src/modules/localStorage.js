const initLocalStorage = () => {
  // default project: all
  const projects = [{ projectTitle: 'all', todos: [] }];
  localStorage.setItem('projects', JSON.stringify(projects));
};

const saveTodoToLocalStorage = (todo, inputtedProjectTitle) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    if (storedProject.projectTitle === inputtedProjectTitle) {
      storedProject.todos.push(todo);
    }
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const saveProjectToLocalStorage = (projectData) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  const project = { ...projectData, todos: [] };
  storedProjects.push(project);
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const deleteTodoFromLocalStorage = (todoId) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    const todos = storedProject.todos;
    todos.forEach((todo) => {
      if (todoId === todo.todoId) {
        const index = todos.indexOf(todoId);
        todos.splice(index);
      }
    });
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const deleteProjectFromLocalStorage = (projectId) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  const filteredProjects = storedProjects.filter(
    (storedProject) => storedProject.projectId !== projectId
  );
  localStorage.setItem('projects', JSON.stringify(filteredProjects));
};

const updateCountInLocalStorage = (projectTitle, operation) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    if (storedProject.projectTitle === projectTitle) {
      operation === 'increment'
        ? storedProject.highPriorityTasksCount++
        : storedProject.highPriorityTasksCount--;
    }
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const updateCheckedAttrInLocalStorage = (todoId, checkedattr) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    const todos = storedProject.todos;
    todos.forEach((todo) => {
      if (todoId === todo.todoId) {
        todo.checkedattr = checkedattr;
      }
    });
  });
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
  deleteTodoFromLocalStorage,
  deleteProjectFromLocalStorage,
  retrieveStoredData,
  updateCountInLocalStorage,
  updateCheckedAttrInLocalStorage,
};
