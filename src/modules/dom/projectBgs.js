import pattern1 from '../../assets/pattern-images/pattern-1.png';
import pattern2 from '../../assets/pattern-images/pattern-2.png';
import pattern3 from '../../assets/pattern-images/pattern-3.png';
import pattern4 from '../../assets/pattern-images/pattern-4.png';
import pattern5 from '../../assets/pattern-images/pattern-5.png';
import pattern6 from '../../assets/pattern-images/pattern-6.png';

const loadProjectBgsOptions = () => {
  const projectBgs = document.querySelector('.project-bgs');
  projectBgs.innerHTML = `<span>Background</span>
    <div class="project-bg-input">
      <label>
        <input type="radio" name="project-bg" value="pattern-1.png">
        <img src=${pattern1} alt="colorless objects; theme: planets and instruments" class="project-bg-img">
      </label>
      <label>
        <input type="radio" name="project-bg" value="pattern-2.png">
        <img src=${pattern2} alt="colorless objects; theme: planets and instruments" class="project-bg-img" />
      </label>
      <label>
        <input type="radio" name="project-bg" value="pattern-3.png">
        <img src=${pattern3} alt="colorless objects; theme: beach" class="project-bg-img" />
      </label>
      <label>
        <input type="radio" name="project-bg" value="pattern-4.png">
        <img src=${pattern4} alt="colorless objects; theme: kitchen" class="project-bg-img" />
      </label>
      <label>
        <input type="radio" name="project-bg" value="pattern-5.png">
        <img src=${pattern5} alt="colorless objects; theme: stationery" class="project-bg-img" />
      </label>
      <label>
        <input type="radio" name="project-bg" value="pattern-6.png">
        <img src=${pattern6} alt="colorless objects; theme: plant pots" class="project-bg-img" />
      </label>
    </div>
    `;
};

export default loadProjectBgsOptions;
