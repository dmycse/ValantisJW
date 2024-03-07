import { CATALOG, PAGES, FILTER }  from '../../constants/htmlNodeElements';
import BRANDS from '../../constants/brands';
import spinnerPage from '../Spinner/Spinner';
import catalogPage from '../Catalog/Catalog';
import noDataPage from '../NoDataPage/NoDataPage';

import getApiData from '../../utils/getApiData';
import cacheData from '../../utils/cache';
import { getIdDublicates } from '../../utils/dublicatesUtil';

import './Filter.css';


class Filter {
  static form = '';
  static inputElems = [];
  static inputValues = [];
  static formBtns = [];

  static createFilterHTML() {
    let filterHTML = `
      <form class="form" name="filter">
        <button type="button" class="form__btn" name="moveBtn" disabled>На Главную</button>
        <div class="form__elem">
          <label for="product">Название</label>
          <input 
            type="text" 
            class="form__input"
            name="product" 
            id="product"
            placeholder="Не менее 5 букв" 
          >
          <button type="button" name="removeValueBtn" class="form__remove-btn">X</button>
        </div>
        <div class="form__elem">
          <label for="price">Цена</label>
          <input 
            type="text"
            class="form__input" 
            name="price" 
            id="price"
            placeholder="Не менее 4 цифр" 
          >
          <button type="button" name="removeValueBtn" class="form__remove-btn">X</button>
        </div>
        <div class="form__elem">
          <select name="brand" class="form__select">
            <option value="noselect" selected>Бренд</option>
            ${BRANDS.map(item => `<option value"${item}">${item}</option>`)}
          </select>
        </div>
        <button type="submit" class="form__btn" name="submitFormBtn" disabled>Показать</button>
        <button type="button" class="form__btn" name="clearFormBtn" disabled>Очистить</button>
      </form>
    `;

    FILTER.innerHTML = filterHTML;
    this.form = document.forms.filter;
    this.inputElems = this.form && Array.from(this.form.elements).filter(elem => elem.type === 'text');
    this.formBtns = this.form && [this.form.submitFormBtn, this.form.moveBtn, this.form.clearFormBtn];
  }

  static initInputEven() {
    this.form && this.inputElems
      .forEach(item => item.addEventListener('input', (e) => {
        console.log(item.value)
        if (item.value.length > 3) {
          item.classList.remove('incorrect');
          this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
        } else if (this.form.brand.value !== 'noselect') {
            this.formBtns.forEach(btn => btn.removeAttribute('disabled'));  
        } else if (this.inputElems.some(elem => elem.value.length > 3)) {
            this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
        } else {
            this.formBtns.forEach(btn => btn.setAttribute('disabled', true));
        }
    }));
  }

  static initSelectEvent() {
    this.form && this.form.brand.addEventListener('change', () => {
      if (this.form.brand.value !== 'noselect') {
        this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
      } else if (this.inputElems.some(elem => elem.value.length > 3)) {
          this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
      } else {
          this.formBtns.forEach(btn => btn.setAttribute('disabled', true));
      }
    });
  }

  static initSubmitFormEvent() {
    this.form && this.form.addEventListener('submit', (e) => {
      e.preventDefault();
     
      let [productValue, priceValue, brandValue] = [this.form.product.value, this.form.price.value, this.form.brand.value];
      
      let isFieldValid = true;
      if (productValue && !(/[а-яёА-ЯЁ]{5,}/g).test(productValue)) {
        Filter.showFieldError(this.form.product);
        isFieldValid = false;
      }
      if (priceValue && !/^[1-9]+[0-9]{4,}$/.test(priceValue)) {
        Filter.showFieldError(this.form.price);
        isFieldValid = false;
      }
      if (!isFieldValid) return;
     
      let validFields = [];
      this.inputElems
        .forEach(item => {
          if (item.value) {
            validFields.push({name: item.name, value: item.value})
          }
        });
      if (brandValue !== 'noselect') validFields.push({name: this.form.brand.name, value: brandValue});
  
      if (validFields.length > 0) {
        this.getFilteredData(validFields);
        this.clearForm();
        spinnerPage.render();
        CATALOG.innerHTML = '';
        PAGES.innerHTML = '';
      } else {
          noDataPage.render();
      }
    });
  }

  static showFieldError(inputField) {
    inputField.classList.add('incorrect');
    this.form.submitFormBtn.setAttribute('disabled', true);
  }

  static initRemoveValueBtnEvent() {
    this.form && Array.from(this.form.removeValueBtn).forEach(itemBtn => {
      itemBtn.addEventListener('click', () => {
        itemBtn.previousElementSibling.value = '';
        itemBtn.previousElementSibling.classList.remove('incorrect');
        this.formBtns.forEach(btn => btn.setAttribute('disabled', true));

        if (this.inputElems.some(elem => elem.value.length > 3)) {
          this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
        }

        if (this.form.brand.value !== 'noselect') {
          this.formBtns.forEach(btn => btn.removeAttribute('disabled'));
        }
      });
    });
  }

  static clearForm() {
    this.inputElems.forEach(item => {
      item.classList.remove('incorrect');
      item.value = '';
    });
    this.form.brand.value = 'noselect';
    this.formBtns.forEach(btn => btn.setAttribute('disabled', true));
    cacheData.cleanCache();
  }

  static initClearFormBtn() {
    this.form && this.form.clearFormBtn.addEventListener('click', () => {
      this.clearForm();
    });
  }

  static initMoveToMainPageEvent() {
    this.form && this.form.moveBtn.addEventListener('click', () => {
      this.inputElems.forEach(item => item.value = '');
      this.form.brand.value = 'noselect';
      this.form.submitFormBtn.setAttribute('disabled', true);
      cacheData.cleanCache();
      catalogPage.render();
    });
  }

  static async getFilteredData(valueArr) {
    let noDataDiv = FILTER.querySelector('.nodata__container');
    noDataDiv && noDataPage.removeNoDataHTML();

    let fetchParams = [];
    valueArr.forEach(elem => {
      if (elem.value) {
        let filterParams = {
          action: 'filter',
          params: {
            [elem.name]: elem.name === 'price' ? +elem.value : elem.value
          }
        }
        fetchParams.push(filterParams);
      }});
     
      let ids = fetchParams.length > 0 && await Promise.all(fetchParams.map(item => getApiData.getData(item))).then(responses => responses);
      let idsFlat = ids.flat();
      let dublicatedIds = ids.length > 1 ? getIdDublicates(idsFlat, ids.length) : idsFlat;
      
      let apiArr = [];
      if (dublicatedIds.length > 0) {
        apiArr = await getApiData.getProducts({}, dublicatedIds);
      } else {
          this.form.moveBtn.removeAttribute('disabled');
          noDataPage.render();
          spinnerPage.removeSpinner();
          return;
      }
     
      // upload fetched data to cache
      if (apiArr && apiArr.length > 0) {
        let array_size = 50;
        let resultArr = [];
      
        for (let i = 0; i < apiArr.length; i += array_size) {
            resultArr.push(apiArr.slice(i, i + array_size));
        }
       
        cacheData.cleanCache();
        resultArr.forEach((item, index) => cacheData.setItem(index, item));
      }
      let endFilterPageNum = cacheData.getCacheSize() - 1;
      catalogPage.render(0, endFilterPageNum);
      this.form.moveBtn.removeAttribute('disabled');
  }

  render() {
    Filter.createFilterHTML();
    Filter.initSubmitFormEvent();
    Filter.initInputEven();
    Filter.initSelectEvent();
    Filter.initRemoveValueBtnEvent();
    Filter.initClearFormBtn();
    Filter.initMoveToMainPageEvent();
  }
}

export default new Filter();