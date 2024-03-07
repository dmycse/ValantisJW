import { SPINNER } from '../../constants/htmlNodeElements';
import SpinnerImg from '../../../public/icons/spinner.svg';
import './Spinner.css';


class Spinner {

  static createSpinnerHTML() {
    let spinnerHTML = `
      <div class="spinner__container">
        <img class="spinner__img" src="${SpinnerImg}">
        <p class="spinner__message">Идёт поиск и загрузка данных..... Подождите</p>
      </div>
      `;

    SPINNER.innerHTML = spinnerHTML;
  }

  removeSpinner() {
    SPINNER.innerHTML = '';
  }

  render() {
    Spinner.createSpinnerHTML();
  }
  
}

export default new Spinner();