import { PAGES } from "../../constants/htmlNodeElements";
import { START_PAGE, END_PAGE } from "../../constants/catalogNumPages";
import catalogPage from "../Catalog/Catalog";
import './MovePage.css';


class MovePage {
  static startPage = START_PAGE;
  static endPage = END_PAGE - 1;

  static createArrowBtnsHTML(currentPage) {
    let pageList = `
      <div class="page__arrows">
        <button class="page__arrow left" ${currentPage === this.startPage ? 'disabled' : ''}>&#9001; Назад</button>
        <button class="page__arrow right" ${currentPage === this.endPage ? 'disabled' : ''}>Вперед &#9002;</button>
      </div>`;

    PAGES.innerHTML = pageList;
  }

  static initArrowBtnEvent(currentPage) {
    let arrowBtns = PAGES.querySelectorAll('.page__arrow');
    
    arrowBtns.forEach(btn => btn.addEventListener('click', () => {
      let pageNum = 0;
      if (btn.classList.contains('left')) {
        pageNum = currentPage === this.startPage ? this.startPage : currentPage - 1;
      } else {
        pageNum = currentPage === this.endPage ? this.endPage : currentPage + 1;
      }

      catalogPage.render(pageNum, this.endPage);
    }));
  }

  render(currentPage, endPageNum) {
    MovePage.endPage = endPageNum ?? MovePage.endPage;
    MovePage.createArrowBtnsHTML(currentPage);
    MovePage.initArrowBtnEvent(currentPage);
  }

}

export default new MovePage();