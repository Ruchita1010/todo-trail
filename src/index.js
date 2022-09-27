import './styles/main.css';
import './styles/nav.css';
import emptyTodoBgImg from './assets/emptytodo-bg-img.png';

const setEmptyTodoBackground = () => {
  const main = document.querySelector('main');
  const emptyTodoBgImgElem = document.createElement('img');
  emptyTodoBgImgElem.classList.add('bg-img');
  emptyTodoBgImgElem.src = emptyTodoBgImg;
  const emptyTodoTextElem = document.createElement('p');
  emptyTodoTextElem.innerText = 'Nothing yet...';
  main.innerText = '';
  main.appendChild(emptyTodoTextElem);
  main.appendChild(emptyTodoBgImgElem);
};

setEmptyTodoBackground();
