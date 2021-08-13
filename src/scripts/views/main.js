import '../components/cases-bar.js';
import '../components/result-bar.js';
import DataSource from '../data/data-source.js';

const main = () => {
  const searchElement = document.querySelector(`search-bar`);
  const resultBar = document.querySelector('result-bar');

  const onButtonSearchClicked = async () => {
    try {
      if (searchElement.value) {
        document.querySelector('info-bar').setAttribute('class', 'display');
        document.querySelector('cases-bar').setAttribute('class', 'display');
        document.querySelector('result-bar').removeAttribute('class', 'display');
        document.querySelector('visual-bar').removeAttribute('class', 'display');
        
        const result = await DataSource.searchCountry(searchElement.value);
        renderResult(result);
      } else {
        document.querySelector('info-bar').removeAttribute('class', 'display');
        document.querySelector('cases-bar').removeAttribute('class', 'display');
        document.querySelector('visual-bar').removeAttribute('class', 'display');
        document.querySelector('result-bar').setAttribute('class', 'display');
      }
    } catch(message) {
      document.querySelector('visual-bar').setAttribute('class', 'display');
      fallbackResult(message);
    }
  }
  
  const renderResult = result => {
    resultBar.country = result;
  }

  const fallbackResult = message => {
    resultBar.renderError(message);
  }

  searchElement.clickEvent = onButtonSearchClicked;

  DataSource.getData();
  DataSource.getVisualReport();
}

export default main;