class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
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

        :host {
          display: block;
          width: 100%;
          background-color: rgb(236, 49, 75);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .2);
        }
        
        h2 {
          color: white;
          padding: 12px;
          text-align: center;
          letter-spacing: 5px;
        }
      </style>

      <h2>COVID-19 Statistic</h2>`;
  }
}

customElements.define('app-bar', AppBar);