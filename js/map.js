'use strict';

(function () {
  var similarPinList = document.querySelector('.map__pins');
  var similarOfferList = document.querySelector('.map');

  // отключает поля формы поиска объявления для неактивного состояния
  var disabledElements = document.querySelectorAll('form.ad-form fieldset');

  for (var i = 0; i < disabledElements.length; i++) {
    disabledElements[i].setAttribute('disabled', '');
  }

  // отключает форму c фильтрами для неактивного состояния
  var mapFilters = document.querySelector('.map__filters');

  mapFilters.classList.add('map__filters--disabled');

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');

  address.setAttribute('value', `${Math.floor(window.Constants.MAP_WIDTH / 2 - window.Constants.MAINPIN_WIDTH / 2)}, ${Math.floor(window.Constants.MAP_HEIGHT / 2 - window.Constants.MAINPIN_HEIGHT / 2)}`);

  // активное состояние

  var mapPinClickHandler = function(evt) {
    var target = evt.currentTarget;
    var offer = target.nextSibling;
    var coords = offer.querySelector('.popup__text--address');

    // добавляет координаты в поле адреса
    address.setAttribute('value', coords.textContent);

    window.utils.hideShownOffers();

    offer.classList.remove('hidden');
    closePopup(offer);
  };

  var changeToActiveState = function () {
    mainPin.removeEventListener('mouseup', changeToActiveState);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 0; i < disabledElements.length; i++) {
      disabledElements[i].removeAttribute('disabled');
    }

    mapFilters.classList.remove('map__filter--disabled');

    window.backend.load(successHandler, window.utils.errorHandler);
  };

  mainPin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (shift.x <= mainPin.offsetLeft) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }

      if (mainPin.offsetLeft > window.Constants.MAP_WIDTH - window.Constants.MAINPIN_ACTIVE_WIDTH) {
        mainPin.style.left = mainPin.offsetLeft + shift.x + 'px';
      }

      if (shift.y < mainPin.offsetTop - window.Constants.HORIZON_MAPPOINT + window.Constants.MAINPIN_ACTIVE_HEIGHT) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }

      if (mainPin.offsetTop > window.Constants.FILTER_MAPPOINT) {
        mainPin.style.top = mainPin.offsetTop + shift.y + 'px';
      }

      address.setAttribute('value', `${parseInt(mainPin.style.top)}, ${parseInt(mainPin.style.left)}`);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      changeToActiveState();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // переводит страницу в активное состояние по нажатию на ENTER
  var mainPinKeydownHandler = function(evt) {
    if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
      changeToActiveState();
    }
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // функция закрытия объявления
  var closePopup = function (popup) {
    var close = popup.querySelector('.popup__close');

    close.addEventListener('click', function() {
      popup.classList.add('hidden');
    });

    close.addEventListener('keydown', function(evt) {
      if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
        popup.classList.add('hidden');
      }
    });
  };

  window.utils.hideShownOffers();

  var successHandler = function (data) {
    // отрисовывает метки и объявления на странице
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      // проверяет наличие ключа offer
      if (data[j].offer) {
        fragment.appendChild(renderPin(data[j]));
        fragment.appendChild(renderOffer(data[j]));
      }
    }

    similarPinList.appendChild(fragment);

    var filters = similarOfferList.querySelector('.map__filters-container');
    similarOfferList.insertBefore(fragment, filters);

    // показ объявления при клике на метку
    var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].addEventListener('click', mapPinClickHandler);
    }
  };
})();
