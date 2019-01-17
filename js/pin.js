'use strict';

(function () {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // функция отрисовки метки
  window.renderPin = function (array) {
    var pinElement = similarPinElementTemplate.cloneNode(true);

    pinElement.setAttribute('style', 'left: ' + array.location.x + 'px; top: ' + array.location.y + 'px;');
    pinElement.querySelector('img').setAttribute('alt', array.offer.title);
    pinElement.querySelector('img').setAttribute('src', array.author.avatar);

    return pinElement;
  };
})();
