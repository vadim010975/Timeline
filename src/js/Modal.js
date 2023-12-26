import processInput from "./processInput";

export default class Modal {
  constructor() {
    this.element = document.querySelector(".modal");
    this.formEl = this.element.querySelector(".modal__form_group");
    this.onSubmit = this.onSubmit.bind(this);
    this.formEl.addEventListener("submit", this.onSubmit);
    this.inputEl = this.element.querySelector(".modal__input");
    this.inputEl.addEventListener("input", this.onInputForm);
    this.btnCancel = this.element.querySelector(".btn__cancel");
    this.onClickCancel = this.onClickCancel.bind(this);
    this.btnCancel.addEventListener("click", this.onClickCancel);
  }

  init(callback) {
    this.render();
    this.callback = callback;
  }

  render() {
    this.element.classList.add("active");
  }

  hide() {
    this.inputEl.value = "";
    this.element.classList.remove("active");
  }

  onSubmit(e) {
    e.preventDefault();
    const coords = processInput(this.inputEl.value);
    if (coords.error) {
      this.inputEl.setCustomValidity(coords.error);
      this.formEl.reportValidity();
      return;
    }
    this.callback(coords);
    this.hide();
  }

  onClickCancel() {
    this.callback(null);
    this.hide();
  }

  onInputForm(e) {
    e.currentTarget.setCustomValidity("");
  }
}
