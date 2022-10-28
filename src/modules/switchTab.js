import {
  loadCreateOptions,
  loadProjects,
  loadWeek,
  loadToday,
  loadDefaultProjectTodos,
} from './dom';

const switchTab = (e) => {
  const currentTab = e.target.classList[1];
  switch (currentTab) {
    case 'all': {
      loadDefaultProjectTodos();
      break;
    }
    case 'today': {
      loadToday();
      break;
    }
    case 'create': {
      loadCreateOptions();
      break;
    }
    case 'week': {
      loadWeek();
      break;
    }
    case 'projects': {
      loadProjects();
      break;
    }
  }
};

export default switchTab;
