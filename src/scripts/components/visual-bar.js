class VisualBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div id="visualBar" class="visual-bar">
        <h3>Visualisasi Data Global</h3>
        <canvas id="canvas"></canvas>
      </div>`;
  }
}

customElements.define('visual-bar', VisualBar);