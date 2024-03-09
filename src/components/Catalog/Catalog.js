import { CATALOG, FILTER, PAGES} from '../../constants/htmlNodeElements';
import { END_PAGE } from "../../constants/catalogNumPages";
import getApiData from '../../utils/getApiData';
import cacheData from '../../utils/cache';
import filterPage from '../Filter/Filter';
import spinnerPage from '../Spinner/Spinner';
import movePage from '../MovePage/MovePage';
import './Catalog.css';


class Catalog {
  products = [];
  brands = [];
  currentPage = 0;
  productsPerPage = 50;
  
  static createCatalogHTML(productsList) {
    CATALOG.scrollTo(0,0);

    let catalogHTML = '';
   
    productsList.forEach(({id, product, brand, price}) => {
      catalogHTML += `
        <li class="product__item">
          <span class="product__id">id: ${id}</span>
          <span class="product__title">${product}</span>
          <span class=${brand ? "product__brand" : ''}>${brand ? brand : ''}</span>
          <span class="product__price">${price.toLocaleString()} ₽</span>
        </li>
        `;
    });

    let catalogContainer = `<ul class="catalog__container">${catalogHTML}</ul>`;

    CATALOG.innerHTML = catalogContainer;
  }

  removeContentHTML() {
    CATALOG.innerHTML = '';
    FILTER.innerHTML = '';
    PAGES.innerHTML = '';
  }

  async render(pageNum = this.currentPage, endPageNum = END_PAGE - 1) {
    spinnerPage.render();
    this.removeContentHTML();
    
    this.currentPage = pageNum;

    let params = {
      action: "get_ids", 
      params: { 
        offset: this.currentPage * this.productsPerPage, 
        limit: this.productsPerPage
      }
    };
    
    let data = cacheData.getItem(this.currentPage) 
      ? cacheData.getItem(this.currentPage)
      : await getApiData.getProducts(params);

    let brandList = cacheData.brands.length > 0
      ? cacheData.brands
      : await getApiData.getBrands();

    if (data) {
      spinnerPage.removeSpinner();
      
      this.products = data;
      cacheData.setItem(this.currentPage, this.products);

      this.brands = brandList;
      cacheData.brands = this.brands;
     
      (endPageNum === END_PAGE - 1) && cacheData.preloadItem(this.currentPage, this.productsPerPage, endPageNum);
      
      Catalog.createCatalogHTML(this.products);
      filterPage.render();
      movePage.render(this.currentPage, endPageNum);
    }
  }
}

export default new Catalog();