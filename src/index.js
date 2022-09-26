import './styles/main.css';
import './styles/nav.css';
import sadBluey from './assets/sad-bluey.png';

const setEmptyTodoBackground = () => {
  const main = document.querySelector('main');
  const emptyTodoBgImg = document.createElement('img');
  emptyTodoBgImg.classList.add('bg-img');
  emptyTodoBgImg.src = sadBluey;
  const emptyTodoText = document.createElement('p');
  emptyTodoText.innerText = 'Nothing yet...';
  main.innerText = '';
  main.appendChild(emptyTodoText);
  main.appendChild(emptyTodoBgImg);
};

setEmptyTodoBackground();
