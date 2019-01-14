'use strict';

(function () {
  window.utils = {
    changeToInitialState: function () {
      var map = document.querySelector('.map');
      var form = document.querySelector('.ad-form');

      // возвращает карту и форму в неактивное состояние
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');

      // отключает поля формы поиска объявления для неактивного состояния
      var disabledElements = document.querySelectorAll('form.ad-form fieldset');

      [].forEach.call(disabledElements, function (item) {
        item.setAttribute('disabled', '');
      });

      // отключает форму c фильтрами для неактивного состояния
      var mapFiltersChildren = document.querySelector('.map__filters').children;

      [].forEach.call(mapFiltersChildren, function (item) {
        item.setAttribute('disabled', '');
      });

      // возвращает главной метке дефолтные координаты
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.style.left = window.Constants.LEFT_MAINPIN + 'px';
      mainPin.style.top = window.Constants.TOP_MAINPIN + 'px';

      window.address.setAttribute('value', window.Constants.TOP_MAINPIN + ', ' + window.Constants.LEFT_MAINPIN);

      // скрывает показанные объявления
      window.utils.hideShownOffers();

      // скрывает показанные метки
      var hideShownPins = function () {
        window.mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        [].forEach.call(window.mapPin, function (item) {
          item.classList.add('hidden');
        });
      };
      hideShownPins();

      form.reset();
    },

    hideShownOffers: function () {
      var mapCard = document.querySelectorAll('.map__card');

      // скрывает показанные ранее карточки
      [].forEach.call(mapCard, function (item) {
        if (!item.classList.contains('hidden')) {
          item.classList.add('hidden');
        }
      });
    },

    errorHandler: function () {
      var errorMessage = document.querySelector('#error').content.querySelector('.error');
      var main = document.querySelector('main');

      main.appendChild(errorMessage);
      errorMessage.style.display = 'block';

      document.addEventListener('click', function () {
        errorMessage.style.display = 'none';
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          errorMessage.style.display = 'none';
        }
      });
    },

    successMessage: function () {
      var main = document.querySelector('main');

      var successMessage = document.querySelector('#success').content.querySelector('.success');

      main.appendChild(successMessage);
      successMessage.style.display = 'block';

      document.addEventListener('click', function () {
        successMessage.style.display = 'none';
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          successMessage.style.display = 'none';
        }
      });
    },

    processData: function (type, url, onError, onLoad, data) {
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

      xhr.timeout = window.Constants.TIMEOUT;

      xhr.open(type, url);

      if (data) {
        xhr.send(data);
      } else {
        xhr.send();
      }
    },

    shuffle: function (array) {
      var j;
      var x;
      var i;
      for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
      }

      return array;
    },

    removeElements: function (array) {
      array.forEach(function (el) {
        el.remove();
      });
    },

    cropData: function (data, num) {
      if (data.length > num) {
        window.utils.shuffle(data).splice(0, data.length - num);
      }

      return data;
    }
  };
})();
