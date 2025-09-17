export default class Overlay {
  constructor(selector) {
    this.overlays = document.querySelectorAll(selector);
  }

  // Abre o overlay
  open(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.add("overlay--active");
    }
  }

  // Fecha o overlay
  close(index = 0) {
    if (this.overlays[index]) {
      this.overlays[index].classList.remove("overlay--active");
    }
  }
}
