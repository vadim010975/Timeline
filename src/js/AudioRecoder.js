export default class AudioRecoder {
  constructor(callback) {
    this.callback = callback;
    this.btnStartEl = document.querySelector(".record-controls__btn-start");
    this.btnStoptEl = document.querySelector(".record-controls__btn-stop");
    this.timerEl = document.querySelector(".timer");
    this.stream = {
      audio: true,
    };
    this.updateTime = this.updateTime.bind(this);
    this.seconds = 0;
    this.minutes = 0;
  }

  init() {
    this.onClickBtnStart = this.onClickBtnStart.bind(this);
    this.btnStartEl.addEventListener("click", this.onClickBtnStart);
  }

  /* eslint-disable-next-line */
  async onClickBtnStart() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(this.stream);
      this.startTimer();
      if (this.stream.video) {
        this.onlinePlay(stream);
      }
      const recoder = new MediaRecorder(stream);
      const chunks = [];
      recoder.addEventListener("start", () => {
        console.log("start");
      });
      recoder.addEventListener("dataavailable", (e) => {
        chunks.push(e.data);
      });
      recoder.addEventListener("stop", () => {
        const blob = new Blob(chunks);
        this.callback(blob);
      });
      recoder.start();
      this.btnStoptEl.addEventListener("click", () => {
        recoder.stop();
        stream.getTracks().forEach((track) => track.stop());
        this.btnStartEl.removeEventListener("click", this.onClickBtnStart);
        this.stopTimer();
        if (this.stream.video) {
          this.hideModalVideoEl();
        }
      });
    } catch (e) {
      console.log(e);
      this.callback(null);
    }
  }

  startTimer() {
    this.interval = setInterval(this.updateTime, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.timerEl.textContent = "00:00";
  }

  updateTime() {
    this.seconds += 1;
    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
    }
    this.timerEl.textContent = `${this.minutes
      .toString()
      .padStart(2, "0")}:${this.seconds.toString().padStart(2, "0")}`;
  }
}
