import catalogPage from '../Catalog/Catalog';
import './App.css';

class App {
  async render() {
    await catalogPage.render();
  }
}

export default new App();