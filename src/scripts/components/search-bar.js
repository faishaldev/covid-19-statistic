class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector('#searchElement').value;
  }

  render() {
    
    this.shadowDOM.innerHTML = `
      <style>
        * {
          padding: 0;
          margin: 0 auto;
          box-sizing: border-box;
          font-family: Newsreader;
        }

        .search-container {
          margin-top: 32px;
          max-width: 650px;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          padding: 16px;
          border-radius: 16px;
          display: flex;
          position: sticky;
        }
        
        .search-container > input {
          width: 75%;
          padding: 16px;
          border: 0;
          border-bottom: 1px solid;
          font-weight: bold;
          background-color: #f3f7f9;
        }
        
        .search-container > input:focus {
          outline: 0;
          border-bottom: 2px solid;
        }
        
        .search-container > input:focus::placeholder {
          font-weight: bold;
        }

        .search-container >  input::placeholder {
          font-weight: normal;
        }
        
        .search-column:hover::-webkit-search-cancel-button{
          cursor: pointer;
        }
        
        .search-container > button {
          width: 23%;
          cursor: pointer;
          margin-left: auto;
          padding: 16px;
          background-color: rgb(236, 49, 75);
          color: white;
          font-size: large;
          font-weight: bold;
          border: 0;
          text-transform: uppercase;
          box-shadow: 0 3px #8b0000;
          border-radius: 12px;
          letter-spacing: 2px;
        }
        
        .search-container > button:hover {
          opacity: .8;
        }
        
        .search-container > button:active {
          position: relative;
          top: 3px;
          box-shadow: none;
        }

        @media screen and (max-width: 680px) {
          .search-container {
            flex-direction: column;
            position: static;
            width: 75%;
          }
        
          .search-container > input {
            width: 100%;
            margin-bottom: 12px;
          }
        
          .search-container > button {
            width: 100%;
          }
        }
      </style>
      
      <div id="searchContainer" class="search-container">
        <input type="search" placeholder="Cari berdasarkan nama negara..." id="searchElement" class="search-column">
        <button id="searchButtonElement" type="submit">Cari</button>
      </div>`;

      this.shadowDOM.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent);
  }
}

customElements.define('search-bar', SearchBar);