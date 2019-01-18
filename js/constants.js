'use strict';

(function () {
  window.Constants = {
    OFFERS_QUANTITY: 8,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAP_HEIGHT: 704,
    MAP_WIDTH: 1200,
    MAINPIN_WIDTH: 199.95,
    MAINPIN_HEIGHT: 199.95,
    MAINPIN_ACTIVE_WIDTH: 62,
    MAINPIN_ACTIVE_HEIGHT: 84,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    HORIZON_MAPPOINT: 130,
    FILTER_MAPPOINT: 630,
    LEFT_MAINPIN: 570,
    TOP_MAINPIN: 375,
    TIMEOUT: 10000,
    DEBOUNCE_INTERVAL: 500,
    URL: 'https://js.dump.academy/keksobooking',
    SRC: 'img/muffin-grey.svg',
    PHOTO_WIDTH: 45,
    PHOTO_HEIGHT: 40,
    PINS_TO_RENDER_QUANTITY: 5,
    GUESTS_MAXCOUNT: 100,
    ZERO: 0,
    ANY_VALUE: 'any',
    PER_NIGHT: ' ₽/ночь',
    FILTER_HOUSING_PRICE: {
      low: 'low',
      middle: 'middle',
      high: 'high'
    },
    FILTER_HOUSING_PRICE_TYPE: {
      low: 10000,
      high: 50000
    },
    PLACE_ELEMENTS_CONTENT: {
      bungalo: 'Бунгало',
      flat: 'Квартира',
      house: 'Дом',
      palace: 'Дворец'
    },
    PLACE_TYPE: {
      bungalo: 'bungalo',
      flat: 'flat',
      house: 'house',
      palace: 'palace'
    },
    MIN_PRICE: {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    }
  };
})();
