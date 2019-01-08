'use strict';

(function () {
  window.backend = {
    // функция для отправки данных формы на сервер
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
          window.utils.successMessage();
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.timeout = 10000;

      xhr.open('POST', window.Constants.URL);
      xhr.send(data);
    },

    // функция для получения данных с сервера
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.timeout = 10000;

      xhr.open('GET', window.Constants.URL + '/data');
      xhr.send();
    }
  };
})();
