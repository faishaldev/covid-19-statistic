const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'Novermber', 'Desember'];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class ResultBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  set country(country) {
    this._country = country;
    this.render();
  }

  render() {
    const countryName = (document.querySelector('search-bar')).value;
    const lastDate = new Date(this._country.lastUpdate);
    const lastDateValue = `${lastDate.getDate()} ${(monthNames[lastDate.getMonth()])} ${lastDate.getFullYear()} ${lastDate.getHours()}:${lastDate.getMinutes()}:${lastDate.getSeconds()} WIB`;

    this.shadowDOM.innerHTML = `
    <style>
        * {
          padding: 0;
          margin: 0 auto;
          box-sizing: border-box;
          font-family: Newsreader; 
        }

        .info-bar h3 {
          margin: 32px 0 auto;
          text-align: center;
          font-size: 24px;
          color: grey;
        }
        
        .info-bar p {
          margin: auto;
          text-align: center;
          padding: 12px;
          color: #b3aeb5;
          font-weight: bold;
        }
        
        .divider-line {
          margin-right: auto;
          margin-left: auto;
          margin-bottom: 20px;
          width: 100%;
          max-width: 680px;
          height: 1.5px;
          background-color: grey;
        }

        .flex-container {
          display: flex;
          max-width: 680px;
        }

        .case-bar {
          margin-top: 12px;
          width: 200px;
          height: 100px;
          border-style: none solid;
          text-align: center;
          border-radius: 15px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
          text-transform: uppercase;
        }
        
        .case-bar h4 {
          padding: 5px;
          color: white;
          border-radius: 10px;
          letter-spacing: 2px;
        }
        
        .case-bar h5 {
          margin-top: 24px;
          font-size: 24px;
        }
        
        .case-bar p {
          margin-top: 10px;
        }
        
        .case-bar:nth-child(1) p {
          color: #ff9800;
          font-weight: 900;
        }
        
        .case-bar:nth-child(2) p {
          color: rgb(5, 181, 132);
          font-weight: 900;
          letter-spacing: 1px;
        }
        
        .case-bar:nth-child(3) p {
          color: rgb(236, 49, 75);
          font-weight: 900;
          letter-spacing: 1px;
        }
        
        .case-bar:nth-child(1) {
          border-left-color: #ff9800;
          border-right-color: #ff9800;
        }
        
        .case-bar:nth-child(1) h4 {
          background-color: #ff9800;
        }
        
        .case-bar:nth-child(2) {
          border-left-color: rgb(5, 181, 132);
          border-right-color: rgb(5, 181, 132);
        }
        
        .case-bar:nth-child(2) h4 {
          background-color: rgb(5, 181, 132);
        }
        
        .case-bar:nth-child(3) {
          border-left-color: rgb(236, 49, 75);
          border-right-color: rgb(236, 49, 75);
        }
        
        .case-bar:nth-child(3) h4 {
          background-color: rgb(236, 49, 75);
        }

        @media screen and (max-width: 680px) {
          .flex-container {
            flex-direction: column;
          }
        
          .case-bar {
            width: 75%;
          }
        
          .case-bar:nth-child(n+2) {
            margin-top: 32px;
          }
        }
      </style>

      <div id="infoBar" class="info-bar">
        <h3>Informasi COVID-19 ${capitalizeFirstLetter(countryName)}</h3>
        <p>Data per ${lastDateValue}</p>
      </div>

      <div class="divider-line"></div>

      <div class="flex-container">
        <div id="confirmedBar" class="case-bar">
          <h4>Positif</h4>
          <h5>${(this._country.confirmed.value).toLocaleString()}</h5>
        </div>
        <div id="recoveredBar" class="case-bar">
          <h4>Sembuh</h4>
          <h5>${(this._country.recovered.value).toLocaleString()}</h5>
        </div>
        <div id="deathsBar" class="case-bar">
          <h4>Meninggal</h4>
          <h5>${(this._country.deaths.value).toLocaleString()}</h5>
        </div>
      </div>`;
  }

  renderError(message) {
    this.shadowDOM.innerHTML = `
      <style>
        .placeholder {
          font-weight: lighter;
          color: rgba(0,0,0,0.5);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          text-align: center;
          margin-top: 32px;
          font-weight: bold;
        }
      </style>`;

      this.shadowDOM.innerHTML += `<h2 class="placeholder">${message}</h2>`;
  }
}

customElements.define('result-bar', ResultBar);