class InfoBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="infoBar" class="info-bar">
        <h3>Informasi COVID-19 Global</h3>
      </div>
      <div class="divider-line"></div>`;
  }
}

customElements.define('info-bar', InfoBar);