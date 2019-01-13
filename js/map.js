'use strict';

(function () {
  var similarPinList = document.querySelector('.map__pins');
  var similarOfferList = document.querySelector('.map');

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
  var mapFiltersChildren = document.querySelector('.map__filters').children;

  [].forEach.call(mapFiltersChildren, function (item) {
    item.setAttribute('disabled', '');
  });

  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  window.address = document.querySelector('#address');

  window.address.setAttribute('value', window.Constants.TOP_MAINPIN + ', ' + window.Constants.LEFT_MAINPIN);

  // активное состояние

  window.mapPinClickHandler = function (evt) {
    var target = evt.currentTarget;
    var offer = target.nextSibling;
    var coords = offer.querySelector('.popup__text--address');

    // добавляет координаты в поле адреса
    window.address.setAttribute('value', coords.textContent);

    window.utils.hideShownOffers();

    offer.classList.remove('hidden');
    closePopup(offer);
  };

  var changeToActiveState = function () {
    mainPin.removeEventListener('mouseup', changeToActiveState);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    [].forEach.call(disabledElements, function (item) {
      item.removeAttribute('disabled', '');
    });

    [].forEach.call(mapFiltersChildren, function (item) {
      item.removeAttribute('disabled', '');
    });

    window.backend.load(getData, window.utils.errorHandler);
  };

  mainPin.addEventListener('mousedown', function (evt) {
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

      window.address.setAttribute('value', parseInt(mainPin.style.top, 10) + ', ' + parseInt(mainPin.style.left, 10));
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      // если данные уже загружены или форма в неактивном состоянии
      if (!window.initialData.length || adForm.classList.contains('ad-form--disabled')) {
        changeToActiveState();
      }

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  // переводит страницу в активное состояние по нажатию на ENTER
  var mainPinKeydownHandler = function (evt) {
    if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
      changeToActiveState();
    }
    mainPin.removeEventListener('keydown', mainPinKeydownHandler);
  };

  mainPin.addEventListener('keydown', mainPinKeydownHandler);

  // функция закрытия объявления
  var closePopup = function (popup) {
    var close = popup.querySelector('.popup__close');

    close.addEventListener('click', function () {
      popup.classList.add('hidden');
    });

    close.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
        popup.classList.add('hidden');
      }
    });
  };

  window.utils.hideShownOffers();

  window.successHandler = function (data) {
    // исходный и фильтруемый впоследствии массив данных
    window.dataToFilter = data;

    // перемешивает массив и оставляет 5 элементов
    window.initialData = window.utils.shuffle(data).slice(0, 5);

    // отрисовывает метки и объявления на странице
    var fragment = document.createDocumentFragment();

    window.initialData.forEach(function (item) {
      // проверяет наличие ключа offer
      if (item.offer) {
        fragment.appendChild(window.renderPin(item));
        fragment.appendChild(window.renderOffer(item));
      }
    });

    similarPinList.appendChild(fragment);

    window.filters = similarOfferList.querySelector('.map__filters-container');
    similarOfferList.insertBefore(fragment, window.filters);

    // показ объявления при клике на метку
    window.mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    [].forEach.call(window.mapPin, function (item) {
      item.addEventListener('click', window.mapPinClickHandler);
    });

    // фильтрует и устраняет дребезг
    var lastTimeout;

    window.mapFilters.addEventListener('change', function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        window.filterPins(window.dataToFilter);
      }, window.Constants.DEBOUNCE_INTERVAL);
    });
  };
})();
