'use strict';

(function () {
  window.utils = {
    changeToInitialState: function () {
      var map = document.querySelector('.map');
      var form = document.querySelector('.ad-form');

      //возвращает карту и форму в неактивное состояние
      map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');

      // отключает поля формы поиска объявления для неактивного состояния
      var disabledElements = document.querySelectorAll('form.ad-form fieldset');
      for (var i = 0; i < disabledElements.length; i++) {
        disabledElements[i].setAttribute('disabled', '');
      }

      // отключает форму c фильтрами для неактивного состояния
      var mapFilters = document.querySelector('.map__filters');
      mapFilters.classList.add('map__filters--disabled');

      // возвращает главной метке дефолтные координаты
      var mainPin = document.querySelector('.map__pin--main');
      mainPin.style.left = window.Constants.LEFT_MAINPIN + 'px';
      mainPin.style.top = window.Constants.TOP_MAINPIN + 'px';

      address.setAttribute('value', `${Math.floor(window.Constants.MAP_WIDTH / 2 - window.Constants.MAINPIN_WIDTH / 2)}, ${Math.floor(window.Constants.MAP_HEIGHT / 2 - window.Constants.MAINPIN_HEIGHT / 2)}`);

      // скрывает показанные объявления
      window.utils.hideShownOffers();

      // скрывает показанные метки
      var hideShownPins = function () {
        var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        for (var j = 0; j < mapPin.length; j++) {
          mapPin[j].classList.add('hidden');
        }
      };
      hideShownPins();

      form.reset();
    },

    hideShownOffers: function() {
      var mapCard = document.querySelectorAll('.map__card');

      // скрывает показанные ранее карточки
      for (var j = 0; j < mapCard.length; j++) {
        if (!mapCard[j].classList.contains('hidden')) {
          mapCard[j].classList.add('hidden');
        }
      }
    },

    errorHandler: function (errorMessage) {
      var errorMessage = document.querySelector('#error').content.querySelector('.error');
      var main = document.querySelector('main');

      main.appendChild(errorMessage);
      errorMessage.style.display = 'block';

      var errorButton = errorMessage.querySelector('.error__button');

      errorButton.addEventListener('click', function () {
        errorMessage.style.display = 'none';
      });

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          errorMessage.style.display = 'none';
        }
      });
    },

    successMessage: function (successMessage) {
      var main = document.querySelector('main');

      var successMessage = document.querySelector('#success').content.querySelector('.success');

      main.appendChild(successMessage);
      successMessage.style.display = 'block';

      document.addEventListener('keydown', function(evt) {
        if (evt.keyCode === window.Constants.ESC_KEYCODE) {
          successMessage.style.display = 'none';
        }
      });
    }
  };
})();
