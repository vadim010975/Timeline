import AudioRecoder from "./AudioRecoder";

export default class VideoRecoder extends AudioRecoder {
  constructor(callback) {
    super(callback);
    this.stream = {
      audio: true,
      video: true,
    };
    this.modalVideoEl = document.querySelector(".modal-video");
  }

  init() {
    super.init();
    this.showModalVideoEl();
  }

  showModalVideoEl() {
    this.modalVideoEl.classList.remove("hidden");
  }

  hideModalVideoEl() {
    this.modalVideoEl.classList.add("hidden");
  }

  onlinePlay(stream) {
    this.modalVideoEl.muted = true;
    this.modalVideoEl.srcObject = stream;
    this.modalVideoEl.addEventListener("canplay", this.modalVideoEl.play);
  }
}
