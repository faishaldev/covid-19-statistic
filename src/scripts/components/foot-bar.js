class FootBar extends HTMLElement {
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
      @import url('https://fonts.googleapis.com/css2?family=Newsreader:wght@200&display=swap');

        * {
          padding: 0;
          margin: 0 auto;
          box-sizing: border-box;
          font-family: Newsreader;
        }
        
        :host h4, :host p {
          color: #b3aeb5;
          text-align: center;
          padding: 5px;
        }
      </style>
      
      <h4>&copy; Musshal 2021</h4>
      <p>Dicoding - Submission Belajar Fundamental Front-End Web Development</p>`;
  }
}

customElements.define('foot-bar', FootBar);