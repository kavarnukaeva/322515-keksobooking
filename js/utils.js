'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var mapElement = document.querySelector('.map');
  var formElement = document.querySelector('.ad-form');
  var mainPinElement = document.querySelector('.map__pin--main');
  var errorMessageElement = document.querySelector('#error').content.querySelector('.error');
  var successMessageElement = document.querySelector('#success').content.querySelector('.success');

  var setDefaultSelectElementValue = function (el) {
    el.querySelector('[selected]').removeAttribute('selected');
    el.querySelector('option:first-child').setAttribute('selected', '');
  };

  window.utils = {
    disabledElements: document.querySelectorAll('form.ad-form fieldset'),
    mapFiltersChildrenElements: document.querySelector('.map__filters').children,

    changeToInitialState: function () {
      var mapFiltersSelectElements = window.filter.mapFiltersElements.querySelectorAll('select');
      var adFormPhotosElements = document.querySelectorAll('.ad-form__photo');

      // возвращает карту и форму в неактивное состояние
      mapElement.classList.add('map--faded');
      formElement.classList.add('ad-form--disabled');

      // отключает поля формы поиска объявления для неактивного состояния
      [].forEach.call(window.utils.disabledElements, function (item) {
        item.setAttribute('disabled', '');
      });

      // отключает форму c фильтрами для неактивного состояния
      [].forEach.call(window.utils.mapFiltersChildrenElements, function (item) {
        item.setAttribute('disabled', '');
      });

      // возвращает главной метке дефолтные координаты
      mainPinElement.style.left = window.Constants.LEFT_MAINPIN + 'px';
      mainPinElement.style.top = window.Constants.TOP_MAINPIN + 'px';

      window.map.address.setAttribute('value', window.Constants.TOP_MAINPIN + ', ' + window.Constants.LEFT_MAINPIN);

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

      // приводит данные форм к изначальному состоянию
      formElement.reset();
      window.filter.mapFiltersElements.reset();
      window.uploadFile.avatarElement.src = window.Constants.MUFFIN_SRC;

      if (adFormPhotosElements.length > 1) {
        adFormPhotosElements[0].innerHTML = '';

        for (var i = 1; i < adFormPhotosElements.length; i++) {
          adFormPhotosElements[i].remove();
        }
      } else {
        window.uploadFile.housePhotoElement.innerHTML = '';
      }

      window.form.priceInput.removeAttribute('min');
      window.form.priceInput.setAttribute('placeholder', window.Constants.MIN_PRICE.bungalo);
      setDefaultSelectElementValue(window.form.checkInSelect);
      setDefaultSelectElementValue(window.form.checkOutSelect);

      [].forEach.call(mapFiltersSelectElements, function (el) {
        setDefaultSelectElementValue(el);
      });
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
      mainElement.appendChild(errorMessageElement);
      errorMessageElement.style.display = 'block';

      var documentClickErrorHandler = function () {
        window.utils.hideElement(errorMessageElement);
        removeEventListener('click', documentClickErrorHandler);
      };

      var documentKeydownErrorHandler = function () {
        window.utils.hideElement(errorMessageElement);
        removeEventListener('keydown', documentKeydownErrorHandler);
      };

      document.addEventListener('click', documentClickErrorHandler);

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          documentKeydownErrorHandler();
        }
      });
    },

    returnSuccessMessage: function () {
      mainElement.appendChild(successMessageElement);
      successMessageElement.style.display = 'block';

      var documentClickSuccessHandler = function () {
        window.utils.hideElement(successMessageElement);
        removeEventListener('click', documentClickSuccessHandler);
      };

      var documentKeydownSuccessHandler = function () {
        window.utils.hideElement(successMessageElement);
        removeEventListener('keydown', documentClickSuccessHandler);
      };


      document.addEventListener('click', documentClickSuccessHandler);

      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          documentKeydownSuccessHandler();
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

    hideElement: function (el) {
      el.style.display = 'none';
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
