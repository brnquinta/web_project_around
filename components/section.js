class Section {
  constructor({ items, renderer }, containerSection) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSection);
  }

  // Método para definir o renderer após a criação
  setRenderer(renderer) {
    this._renderer = renderer;
  }

  renderItems(items = this._items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
