import { loadCreateOptions, loadProjects, loadWeek } from './dom';

const switchTab = (e) => {
  const currentTab = e.target.classList[1];
  switch (currentTab) {
    case 'all':
      break;
    case 'today':
      break;
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
