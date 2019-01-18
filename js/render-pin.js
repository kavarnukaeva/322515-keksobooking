'use strict';

(function () {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // функция отрисовки метки
  window.renderPin = function (array) {
    var pinElement = similarPinElementTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + array.location.x + 'px; top: ' + array.location.y + 'px;');
    pinImgElement.setAttribute('alt', array.offer.title);
    pinImgElement.setAttribute('src', array.author.avatar);

    return pinElement;
  };
})();
