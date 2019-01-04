'use strict';

(function () {
  window.constants = {
    OFFERS_QUANTITY: 8,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70,
    MAP_HEIGHT: 704,
    MAP_WIDTH: 1200,
    MAINPIN_WIDTH: 199.95,
    MAINPIN_HEIGHT: 199.95,
    MAINPIN_ACTIVE_WIDTH: 62,
    MAINPIN_ACTIVE_HEIGHT: 84,
    X_MAINPIN: Math.floor(window.MAP_WIDTH / 2 - window.MAINPIN_WIDTH / 2),
    Y_MAINPIN: Math.floor(window.MAP_HEIGHT / 2 - window.MAINPIN_HEIGHT / 2),
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    HORIZON_MAPPOINT: 130,
    FILTER_MAPPOINT: 630
  };
})();
