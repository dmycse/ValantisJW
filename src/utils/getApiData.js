import { API_URL2 } from "../constants/api";
import { authString } from "./authString";
import { removeItemDublicates } from "./dublicatesUtil";
import errorPage from "../components/ErrorPage/ErrorPage";


class GetApiData {
  connectionAttemps = 5;
  connectionDelay = 3000;
  
  async getData(params, connectionCount = this.connectionAttemps) {
    let requestItems = params.action === 'get_items';
    try {
      let response = await fetch(API_URL2, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-Auth': authString
        },
        body: JSON.stringify(params)
      });
      
      if (response.status === 400) {
        connectionCount = 0;
        throw new Error(`Getting data has failed. Response Status: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(`Getting data has failed. Response Status: ${response.status}`);
      }

      let {result} = await response.json();
      let resultNoDublicates = [];
      
      if (result && requestItems) {
        resultNoDublicates = removeItemDublicates(result)
      } else {
        resultNoDublicates = [...new Set(result)];
      }
      
      return resultNoDublicates;

    } catch(error) {
        if (connectionCount === 0) {
          errorPage.render();
          console.error(error.message);
          return false;
        }
        
        console.warn('Retrying to get data...');
        
        await this.timeoutDelay(this.connectionDelay);
        return await this.getData(params, connectionCount - 1);
    }
  }

  async getProducts(params, idsFromFilter = []) {
    let ids = idsFromFilter.length > 0 
       ? idsFromFilter
       : await this.getData(params)
  
    if (ids) {
      let getItemsParams = {
        action: "get_items", 
        params: {ids}
      };

      let productsList = await this.getData(getItemsParams);
      return productsList;
      
    } else {
        errorPage.render();
    }
  }

  timeoutDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

export default new GetApiData();