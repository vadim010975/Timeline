import Post from "./Post";
import Geolocation from "./Geolocation";
import AudioRecoder from "./AudioRecoder";
import VideoRecoder from "./VideoRecoder";

export default class List {
  constructor(container) {
    this.containerEl = container;
    this.createAudioPost = this.createAudioPost.bind(this);
    this.audioRecoder = new AudioRecoder(this.createAudioPost);
    this.createVideoPost = this.createVideoPost.bind(this);
    this.videoRecoder = new VideoRecoder(this.createVideoPost);
  }

  init() {
    this.bindToDOM();
  }

  bindToDOM() {
    this.listItemsEl = this.containerEl.querySelector(".list-items");
    this.formEl = this.containerEl.querySelector(".form");
    this.createTextPost = this.createTextPost.bind(this);
    this.formEl.addEventListener("submit", this.createTextPost);
    this.formInputEl = this.containerEl.querySelector(".form-input");
    this.btnAudioEl = this.containerEl.querySelector(".btn-audio");
    this.onClickBtnAudio = this.onClickBtnAudio.bind(this);
    this.btnAudioEl.addEventListener("click", this.onClickBtnAudio);
    this.btnVideoEl = this.containerEl.querySelector(".btn-video");
    this.onClickBtnVideo = this.onClickBtnVideo.bind(this);
    this.btnVideoEl.addEventListener("click", this.onClickBtnVideo);
    this.inputControlsEl = this.containerEl.querySelector(".input-controls");
    this.recordControlsEl = this.containerEl.querySelector(".record-controls");
    this.modalWarningEl = this.containerEl.querySelector(".modal-warning");
    this.modalWarningTextEl = this.containerEl.querySelector(
      ".modal-warning__text"
    );
    this.modalWarningBtnCloseEl = this.containerEl.querySelector(
      ".modal-warning__btn-close"
    );
    this.hideModalWarning = this.hideModalWarning.bind(this);
    this.modalWarningBtnCloseEl.addEventListener(
      "click",
      this.hideModalWarning
    );
  }

  createTextPost(e) {
    e.preventDefault();
    const contentTextEl = document.createElement("span");
    contentTextEl.classList.add("content-text");
    contentTextEl.textContent = this.formInputEl.value;
    this.formInputEl.value = "";
    this.createPost(contentTextEl);
  }

  addPost(postEl) {
    this.listItemsEl.insertAdjacentElement("afterbegin", postEl);
  }

  renderRecordControlsEl() {
    this.inputControlsEl.classList.add("hidden");
    this.recordControlsEl.classList.remove("hidden");
  }

  hideRecordControlsEl() {
    this.recordControlsEl.classList.add("hidden");
    this.inputControlsEl.classList.remove("hidden");
  }

  onClickBtnAudio() {
    this.renderRecordControlsEl();
    this.audioRecoder.init();
  }

  onClickBtnVideo() {
    this.renderRecordControlsEl();
    this.videoRecoder.init();
  }

  createAudioPost(blob) {
    this.hideRecordControlsEl();
    if (blob === null) {
      this.showModalWarning("audio");
      return;
    }
    const audioPlayerEl = document.createElement("audio");
    audioPlayerEl.classList.add("content-audio");
    audioPlayerEl.controls = true;
    audioPlayerEl.src = URL.createObjectURL(blob);
    this.createPost(audioPlayerEl);
  }

  createVideoPost(blob) {
    this.hideRecordControlsEl();
    if (blob === null) {
      this.showModalWarning("video");
      return;
    }
    const videoPlayerEl = document.createElement("video");
    videoPlayerEl.classList.add("content-video");
    videoPlayerEl.controls = true;
    videoPlayerEl.src = URL.createObjectURL(blob);
    this.createPost(videoPlayerEl);
  }

  createPost(element) {
    const post = new Post();
    post.setContentEl(element);
    const promiseGeolocation = Geolocation.getCoord();
    promiseGeolocation.then((resolve, reject) => {
      if (resolve) {
        post.setGeolocation(resolve);
        this.addPost(post.get());
        return;
      }
      if (reject) {
        console.log(reject);
      }
    });
  }

  showModalWarning(type) {
    this.modalWarningEl.classList.remove("hidden");
    this.modalWarningTextEl.textContent =
      "Пользователь не выдал прав для использования " + type;
    const {
      top: topContainer,
      left: leftContainer,
      height: heightContainer,
      width: widthContainer,
    } = this.containerEl.getBoundingClientRect();
    const { width: widthModal, height: heightModal } =
      this.modalWarningEl.getBoundingClientRect();
    const topModal = topContainer + heightContainer / 2 - heightModal / 2;
    const leftModal = leftContainer + widthContainer / 2 - widthModal / 2;
    this.modalWarningEl.style.cssText = `top: ${topModal}px; left: ${leftModal}px`;
  }

  hideModalWarning() {
    this.modalWarningEl.classList.add("hidden");
    this.modalWarningTextEl.textContent = "";
    this.modalWarningEl.removeAttribute("style");
  }
}
