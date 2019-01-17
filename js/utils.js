'use strict';

(function () {
  window.utils = {
    changeToInitialState: function () {
      var mapElement = document.querySelector('.map');
      var formElement = document.querySelector('.ad-form');

      // возвращает карту и форму в неактивное состояние
      mapElement.classList.add('map--faded');
      formElement.classList.add('ad-form--disabled');

      // отключает поля формы поиска объявления для неактивного состояния
      var disabledElements = document.querySelectorAll('form.ad-form fieldset');

      [].forEach.call(disabledElements, function (item) {
        item.setAttribute('disabled', '');
      });

      // отключает форму c фильтрами для неактивного состояния
      var mapFiltersChildrenElements = document.querySelector('.map__filters').children;

      [].forEach.call(mapFiltersChildrenElements, function (item) {
        item.setAttribute('disabled', '');
      });

      // возвращает главной метке дефолтные координаты
      var mainPinElement = document.querySelector('.map__pin--main');
      mainPinElement.style.left = window.Constants.LEFT_MAINPIN + 'px';
      mainPinElement.style.top = window.Constants.TOP_MAINPIN + 'px';

      window.address.setAttribute('value', window.Constants.TOP_MAINPIN + ', ' + window.Constants.LEFT_MAINPIN);

      // скрывает показанные объявления
      window.utils.hideShownOffers();

      // скрывает показанные метки
      var hideShownPins = function () {
        window.mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        [].forEach.call(window.mapPinsElements, function (item) {
          item.classList.add('hidden');
        });
      };
      hideShownPins();

      formElement.reset();
      window.priceInput.removeAttribute('min');
      window.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.bungalo);
    },

    hideShownOffers: function () {
      var mapCardElement = document.querySelectorAll('.map__card');

      // скрывает показанные ранее карточки
      [].forEach.call(mapCardElement, function (item) {
        if (!item.classList.contains('hidden')) {
          item.classList.add('hidden');
        }
      });
    },

    returnErrorMessage: function () {
      var errorMessageElement = document.querySelector('#error').content.querySelector('.error');
      var mainElement = document.querySelector('main');

      mainElement.appendChild(errorMessageElement);
      errorMessageElement.style.display = 'block';

      document.addEventListener('click', function () {
        errorMessageElement.style.display = 'none';
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          errorMessageElement.style.display = 'none';
        }
      });
    },

    returnSuccessMessage: function () {
      var mainElement = document.querySelector('main');

      var successMessageElement = document.querySelector('#success').content.querySelector('.success');

      mainElement.appendChild(successMessageElement);
      successMessageElement.style.display = 'block';

      document.addEventListener('click', function () {
        successMessageElement.style.display = 'none';
      });

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          successMessageElement.style.display = 'none';
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
