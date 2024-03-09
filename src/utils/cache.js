import getApiData from "./getApiData";

class Cache {
  products = new Map();
  _brands = [];

  async preloadItem(pageNum, productsPerPage, endPageNum) {
    if  (endPageNum && endPageNum === pageNum) return;
  
    let nextPageNum = pageNum + 1;
   
    if (!this.products.has(nextPageNum)) {
      let params = {
        action: "get_ids", 
        params: { 
          offset: nextPageNum * productsPerPage, 
          limit: productsPerPage
        }
      };

      let data = await getApiData.getProducts(params);
      data && data.length > 0 ? this.setItem(nextPageNum, data) : '';

    } else {
        return;
    }
  }

  getItem(pageNum) {
    return this.products.get(pageNum);
  }

  setItem(pageNum, data) {
    if (!this.products.has(pageNum)) {
      this.products.set(pageNum, data)
    }
  }

  cleanCache() {
      this.products.clear();
    }

  getCacheSize() {
    return this.products.size;
  }

  get brands() {
    return this._brands;
  }

  set brands(brandList) {
    this._brands = brandList;
  }

}

export default new Cache();