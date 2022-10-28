import { isThisWeek, parseISO } from 'date-fns';
import { retrieveStoredData } from './localStorage';

// removes the default project(project having title="All")
const getUserCreatedProjects = () => {
  const storedData = retrieveStoredData();
  // using slice as it will always be the first project in the array!
  return storedData.slice(1);
};

const getWeekProjects = () => {
  const storedProjects = retrieveStoredData();
  return storedProjects
    .map((storedProject) => {
      return storedProject.todos.map((todo) => todo);
    })
    .flat()
    .filter((todo) => isThisWeek(parseISO(todo.dueDate)));
};

export { getUserCreatedProjects, getWeekProjects };
