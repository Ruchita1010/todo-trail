const initLocalStorage = () => {
  // default project: all
  const projects = [{ projectTitle: 'all', todos: [] }];
  localStorage.setItem('projects', JSON.stringify(projects));
};

const saveTodoToLocalStorage = (
  todoTitle,
  description,
  dueDate,
  inputtedProjectTitle,
  priority,
  checkedattr = ''
) => {
  const todo = { todoTitle, description, dueDate, priority, checkedattr };
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    if (storedProject.projectTitle === inputtedProjectTitle) {
      storedProject.todos.push(todo);
    }
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const saveProjectToLocalStorage = (
  projectTitle,
  highPriorityTasksCount,
  selectedProjectBg
) => {
  const project = {
    projectTitle,
    highPriorityTasksCount,
    selectedProjectBg,
    todos: [],
  };
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.push(project);
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const deleteTodoFromLocalStorage = (todoTitle) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    const todos = storedProject.todos;
    todos.forEach((todo) => {
      if (todoTitle === todo.todoTitle) {
        const index = todos.indexOf(todoTitle);
        todos.splice(index);
      }
    });
  });
  localStorage.setItem('projects', JSON.stringify(storedProjects));
};

const deleteProjectFromLocalStorage = (projectTitle) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  const filteredProjects = storedProjects.filter(
    (storedProject) => storedProject.projectTitle !== projectTitle
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

const updateCheckedAttrInLocalStorage = (todoTitle, checkedattr) => {
  const storedProjects = JSON.parse(localStorage.getItem('projects'));
  storedProjects.forEach((storedProject) => {
    const todos = storedProject.todos;
    todos.forEach((todo) => {
      if (todoTitle === todo.todoTitle) {
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

const checkLocalStorage = () => {
  const storedData = JSON.parse(localStorage.getItem('projects'));
  return storedData[0].todos.length === 0 && storedData.length < 2;
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
  checkLocalStorage,
};
