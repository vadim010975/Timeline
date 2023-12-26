export default class Post {
  constructor() {
    this.itemEl = document.createElement("li");
    this.itemEl.classList.add("list-item");
    this.itemEl.innerHTML = `
      <div class="item-container">
        <h4 class="item-header"></h4>
        <div class="item-content">
        </div>
        <div class="item-geolocation"></div>
      </div>`;
    this.headerEl = this.itemEl.querySelector(".item-header");
    this.contentEl = this.itemEl.querySelector(".item-content");
    this.geolocationEl = this.itemEl.querySelector(".item-geolocation");
    this.setDate();
  }

  setHeader(headerContent) {
    this.headerEl.textContent = headerContent;
  }

  setGeolocation(coord) {
    this.geolocationEl.textContent = `[${coord.latitude}, ${coord.longitude}]`;
  }

  setContentEl(contentEl) {
    this.contentEl.appendChild(contentEl);
  }

  setDate() {
    this.dateСreation = Date.now();
    const date =
      new Date(this.dateСreation).toLocaleDateString() +
      " " +
      new Date(this.dateСreation).toLocaleTimeString().slice(0, -3);
    this.headerEl.textContent = date;
  }

  get() {
    return this.itemEl;
  }
}
