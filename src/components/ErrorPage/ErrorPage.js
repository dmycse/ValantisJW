import './ErrorPage.css';


class ErrorPage {

  static createErrorPageHTML() {
    let errorPageHTML = `
      <div class="error__container">
        <p class="error__message">
          Произошла ошибка!
        </p>
        <p class="error__message">
          Перезагрузите страницу или... зайдите позже
        </p>
      </div>
      `;

      document.body.innerHTML = errorPageHTML;
  }

  render() {
    ErrorPage.createErrorPageHTML();
  }
}

export default new ErrorPage();