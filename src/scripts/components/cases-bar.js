class CasesBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="flex-container">
        <div id="confirmedBar" class="case-bar">
          <h4>Positif</h4>
        </div>
        <div id="recoveredBar" class="case-bar">
          <h4>Sembuh</h4>
        </div>
        <div id="deathsBar" class="case-bar">
          <h4>Meninggal</h4>
        </div>
      </div>`;
  }
}

customElements.define('cases-bar', CasesBar);