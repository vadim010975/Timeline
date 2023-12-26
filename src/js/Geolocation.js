import Modal from "./Modal";

export default class Geolocation {
  /* eslint-disable-next-line */
  static modal = new Modal();

  static getCoord() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        // Запрос на получение геолокации
        navigator.geolocation.getCurrentPosition(
          (data) => {
            const { latitude, longitude } = data.coords;
            resolve({
              latitude,
              longitude,
            });
          },
          // Обработка ошибок при получении геолокации
          (err) => {
            if (err.code === 1) {
              Geolocation.setCoord((value) => resolve(value));
            } else {
              reject("Ошибка при получении геолокации");
            }
          }
        );
      } else {
        reject("Геолокация не поддерживается в этом браузере");
      }
    });
  }

  static setCoord(callback) {
    Geolocation.modal.init(callback);
  }
}
