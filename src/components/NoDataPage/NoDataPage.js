import { FILTER } from "../../constants/htmlNodeElements";
import "./NoDataPage.css";


class NoDataPage {

  removeNoDataHTML() {
    FILTER.lastElementChild.remove();
  }

  static createNoDataHTML() {
    let noDataContainer = document.createElement('div');
    noDataContainer.classList.add('nodata__container');
  
    let noDataHTML = `
        <p class="nodata__message">
          По Вашему запросу данные не найдены!
        </p>
        <p class="nodata__message">
          Измените параметры запроса и повторите поиск.
        </p>
    `;
    
    noDataContainer.innerHTML = noDataHTML;
    FILTER.insertAdjacentElement('beforeend', noDataContainer);
  }

  render() {
    NoDataPage.createNoDataHTML();
  }
}

export default new NoDataPage();