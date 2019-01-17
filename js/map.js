'use strict';

(function () {
  var similarPinListElement = document.querySelector('.map__pins');
  var similarOfferListElement = document.querySelector('.map');
  var filterFeaturesElement = document.querySelector('.map__features');

  // пустой массив под данные
  window.initialData = [];

  // функция сохранения данных
  var getData = function (data) {
    window.initialData = data;
    window.successHandler(data);
  };

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

  var mainPinElement = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  window.address = document.querySelector('#address');

  window.address.setAttribute('value', window.Constants.TOP_MAINPIN + ', ' + window.Constants.LEFT_MAINPIN);

  // активное состояние

  window.mapPinClickHandler = function (evt) {
    var target = evt.currentTarget;
    var offer = target.nextSibling;
    var coords = offer.querySelector('.popup__text--address');

    window.mapPinsElements.forEach(function (item) {
      if (item.classList.contains('map__pin--active')) {
        item.classList.remove('map__pin--active');
      }
    });

    // добавляет класс активному элементу
    target.classList.add('map__pin--active');

    // добавляет координаты в поле адреса
    window.address.setAttribute('value', coords.textContent);

    window.utils.hideShownOffers();

    offer.classList.remove('hidden');
    closePopup(offer);
  };

  var changeToActiveState = function () {
    mainPinElement.removeEventListener('mouseup', changeToActiveState);

    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    [].forEach.call(disabledElements, function (item) {
      item.removeAttribute('disabled', '');
    });

    [].forEach.call(mapFiltersChildrenElements, function (item) {
      item.removeAttribute('disabled', '');
    });

    window.backend.load(getData, window.utils.returnErrorMessage);
  };

  mainPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (shift.x <= mainPinElement.offsetLeft) {
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + 'px';
      }

      if (mainPinElement.offsetLeft > window.Constants.MAP_WIDTH - window.Constants.MAINPIN_ACTIVE_WIDTH) {
        mainPinElement.style.left = mainPinElement.offsetLeft + shift.x + 'px';
      }

      if (shift.y < mainPinElement.offsetTop - window.Constants.HORIZON_MAPPOINT + window.Constants.MAINPIN_ACTIVE_HEIGHT) {
        mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + 'px';
      }

      if (mainPinElement.offsetTop > window.Constants.FILTER_MAPPOINT) {
        mainPinElement.style.top = mainPinElement.offsetTop + shift.y + 'px';
      }

      window.address.setAttribute('value', parseInt(mainPinElement.style.top, 10) + ', ' + parseInt(mainPinElement.style.left, 10));
    };

    var mainPinMouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      // если данные уже загружены или форма в неактивном состоянии
      if (!window.initialData.length || adFormElement.classList.contains('ad-form--disabled')) {
        changeToActiveState();
      }

      document.removeEventListener('mousemove', mainPinMousemoveHandler);
      document.removeEventListener('mouseup', mainPinMouseupHandler);
    };

    document.addEventListener('mousemove', mainPinMousemoveHandler);
    document.addEventListener('mouseup', mainPinMouseupHandler);
  });

  // переводит страницу в активное состояние по нажатию на ENTER
  var mainPinKeydownHandler = function (evt) {
    if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
      changeToActiveState();
    }
    mainPinElement.removeEventListener('keydown', mainPinKeydownHandler);
  };

  mainPinElement.addEventListener('keydown', mainPinKeydownHandler);

  // функция закрытия объявления
  var closePopup = function (popup) {
    var closeElement = popup.querySelector('.popup__close');

    closeElement.addEventListener('click', function () {
      popup.classList.add('hidden');
    });

    closeElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
        popup.classList.add('hidden');
      }
    });
  };

  window.utils.hideShownOffers();

  window.successHandler = function (data) {
    // исходный и фильтруемый впоследствии массив данных
    window.dataToFilter = data;

    // данные используемые до фильтрации
    window.beforeFilterData = window.utils.cropData(data, window.Constants.PINS_TO_RENDER_QUANTITY);

    window.renderPins(window.beforeFilterData);
  };

  var mapFiltersChangesHandler = function (data, cropedData, timeout) {
    if (timeout) {
      window.clearTimeout(timeout);
    }
    timeout = window.setTimeout(function () {
      window.filterData(window.dataToFilter, cropedData);
    }, window.Constants.DEBOUNCE_INTERVAL);
  };

  window.renderPins = function (data, cropedData) {
    // фильтрует и устраняет дребезг
    var lastTimeout;

    window.mapFiltersElements.addEventListener('change', function () {
      mapFiltersChangesHandler(data, cropedData, lastTimeout);
    });

    filterFeaturesElement.addEventListener('keydown', function (evt) {
      var target = evt.target;

      if (evt.keyCode === window.Constants.ENTER_KEYCODE && target.tagName === 'INPUT') {
        target.checked = !target.checked ? target.checked = true : target.checked = false;

        mapFiltersChangesHandler(data, cropedData, lastTimeout);
      }
    });

    // отрисовывает метки и объявления на странице
    var fragment = document.createDocumentFragment();

    if (cropedData) {
      cropedData.forEach(function (item) {
        // проверяет наличие ключа offer
        if (item.offer) {
          fragment.appendChild(window.renderPin(item));
          fragment.appendChild(window.renderOffer(item));
        }
      });
    } else {
      data.forEach(function (item) {
        // проверяет наличие ключа offer
        if (item.offer) {
          fragment.appendChild(window.renderPin(item));
          fragment.appendChild(window.renderOffer(item));
        }
      });
    }

    similarPinListElement.appendChild(fragment);

    window.filters = similarOfferListElement.querySelector('.map__filters-container');
    similarOfferListElement.insertBefore(fragment, window.filters);

    // показ объявления при клике на метку
    window.mapPinsElements = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    [].forEach.call(window.mapPinsElements, function (item) {
      item.addEventListener('click', window.mapPinClickHandler);
    });
  };
})();
