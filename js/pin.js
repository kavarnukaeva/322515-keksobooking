'use strict';

(function () {
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  //функция отрисовки метки
  window.renderPin = function (array) {
    var pinElement = similarPinTemplate.cloneNode(true);

    pinElement.setAttribute('style', `left: ${array.location.x}px; top: ${array.location.y}px`);
    pinElement.querySelector('img').setAttribute('alt', `${array.offer.title}`);
    pinElement.querySelector('img').setAttribute('src', `${array.author.avatar}`);

    return pinElement;
  };
})();
