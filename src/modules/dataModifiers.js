import { retrieveStoredData } from './localStorage';

// removes the default project(project having title="All")
const getUserCreatedProjects = () => {
  const storedData = retrieveStoredData();
  // using slice as it will always be the first project in the array!
  return storedData.slice(1);
};

export { getUserCreatedProjects };
