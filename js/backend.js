'use strict';

(function () {
  window.backend = {
    // функция для отправки данных формы на сервер
    upload: function (data, onLoad, onError) {
      window.utils.processData('POST', window.Constants.URL, onError, onLoad, data);
    },

    // функция для получения данных с сервера
    load: function (onLoad, onError) {
      window.utils.processData('GET', window.Constants.URL + '/data', onError, onLoad);
    }
  };
})();
